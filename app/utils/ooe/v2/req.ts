import { ethers } from 'ethers';
import { pkgReq } from '../../commonReq';
import { quoteRes } from './res';
import { getRpcUrlByChainId, isNativeToken } from '../../chain';
import { approve } from '../../web3';
import allAbi from '../../abi/erc20Abi.json';

const url = 'https://ethapi.openocean.finance/v2/';

// const contract = new Contract();
export default class OOEV2 {
  public async swap_quote(params) {
    const chainId = params.chainId;
    const reqUrl = `${url}${chainId}/swap`;
    const reqBody = {
      inTokenSymbol: params.inTokenSymbol,
      inTokenAddress: params.inTokenAddress,
      outTokenSymbol: params.outTokenSymbol,
      outTokenAddress: params.outTokenAddress,
      amount: params.amount,
      gasPrice: params.gasPrice,
      slippage: params.slippage,
    };
    return await pkgReq(reqUrl, reqBody);
  }

  public async quote(params: any) {
    const chainId = params.chainId;
    const reqUrl = `${url}${chainId}/quote`;
    const reqBody = {
      inTokenSymbol: params.inTokenSymbol,
      inTokenAddress: params.inTokenAddress,
      outTokenSymbol: params.outTokenSymbol,
      outTokenAddress: params.outTokenAddress,
      amount: params.amount,
      gasPrice: params.gasPrice,
      slippage: params.slippage,
    };
    console.log(await pkgReq(reqUrl, reqBody));
    return await quoteRes(params, await pkgReq(reqUrl, reqBody));
  }

  public async swap(params) {
    const chainId = params.chainId;
    if (params.exChange !== 'openoceanv2') return 'invalid request only support openoceanv2';
    const reqUrl = `${url}${chainId}/swap`;
    console.log('v2 swap url: ', reqUrl);
    const reqBody = {
      inTokenAddress: params.inTokenAddress,
      outTokenAddress: params.outTokenAddress,
      amount: params.amount,
      gasPrice: params.gasPrice,
      slippage: params.slippage,
      account: params.account,
    };
    const swapResp = await pkgReq(reqUrl, reqBody);
    const rpcUrl = getRpcUrlByChainId(params.chainId);
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    const wallet = new ethers.Wallet(params.privateKey, provider);
    const exChangeResp = await pkgReq(`${url}${chainId}/exChange`, undefined, undefined);
    const tx: any = {
      to: swapResp.to,
      gasLimit: Math.floor(swapResp.estimatedGas * 1.5),
      gasPrice: +swapResp.gasPrice,
      data: swapResp.data,
    };
    if (!isNativeToken(params.inTokenAddress.toLowerCase())) {
      await approve(exChangeResp.approveContract, params.gasPrice, params.inTokenAddress, wallet);
    } else {
      tx.value = ethers.BigNumber.from(swapResp.value);
    }
    const respData = await wallet.sendTransaction(tx);
    if (respData && respData.hash) {
      return { ret: 'ok', hash: respData.hash };
    }
    return { ret: 'fail' };
  }

  public async transfer(params) {
    const rpcUrl = getRpcUrlByChainId(params.chainId);
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    const wallet = new ethers.Wallet(params.privateKey, provider);
    const tx1: any = {
      from: params.account,
    };
    const contract = new ethers.Contract(params.inTokenAddress, allAbi.abi, provider);
    const contractWithSigner = contract.connect(wallet);
    console.log(params.account);
    wallet.getBalance();
    // gas
    const estimateGas = await wallet.estimateGas(tx1);
    const respData = await contractWithSigner.transfer(params.targetAddress, params.amount, {
      gasLimit: Number(estimateGas) * 1.5,
      gasPrice: params.gasPrice,
    });
    if (respData && respData.hash) {
      return { ret: 'ok', hash: respData.hash };
    }
    return { ret: 'fail' };
  }

  public async getBalance(params) {
    if (params && !params.inTokenAddress) {
      return await this.getNativeBalance(params.chainId, params.address);
    }
    const rpcUrl = getRpcUrlByChainId(params.chainId);
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    // new Contract
    const contract = new ethers.Contract(params.inTokenAddress, allAbi.abi, provider);
    const balance = await contract.balanceOf(params.address);
    return await ethers.utils.formatEther((await balance)._hex);
  }

  public async getNativeBalance(chainId, address: string) {
    const bool = ethers.utils.isAddress(address);
    if (!bool) {
      return 'invalid address, please check your special config address';
    }
    const rcpUrl = getRpcUrlByChainId(chainId);
    console.log(rcpUrl);
    const provider = new ethers.providers.JsonRpcProvider(rcpUrl);
    const balance = await provider.getBalance(address);
    return await ethers.utils.formatEther((await balance)._hex);
  }
}
