import { pkgReq } from '../../commonReq';
import { quoteRes } from './res';
import { getRpcUrlByChainId, getChainByChainId, getIdsByChainId } from '../../chain';
import { ethers } from 'ethers';
import { decimals2Amount, getDecimals } from '../../utils';
import { getPriceByIds } from '../../supply';
import v1abi from '../../abi/v1abi.json';
import { dealPromise } from '../../commonRes';
// const url = 'https://ethapi.openocean.finance';
const url = 'http://ethapi.jys.in';
export default class OOEV1 {
  public async quote(params:any) {
    let reqUrl = `${url}/v1/quote`;
    if (params.chainId && params.chainId !== '1') {
      const chain = getChainByChainId(params.chainId);
      reqUrl = `${url}/v1/${chain}/quote`;
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
    const [ error, data ] = await pkgReq(reqUrl, reqBody);
    if (error) return { code: 500, error };
    return quoteRes(params, data);
  }

  public async tokenList(params: any) {
    // eth
    let reqUrl = `${url}/v1/token`;
    if (params.chainId && params.chainId !== '1') {
      const chain = getChainByChainId(params.chainId);
      reqUrl = `${url}/v1/${chain}/token`;
    }
    const [ err, data ] = await pkgReq(reqUrl, '');
    if (err) return { ret: 'fail', err };
    return { ret: 'ok', data };
  }

  public async getTransaction(params) {
    const rcpUrl = getRpcUrlByChainId(params.chainId);
    const provider = new ethers.providers.JsonRpcProvider(rcpUrl);
    const iface = new ethers.utils.Interface(v1abi.abi);
    const [ err, hashData ] = await dealPromise(provider.getTransaction(params.hash));
    if (err) return { code: 500, err };
    const { hash, blockNumber, from, to, timestamp, gasPrice } = hashData;
    console.log(hashData);
    const resp = await iface.decodeFunctionData('swap', hashData.data);
    console.log('resp', resp);
    const wait = await hashData.wait();
    const { gasUsed, transactionIndex } = wait;
    console.log(wait.transactionIndex, wait.gasUsed);
    console.log(resp);
    const [ srcToken, dstToken, amount, minReturnAmount ] = [ resp[0], resp[1], resp[2], resp[3] ];
    const srcTokenMsg = getDecimals(srcToken, params.chainId);
    const dstTokenMsg = getDecimals(dstToken, params.chainId);
    const ids = getIdsByChainId(params.chainId);
    let nativeUsd = await getPriceByIds(ids);
    if (nativeUsd) {
      nativeUsd = nativeUsd[ids] && nativeUsd[ids].usd ? nativeUsd[ids].usd : 0;
    }
    const gas = decimals2Amount(Number(gasPrice) * Number(gasUsed), 18);
    const gasFee = (Number(gas) * nativeUsd).toFixed(2);
    return {
      code: 200,
      data: {
        hash,
        blockNumber,
        transactionIndex,
        from,
        to,
        inTokenAddrss: srcToken,
        inTokenSymbol: srcTokenMsg.symbol,
        outTokenAddrss: dstToken,
        outTokenSymbol: dstTokenMsg.symbol,
        inAmount: Number(decimals2Amount(Number(amount), srcTokenMsg.decimals)),
        outAmount: Number(decimals2Amount(Number(minReturnAmount), dstTokenMsg.decimals)).toFixed(4),
        gasFee,
        timestamp,
      },
    };
  }
}
