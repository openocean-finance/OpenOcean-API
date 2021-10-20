import { pkgRes } from '../../commonRes';
import { haveSave } from '../../utils';

export const quoteRes = (params: any, respData: any): any => {
  // hava save
  console.log(respData);
  const save = haveSave(respData.outAmount, respData.dexes);
  params.save = save;
  console.log(save);
  return pkgRes(params, respData.outAmount, respData.estimatedGas);
};
