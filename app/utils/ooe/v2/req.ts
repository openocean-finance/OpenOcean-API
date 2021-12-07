import { BigNumber, ethers } from 'ethers';
import { pkgReq } from '../../commonReq';
import { quoteRes } from './res';
import { getRpcUrlByChainId, isNativeToken, getIdsByChainId } from '../../chain';
import { approve } from '../../web3';
import allAbi from '../../abi/erc20Abi.json';
import openAbi from '../../abi/openAbi.json';
import { decimals2Amount, getId } from '../../utils';
import { getDecimals } from '../../utils';
import { getPriceByIds } from '../../supply';
import { dealPromise } from '../../commonRes';
import { getBalanceByEthers } from '../../ether';
const url = 'https://ethapi.openocean.finance';
export default class OOEV2 {
  public async quote(params: any) {
    const chainId = params.chainId;
    const reqUrl = `${url}/v2/${chainId}/quote`;
    const reqBody = {
      inTokenSymbol: params.inTokenSymbol,
      inTokenAddress: params.inTokenAddress,
      outTokenSymbol: params.outTokenSymbol,
      outTokenAddress: params.outTokenAddress,
      amount: params.amount,
      gasPrice: params.gasPrice,
      slippage: params.slippage * 100,
    };
    const [ error, data ] = await pkgReq(reqUrl, reqBody);
    if (error) return { code: 500, error };
    return quoteRes(params, data);
  }

  public async swap(params) {
    const chainId = params.chainId;
    if (params.exChange !== 'openoceanv2') return { code: 201, error: 'invalid params, exChange: ' + params.exChange };
    const reqUrl = `${url}/v2/${chainId}/swap`;
    const reqBody = {
      inTokenAddress: params.inTokenAddress,
      outTokenAddress: params.outTokenAddress,
      amount: params.amount,
      gasPrice: params.gasPrice,
      slippage: params.slippage > 30 ? 3000 : params.slippage * 100,
      account: params.account,
    };
    const [ error, swapResp ] = await pkgReq(reqUrl, reqBody);
    if (error) return { code: 500, error };
    const rpcUrl = getRpcUrlByChainId(params.chainId);
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    const wallet = new ethers.Wallet(params.privateKey, provider);
    const [ error2, exChangeResp ] = await pkgReq(`${url}/v2/${chainId}/exChange`, undefined, undefined);
    if (error2) return { code: 500, error };

    const tx: any = {
      to: swapResp.to,
      gasLimit: Math.floor(swapResp.estimatedGas * 1.5),
      gasPrice: +swapResp.gasPrice,
      data: swapResp.data,
    };
    if (!isNativeToken(params.inTokenAddress.toLowerCase())) {
      const err = await approve(exChangeResp.approveContract, params.account, params.amount, params.inTokenAddress, wallet);
      if (err) return { code: 206, error: 'approve error, please try later again' };
    } else {
      tx.value = ethers.BigNumber.from(swapResp.value);
    }
    const result = await this.getBalance({ chainId, account: params.account, inTokenAddress: params.inTokenAddress });
    if (result && result.code === 200) {
      const data = result.data;
      const rawBalance = data[0].raw;
      if (rawBalance < params.amount) return { code: 204, error: 'Insufficient balance' };
    }
    const [ err, respData ] = await dealPromise(wallet.sendTransaction(tx));
    // err reason: replacement fee too low / nonce has already been used
    if (err) return { code: 500, err };
    if (respData && respData.hash) {
      return { code: 200, data: { hash: respData.hash } };
    }
    return { code: 205, error: respData };
  }

  public async transfer(params) {
    const result = await this.getBalance({ chainId: params.chainId, account: params.account, inTokenAddress: params.inTokenAddress });
    if (result.code === 200) {
      const data = result.data;
      const rawBalance = data[0].raw;
      if (rawBalance < params.amount) return { code: 204, error: 'Insufficient balance' };
    }
    const rpcUrl = getRpcUrlByChainId(params.chainId);
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    const wallet = new ethers.Wallet(params.privateKey, provider);
    const tx1: any = {
      from: params.account,
    };
    // gas
    const [ error, estimateGas ] = await dealPromise(wallet.estimateGas(tx1));
    if (error) return { code: 500, error };
    if (isNativeToken(params.inTokenAddress)) {
      const respData = await wallet.sendTransaction({
        to: params.targetAddress,
        value: BigNumber.from(params.amount),
        gasLimit: Number(estimateGas) * 1.5,
        gasPrice: Number(params.gasPrice),
      });
      if (respData && respData.hash) {
        return { code: 200, data: { hash: respData.hash } };
      }
      return { code: 500, error: respData };
    }
    const contract = new ethers.Contract(params.inTokenAddress, allAbi.abi, provider);
    const contractWithSigner = contract.connect(wallet);
    const { Nonce } = params;
    const respData = await contractWithSigner.transfer(params.targetAddress, params.amount, {
      Nonce,
      gasLimit: Number(estimateGas) * 1.5,
      gasPrice: params.gasPrice,
    });
    console.log(respData);
    if (respData && respData.hash) {
      return { code: 200, data: { hash: respData.hash } };
    }
    return { code: 500, error: respData };
  }

  public async getBalance(params) {
    return await getBalanceByEthers(params);
  }

