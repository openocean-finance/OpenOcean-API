import { pkgRes } from '../../commonRes';
import { haveSave } from '../../utils';

export const quoteRes = (params: any, respData: any): any => {
  console.log(respData);
  // hava save
  const save = haveSave(respData.outAmount, respData.dexes);
  params.save = save;
  return pkgRes(params, respData.outAmount, respData.estimatedGas);
};
