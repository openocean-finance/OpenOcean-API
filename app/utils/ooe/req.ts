import { BigNumber, ethers } from 'ethers';
import { pkgReq } from '../commonReq';
import { quoteRes } from './res';
import { getRpcUrlByChainId, isNativeToken } from '../chain';
import { approve } from '../web3';
import allAbi from '../abi/erc20Abi.json';
import openAbi from '../abi/openAbi.json';
import { decimals2Amount } from '../utils';
import { getDecimals } from '../utils';
import { dealPromise } from '../commonRes';
import bobaAbi from '../abi/boba.json';
import Web3 from 'web3';
import { LCDClient } from '@terra-money/terra.js';
import { swap_quote_terra } from '../terra';
const lcd = new LCDClient({
  URL: 'https://lcd.terra.dev/',
  chainID: 'bombay-12',
});
// import { getmultiCallBalance } from '../../multicall';
import { getBalanceByEthers, getProvider } from '../ether';
import axios from 'axios';

// const url = 'https://ethapi.openocean.finance';
const url = 'https://ethapi.openocean.finance';
// const contract = new Contract();
const address_plat = {
  '0x3487ef9f9b36547e43268b8f0e2349a226c70b53': 'PC',
  '0x40603469c577b1db3d401155901a276f604436f4': 'H5',
  '0x9fac0e61e7d2a2a7c5e01c7acb4c805d58cd41c1': 'OPENAPI',
  '0xf01fa7de4fd0c9d044bbae496b162ab933df3e5e': 'PME',
  '0x0000000000000000000000000000000000000000': 'UnKnow',
  '0x934b510d4c9103e6a87aef13b816fb080286d649': 'Mask', // mask self
  '0x8960A6cD268E44F14AC150A60700928Acfe49260': 'Rango',
  '0x8237EbDF7f96Afd86eD9Fd02e07E559fA600b8bf': 'Cross',
  '0xB5B569B36534F6852af43C2a4F03b5Bd9aFc0146': 'ONT',
};
export default class OOEV2 {
  public async quote(params: any) {
    const chainId = params.chainId;
    let reqUrl = `${url}/v2/${chainId}/quote`;
    if (chainId === 400) reqUrl = `${url}/v1/terra/quote`;
    if (chainId === 401) reqUrl = `${url}/v1/ont/quote`;
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
    if (error) return { code: 500, error: 'quote error' };
    return quoteRes(params, data);
  }
  public async swap_quote(params) {
    const chainId = params.chainId;
    if (params.exChange !== 'openoceanv2') return { code: 201, error: 'invalid params, exChange: ' + params.exChange };

    const reqBody = {
      sender: params.sender,
      inTokenAddress: params.inTokenAddress,
      outTokenAddress: params.outTokenAddress,
      amount: params.amount,
      gasPrice: params.gasPrice,
      slippage: params.slippage > 30 ? 3000 : params.slippage * 100,
      account: params.account,
      referrer: params.referrer ? params.referrer.toLowerCase() : '0x9fac0e61e7d2a2a7c5e01c7acb4c805d58cd41c1',
    };
    let reqUrl = `${url}/v2/${chainId}/swap`;
    if (chainId === 400) reqUrl = `${url}/v1/terra/swap-quote`;
    if (chainId === 'ont' || chainId === 401) reqUrl = `${url}/v1/ont/swap-quote`;
    const [ error, swapResp ] = await pkgReq(reqUrl, reqBody);
    console.log(error, swapResp);
    if (error) return { code: 500, error: 'swap fail' };
    if (chainId === 401) return { code: 200, data: swapResp };
    // determine the balance
    if (params.withoutCheckBalance) {
      swapResp.estimatedGas = Math.floor(swapResp.estimatedGas * 2.5);
      return { code: 200, data: swapResp };
    }
    if (chainId === 400) {
      const result = await swap_quote_terra(params.account, swapResp, 'terra1xgwtavpnt2vp87nq0zvu0wk2zw3wulz5yfeqs2');
      delete swapResp.execute_swap_operations;
      // const data = JSON.parse(JSON.stringify(result.data));
      // data.fee = JSON.parse(data.fee);
      // data.msgs[0] = JSON.parse(data.msgs[0]);
      swapResp.data = result.data;
      return swapResp;
    }
    const result = await this.checkBalance(params);
    if (result.code !== 200) return result;

    const provider = await getProvider(params.chainId);
    const estimateGasParams: any = {
      from: swapResp.from,
      to: swapResp.to,
      data: swapResp.data,
    };
    if (isNativeToken(params.inTokenAddress.toLowerCase())) {
      estimateGasParams.value = ethers.BigNumber.from(swapResp.value);
    }
    const [ estGasError, gasLimit ] = await dealPromise(provider.estimateGas(estimateGasParams));
    if (estGasError) {
      if (estGasError.indexOf('Return amount is not enough') > -1) {
        return { code: 209, error: 'Return amount is not enough' };
      }
      return { code: 500, error: estGasError };
    }
    swapResp.estimatedGas = Math.floor(gasLimit * 1.5);
    return { code: 200, data: swapResp };
  }
  public async swap(params) {
    const result = await this.swap_quote(params);
    if (result.code !== 200) return result;
    const swapResp = result.data;
    const provider = await getProvider(params.chainId);
    const wallet = new ethers.Wallet(params.privateKey, provider);
    const { chainId } = params;
    if (!params.approved) {
      const [ error2, exChangeResp ] = await pkgReq(`${url}/v2/${chainId}/exChange`, undefined, undefined);
      if (error2) return { code: 500, error: error2 };
      const err = await approve(exChangeResp.approveContract, params.account, params.amount, params.inTokenAddress, wallet);
      if (err) return { code: 206, error: 'approve error, please try later again' };
    }
    const tx: any = {
      to: swapResp.to,
      gasLimit: swapResp.estimatedGas,
      gasPrice: +swapResp.gasPrice,
      data: swapResp.data,
    };
    if (isNativeToken(params.inTokenAddress.toLowerCase())) {
      tx.value = ethers.BigNumber.from(swapResp.value);
    }

    const [ err, respData ] = await dealPromise(wallet.sendTransaction(tx));
    // err reason: replacement fee too low / nonce has already been used
    if (err) {
      if (chainId === 66 && err.indexOf('Transaction hash mismatch from Provider.sendTransaction') > -1) {
        return { code: 200, data: { hash: JSON.parse(err).returnedHash } };
      }
      return { code: 500, err };
    }
    if (respData && respData.hash) {
      return { code: 200, data: { hash: respData.hash } };
    }
    return { code: 205, error: respData };
  }
  public async estimateGas(params) {
    const result = await this.swap_quote(params);
    if (result.code !== 200) return result;
    return { code: 200, data: { gasLimit: Number(result.data.estimatedGas) } };
  }
  public async transfer(params) {
    const result = await this.getBalance({ chainId: params.chainId, account: params.account, inTokenAddress: params.inTokenAddress });
    if (result.code === 200) {
      const data = result.data;
      const rawBalance = data[0].raw;
      if (rawBalance < params.amount) return { code: 204, error: 'Insufficient balance' };
    }
    const provider = await getProvider(params.chainId);
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
    if (respData && respData.hash) {
      return { code: 200, data: { hash: respData.hash } };
    }
    return { code: 500, error: respData };
  }

