import { pkgReq } from '../commonReq';
import { quoteRes } from './res';

// import Apis from '../apiInterface';
export default class OneInch {
  public async quote(params:any) {
    let reqUrl = 'https://pathfinder-bsc-56.1inch.io/v1.1/quotes-by-presets';
    if (params.chainId === '137') {
      reqUrl = 'https://pathfinder-polygon-137.1inch.io/v1.1/quotes-by-presets';
    } else if (params.chainId === '1') {
      reqUrl = 'https://pathfinder-v3.1inch.io/v1.1/quotes-by-presets';
    }

    const reqBody = {
      chainId: params.chainId,
      fromTokenAddress: params.inTokenAddress,
      toTokenAddress: params.outTokenAddress,
      amount: params.amount,
      gasPrice: params.gasPrice,
    };
    const headers = {
      Referer: 'https://app.1inch.io/',
      'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36',
    };
    const [ error, data ] = await pkgReq(reqUrl, reqBody, headers);
    if (error) return { code: 500, error };
    return quoteRes(params, data);
  }


}
