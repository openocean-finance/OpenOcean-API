import { pkgRes } from '../commonRes';
import { haveSave } from '../utils';

export const quoteRes = (params: any, respData: any): any => {
  // hava save
  const save = haveSave(respData.outAmount, respData.dexes);
  params.save = save;
  params.path = respData.path;
  params.dexes = respData.dexes;
  if (params.exChange === 'openoceanv2') return pkgRes(params, respData.outAmount, respData.estimatedGas);
  const dexes = respData.dexes;
  let outAmount;
  if (dexes) {
    for (const dex of dexes) {
      if (dex.dexCode.toLowerCase() === params.exChange.toLowerCase()) {
        outAmount = dex.swapAmount;
      }
    }
  }
  if (outAmount) {
    return pkgRes(params, outAmount, respData.estimatedGas);
  }
  return { code: 201, error: 'invalid exChange ' + params.exChange };

};
