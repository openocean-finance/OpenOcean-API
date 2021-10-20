import { pkgRes } from '../commonRes';

export const quoteRes = (params: any, respData: any): any => {
  console.log(respData);
  const result = respData.priceRoute;
  const gasPrice = result ? result.gasCost : undefined;
  const outAmount = result ? result.destAmount : undefined;
  return pkgRes(params, outAmount, gasPrice);
};
