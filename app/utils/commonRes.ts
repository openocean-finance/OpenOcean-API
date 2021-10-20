import { tokenToUsd } from './utils';
import { getDecimals, decimals2Amount } from './utils';
// eslint-disable-next-line jsdoc/check-param-names
/**
 *
 * @param params
 * @param outAmount
 * @param gasPrice
 * @return
 */
export const pkgRes = async (params: any, outAmount: any, transCost: any): Promise<any> => {
  const usd = await tokenToUsd(params);

  const decimals = getDecimals(params.outTokenAddress, params.chainId);

  outAmount = decimals2Amount(outAmount, decimals);

  transCost = transCost ? decimals2Amount(transCost * params.gasPrice, 18) : undefined;
  let save;
  if (params.save) {
    save = decimals2Amount(params.save, decimals);
    save = Number(save).toFixed(4);
  }

  const inUsd = usd.inUsd ? usd.inUsd * params.inAmount : undefined;
  const outUsd = usd.outUsd ? (usd.outUsd * outAmount).toFixed(4) : undefined;
  const transUsd = (usd.nativeUsd && transCost) ? (usd.nativeUsd * transCost).toFixed(4) : undefined;

  outAmount = Number(outAmount).toFixed(4);
  const resp: any = {
    inToken: {
      symbol: params.inTokenSymbol,
      chainId: params.chainId,
      address: params.inTokenAddress,
      inUsd,
    },
    outToken: {
      symbol: params.outTokenSymbol,
      chainId: params.chainId,
      address: params.outTokenAddress,
      outUsd,
    },
    inAmount: params.inAmount,
    outAmount,
    exChange: params.exChange,
    transCost,
    transUsd,
    save,
    nativeUsd: params.nativeTokenUsd,
    // crossType: '',
  };
  console.log('response body', resp, outAmount);
  return resp;
};