  public async getBalance(params) {
    return await getBalanceByEthers(params);
    // return await getmultiCallBalance(params.inTokenAddress, params.account, params.chainId);
  }

  public async getTransaction(params) {
    // get from db
    if (!params.fromChain) {
      const result = await this.getTransactionFromDB(params);
      if (result.code === 200) return result;
    }
  }

  // get from db
  public async getTransactionFromDB(params) {
    const { chainId, hash } = params;
    const [ err, result ] = await dealPromise(axios.get(`https://pre-market-api.openocean.finance/v1/data/getTransactionFromDB?chainId=${chainId}&hash=${hash}`));
    if (!err && result && result.data && result.data.code === 200) {
      const { usd_valuation, nonce, block_number, tx_index, address, tx_hash, sender, in_token_address, in_token_symbol, out_token_address, out_token_symbol, tx_fee, tx_fee_valuation, in_amount_value, out_amount_value, create_at, in_amount, out_amount, in_token_decimals, out_token_decimals } = result.data.data;
      return { code: 200, data: {
        nonce,
        hash: tx_hash,
        blockNumber: block_number,
        transactionIndex: tx_index,
        from: sender,
        to: address,
        inTokenAddress: in_token_address,
        inTokenSymbol: in_token_symbol,
        outTokenAddress: out_token_address,
        outTokenSymbol: out_token_symbol,
        inAmount: in_amount,
        outAmount: out_amount,
        gasFee: tx_fee_valuation,
        timestamp: Math.floor(new Date(create_at).getTime() / 1000),
        usd_valuation: usd_valuation / 2,
        gasAmount: tx_fee,
        in_amount_value,
        out_amount_value,
        in_token_decimals,
        out_token_decimals,
      } };
    }
    return { code: 500 };
  }

