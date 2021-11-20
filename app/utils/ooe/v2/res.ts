import { pkgRes } from '../../commonRes';
import { haveSave } from '../../utils';

export const quoteRes = (params: any, respData: any): any => {
  // hava save
  console.log(respData);
  const save = haveSave(respData.outAmount, respData.dexes);
  params.save = save;
  console.log(save);
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
  console.log(outAmount, respData.outAmount);
  if (outAmount) {
    return pkgRes(params, outAmount, respData.estimatedGas);
  }
  return { code: 204, error: 'invalid exChange ' + params.exChange };

};
