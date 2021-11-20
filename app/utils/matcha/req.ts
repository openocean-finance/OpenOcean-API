import { pkgReq } from '../commonReq';
import { quoteRes } from './res';
export default class Matcha {
  public async quote(params:any) {
    let reqUrl = 'https://bsc-cached-api.matcha.0x.org/swap/v1/price';
    if (params.chainId === '137') {
      reqUrl = 'https://polygon-cached-api.matcha.0x.org/swap/v1/price';
    } else if (params.chainId === '43114') {
      reqUrl = 'https://avalanche.api.0x.org/swap/v1/price';
    } else if (params.chainId === '1') {
      reqUrl = 'https://cached-api.matcha.0x.org/swap/v1/price';
    } else if (params.chainId === '66') {
      reqUrl = 'https://fantom.api.0x.org/swap/v1/price';
    }
    const reqBody = {
      affiliateAddress: '0x86003b044f70dac0abc80ac8957305b6370893ed',
      sellAmount: params.amount,
      sellToken: params.inTokenAddress,
      excludedSources: '0x',
      includePriceComparisons: 'false',
      buyToken: params.outTokenAddress,
      skipValidation: 'true',
    };
    const [ error, data ] = await pkgReq(reqUrl, reqBody);
    if (error) return { code: 500, error };
    return quoteRes(params, data);
  }
}
