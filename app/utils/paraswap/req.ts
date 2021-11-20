import { pkgReq } from '../commonReq';
import { quoteRes } from './res';
import { getDecimals } from '../utils';
export default class Paraswap {
  public async quote(params:any) {
    const reqUrl = 'https://apiv5.paraswap.io/prices';
    const reqBody = {
      srcToken: params.inTokenAddress,
      destToken: params.outTokenAddress,
      amount: params.amount,
      side: 'SELL',
      network: params.chainId,
      otherExchangePrices: 'true',
      partner: 'paraswap.io',
      srcDecimals: getDecimals(params.inTokenAddress, params.chainId).decimals,
      destDecimals: getDecimals(params.outTokenAddress, params.chainId).decimals,
    };
    const [ error, data ] = await pkgReq(reqUrl, reqBody);
    if (error) return { code: 500, error };
    return quoteRes(params, data);
  }
}