  public async getTransactionReceipt(params) {
    if (params.chainId === 400 || params.chainId === 'terra') {
      return await this.getTransactionReceiptTerra(params.hash);
    }
    if (+params.chainId === 401) {
      return await this.getTransactionReceiptOnt(params);
    }
    console.log(params.chainId);
    const rcpUrl = getRpcUrlByChainId(params.chainId);
    const provider = new ethers.providers.JsonRpcProvider(rcpUrl);
    const [ error, res ] = await dealPromise(provider.getTransactionReceipt(params.hash));
    if (error) return { code: 500, error };
    if (!res) {
      let url = `https://bscscan.com/tx/${params.hash}`;
      if (+params.chainId === 137) {
        url = `https://polygonscan.com/tx/${params.hash}`;
      }
      const [ error, data ] = await pkgReq(url, '');
      if (error || data.indexOf('Sorry, We are unable to locate this TxnHash') > -1 || data.indexOf('Oops! An invalid Txn hash has been entered:') > -1) return { code: 200, data: { status: -2 } };
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

  public async getTransactionReceiptOnt(params) {
    const { hash } = params;
    const data = await axios.get(`https://explorer.ont.io/v2/transactions/${hash}`);
    if (!data || !data.data) {
      return { code: 500, error: data };
    }
    const result = data.data;
    if (result.msg !== 'SUCCESS') {
      return { code: 200, data: { status: 0 } };
    }
    return { code: 200, data: { status: 1 } };
  }
  public async getTransactionReceiptTerra(hash: string) {
    let bool = false;
    // get hash from terra chain
    const result = await axios.get('https://fcd.terra.dev/v1/txs?offset=0&limit=100&account=terra1xgwtavpnt2vp87nq0zvu0wk2zw3wulz5yfeqs2');

    if (!result || !result.data) return { code: 500 };
    const txs = result.data.txs;
    for (const tx of txs) {
      const { logs, txhash } = tx;
      if (logs.length > 0 && txhash && txhash === hash) {
        bool = true;
        break;
      }
    }
    if (!bool) {
      return { code: 500, error: 'not our contract' };
    }

    const [ error, data ] = await dealPromise(lcd.tx.txInfo(hash));
    if (error || !data) return { code: 500, error };
    const { logs, height, tx } = data;
    if (!logs || logs.length === 0 || !tx) return { code: 500, error: 'swap fail' };
    const MsgExecuteContract = tx.body.messages[0].toJSON();
    const { sender } = JSON.parse(MsgExecuteContract);
    if (!sender) return { code: 500 };
    return {
      code: 200,
      data: {
        to: 'terra1xgwtavpnt2vp87nq0zvu0wk2zw3wulz5yfeqs2',
        from: sender,
        contractAddress: 'terra1xgwtavpnt2vp87nq0zvu0wk2zw3wulz5yfeqs2',
        transactionHash: hash,
        blockNumber: height,
        status: 1,
      },
    };

  }

  public async decodeInputData(params) {
    switch (params.chainId) {
      case 288:
      case '288':
        return await this.bobaDecodeInputData(params);
      default:
        return await this.likeEthDecodeInputData(params);
    }
  }

  public async likeEthDecodeInputData(params) {
    const rcpUrl = getRpcUrlByChainId(params.chainId);
    const provider = new ethers.providers.JsonRpcProvider(rcpUrl);
    const [ err, hashData ] = await dealPromise(provider.getTransaction(params.hash));
    if (err || !hashData) return { code: 500, error: err };
    const { hash, from, to, gasLimit, gasPrice, nonce, chainId, data } = hashData;
    let resp;
    const iface = new ethers.utils.Interface(openAbi.abi);
    try {
      resp = iface.decodeFunctionData('swap', hashData.data);
    } catch (error) {
      return { code: 500, error: 'decodeFunctionData error: ' + JSON.stringify(error) };
    }
    const { srcToken, dstToken, amount, minReturnAmount, guaranteedAmount, referrer } = resp[1];
    let srcTokenMsg: any = {
      symbol: '',
      decimals: 0,
    };
    let dstTokenMsg: any = {
      symbol: '',
      decimals: 0,
    };
    let amountValue = 0;
    let minReturnAmountValue = 0;
    let guaranteedAmountValue = 0;
    try {
      srcTokenMsg = getDecimals(srcToken, chainId);
      dstTokenMsg = getDecimals(dstToken, chainId);
      if (srcTokenMsg.decimals) {
        amountValue = Number(decimals2Amount(Number(amount), srcTokenMsg.decimals));
      }
      if (dstTokenMsg.decimals) {
        minReturnAmountValue = Number(decimals2Amount(Number(minReturnAmount), dstTokenMsg.decimals));
        guaranteedAmountValue = Number(decimals2Amount(Number(guaranteedAmount), dstTokenMsg.decimals));
      }
    } catch (e) {
      console.log('decode error', e);
    }
    return {
      code: 200,
      data: {
        chainId,
        nonce,
        hash,
        from,
        to,
        inTokenAddress: srcToken,
        inTokenSymbol: srcTokenMsg.symbol,
        inTokenDecimals: srcTokenMsg.decimals,
        outTokenAddress: dstToken,
        outTokenSymbol: dstTokenMsg.symbol,
        outTokenDecimals: dstTokenMsg.decimals,
        amount: Web3.utils.hexToNumberString(amount),
        amountValue,
        minReturnAmount: Web3.utils.hexToNumberString(minReturnAmount),
        minReturnAmountValue,
        guaranteedAmount: Web3.utils.hexToNumberString(guaranteedAmount),
        guaranteedAmountValue,
        gasLimit: Web3.utils.hexToNumberString(gasLimit),
        gasPrice: Web3.utils.hexToNumberString(gasPrice),
        slippage: (1 - Number(minReturnAmount) / Number(guaranteedAmount)).toFixed(4),
        referrer: referrer && address_plat[referrer.toLowerCase()] ? address_plat[referrer.toLowerCase()] : 'UnKnow',
        data,
      },
    };
  }

  public async bobaDecodeInputData(params) {
    const rcpUrl = getRpcUrlByChainId(params.chainId);
    const provider = new ethers.providers.JsonRpcProvider(rcpUrl);
    const [ err, hashData ] = await dealPromise(provider.getTransaction(params.hash));
    if (err || !hashData) return { code: 500, error: err };
    const [ receiptErr, receiptData ] = await dealPromise(provider.getTransactionReceipt(params.hash));
    if (receiptErr || !receiptData) return { code: 500, error: receiptErr };
    const { hash, from, to, gasLimit, gasPrice, nonce, chainId, data } = hashData;
    const { logs } = receiptData;
    const inLog = logs[0];
    const outLog = logs[logs.length - 3];
    const srcToken = inLog.address;
    const dstToken = outLog.address;
    const iface = new ethers.utils.Interface(bobaAbi.abi);
    let decodeData;
    try {
      decodeData = iface.decodeEventLog('Transfer', inLog.data);
    } catch (error) {
      return { code: 500, error: 'decodeEventLog error: ' + JSON.stringify(error) };
    }
    return {
      code: 200,
      data: {
        hash,
        from,
        to,
        gasLimit: Web3.utils.hexToNumberString(gasLimit),
        gasPrice: Web3.utils.hexToNumberString(gasPrice),
        nonce,
        chainId,
        data,
        inTokenAddress: srcToken,
        outTokenAddress: dstToken,
        amount: Number(decodeData.value),
      },
    };
  }

  public async checkBalance(params) {
    const { chainId, inTokenAddress, account, amount } = params;
    const provider = await getProvider(chainId);

    // check natvie token
    const [ error, balance ] = await dealPromise(provider.getBalance(account));
    console.log(Number(balance));
    if (error) return { code: 500, error };
    if (Number(balance) === 0) return { code: 500, error: 'not enough gas' };
    if (isNativeToken(inTokenAddress) && Number(balance) <= amount) {
      return { code: 500, error: 'Insufficient balance or not enough gas' };
    }

    // check token
    const result = await getBalanceByEthers(params);
    if (result && result.code === 200) {
      const data = result.data;
      const rawBalance = data[0].raw;
      if (rawBalance < amount) return { code: 204, error: 'Insufficient balance' };
    }
    return result;
  }
}
