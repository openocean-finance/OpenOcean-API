import { pkgRes } from '../commonRes';

export const quoteRes = (params: any, respData: any): any => {
  const result = respData.maxReturnResult;
  const gasPrice = result ? result.gasUnitsConsumed : undefined;
  const outMount = result ? result.toTokenAmount : undefined;
  return pkgRes(params, outMount, gasPrice);
};