  public async getTransaction(params) {
    if (params.type && params.type === 'transfer') {
      return await this.getTransferaction(params);
    }
    const rcpUrl = getRpcUrlByChainId(params.chainId);
    const provider = new ethers.providers.JsonRpcProvider(rcpUrl);
    const iface = new ethers.utils.Interface(openAbi.abi);
    const [ err, hashData ] = await dealPromise(provider.getTransaction(params.hash));
    if (err || !hashData) return { code: 500, error: err };
    console.log(params.hash, hashData);

    const { nonce, hash, blockNumber, from, to, gasPrice } = hashData;

    const data = await provider.getBlockWithTransactions(blockNumber);
    const { timestamp } = data;
    let resp;
    try {
      resp = iface.decodeFunctionData('swap', hashData.data);
    } catch (error) {
      return { code: 500, error: 'decodeFunctionData error: ' + JSON.stringify(error) };
    }
    const [ error, waitData ] = await dealPromise(hashData.wait());
    if (error || !waitData) return { code: 500, error };

    const { logs, gasUsed, transactionIndex } = waitData;
    if (logs.length === 0) return { code: 500 };
    const log = logs[logs.length - 1];
    console.log(log.data);
    const { returnAmount } = await iface.decodeEventLog('Swapped', log.data);
    const { srcToken, dstToken, amount } = resp[1];
    const srcTokenMsg = getDecimals(srcToken, params.chainId);
    const dstTokenMsg = getDecimals(dstToken, params.chainId);
    const dstId = getId(dstTokenMsg.symbol, dstToken, params.chainId);
    const nativeId = getIdsByChainId(params.chainId);
    const [ errs, usd ] = await getPriceByIds(nativeId + ',' + dstId);
    let nativeUsd = 0;
    let dstUsd = 0;
    if (!errs || usd) {
      nativeUsd = usd[nativeId] && usd[nativeId].usd ? usd[nativeId].usd : 0;
      dstUsd = usd[dstId] && usd[dstId].usd ? usd[dstId].usd : 0;
    }
    // gasUsd == gasLimit
    const gas = decimals2Amount(Number(gasPrice) * Number(gasUsed), 18);
    const outAmount = Number(decimals2Amount(Number(returnAmount), dstTokenMsg.decimals));
    const gasFee = Number(gas) * nativeUsd;
    const usd_valuation = outAmount * dstUsd;
    return {
      code: 200,
      data: {
        nonce,
        hash,
        blockNumber,
        transactionIndex,
        from,
        to,
        inTokenAddress: srcToken,
        inTokenSymbol: srcTokenMsg.symbol,
        outTokenAddress: dstToken,
        outTokenSymbol: dstTokenMsg.symbol,
        inAmount: Number(decimals2Amount(Number(amount), srcTokenMsg.decimals)),
        outAmount,
        gasFee,
        timestamp,
        usd_valuation,
        gasAmount: Number(gas),
      },
    };
  }
  public async getTransferaction(params) {
    const rcpUrl = getRpcUrlByChainId(params.chainId);
    const provider = new ethers.providers.JsonRpcProvider(rcpUrl);
    const iface = new ethers.utils.Interface(openAbi.transfer);
    const [ err, hashData ] = await dealPromise(provider.getTransaction(params.hash));
    if (err) return { code: 500, err };
    // to tokenAddress
    // from walletAddrss
    const { hash, blockNumber, timestamp, from, to, gasPrice } = hashData;
    let transferData;
    try {
      transferData = iface.decodeFunctionData('transfer', hashData.data);
    } catch (error) {
      return { code: 500, error };
    }
    const { recipient, amount } = transferData;
    const [ errors, waitData ] = await dealPromise(hashData.wait());
    if (errors) return { code: 500, error: errors };
    console.log(waitData);
    const { gasUsed, transactionIndex } = waitData;
    const srcTokenMsg = getDecimals(to, params.chainId);
    const ids = getIdsByChainId(params.chainId);
    const [ error, nativeUsd ] = await getPriceByIds(ids);
    let usd = 0;
    if (error) usd = 0;
    if (nativeUsd) {
      usd = nativeUsd[ids] && nativeUsd[ids].usd ? nativeUsd[ids].usd : 0;
    }
    const gas = decimals2Amount(Number(gasPrice) * Number(gasUsed), 18);
    console.log(gas, gasPrice, gasUsed);
    const gasFee = (Number(gas) * usd).toFixed(2);
    return {
      code: 200,
      data: {
        hash,
        blockNumber,
        transactionIndex,
        from,
        to: recipient,
        inTokenAddrss: to,
        inTokenSymbol: srcTokenMsg.symbol,
        inAmount: Number(decimals2Amount(Number(amount), srcTokenMsg.decimals)),
        gasFee,
        timestamp,
      },
    };
  }
  public async getTransactionReceipt(params) {
    const rcpUrl = getRpcUrlByChainId(params.chainId);
    const provider = new ethers.providers.JsonRpcProvider(rcpUrl);
    const [ error, res ] = await dealPromise(provider.getTransactionReceipt(params.hash));
    if (error) return { code: 500, error };
    if (!res) {
      const url = `https://bscscan.com/tx/${params.hash}`;
      const [ error, data ] = await pkgReq(url, '');
      if (error || data.indexOf('Sorry, We are unable to locate this TxnHash') > -1) return { code: 200, data: { status: -2 } };
      return { code: 200, data: { status: -1 } };
    }
    const { to, from, contractAddress, transactionIndex, transactionHash, blockNumber, confirmations, status } = res || { status: '' };
    return {
      code: 200,
      data: {
        to,
        from,
        contractAddress,
        transactionIndex,
        transactionHash,
        blockNumber,
        confirmations,
        status,
      },
    };
  }
}
