import { pkgReq } from '../../commonReq';
import { quoteRes } from './res';
import { getRpcUrlByChainId, getChainByChainId } from '../../chain';
import { approve } from '../../web3';
import { ethers } from 'ethers';
import { isNativeToken } from '../../chain';
const url = 'https://ethapi.openocean.finance/v1/';
export default class OOEV1 {
  public async swap_quote(params) {
    const chain = getChainByChainId(params.chainId);
    const reqUrl = `${url}${chain}/swap-quote`;
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

  public async quote(params:any) {
    let reqUrl = 'https://ethapi.openocean.finance/v1/quote';
    if (params.chainId && params.chainId !== '1') {
      const chain = getChainByChainId(params.chainId);
      reqUrl = `${url}${chain}/quote`;
    }

    const reqBody = {
      inTokenSymbol: params.inTokenSymbol,
      inTokenAddress: params.inTokenAddress,
      outTokenSymbol: params.outTokenSymbol,
      outTokenAddress: params.outTokenAddress,
      amount: params.amount,
      gasPrice: params.gasPrice,
      slippage: params.slippage,
    };
    return await quoteRes(params, await pkgReq(reqUrl, reqBody));
  }

  public async tokenList(params: any) {
    console.log(params);
    // eth
    let reqUrl = 'https://ethapi.openocean.finance/v1/token';
    if (params.chainId && params.chainId !== '1') {
      const chain = getChainByChainId(params.chainId);
      reqUrl = `${url}${chain}/token`;
    }
    return await pkgReq(reqUrl, '');
  }

  public async swap(params) {
    const chain = getChainByChainId(params.chainId);
    const reqUrl = `${url}${chain}/swap-quote`;
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
    const exChangeResp = await pkgReq(`${url}${chain}/exChange`, undefined, undefined);
    const tx = {
      to: swapResp.addresses[1] || swapResp.addresses[0],
      gasLimit: swapResp.estimatedGas * 1.5,
      gasPrice: +params.gasPrice,
      data: swapResp.calldata,
    };
    if (!isNativeToken(params.inTokenAddress.toLowerCase())) {
      await approve(exChangeResp.approveContract, params.gasPrice, params.inTokenAddress, wallet);
    }
    return await wallet.sendTransaction(tx);
  }
}
