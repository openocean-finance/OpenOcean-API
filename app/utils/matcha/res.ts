import { pkgRes } from '../commonRes';
export const quoteRes = (params: any, respData: any): any => {
  const outAmount = respData.buyAmount; // respData.price
  return pkgRes(params, outAmount, respData.estimatedGas);
};
