import { toFixed, tokenToUsd } from './utils';
import { getDecimals, decimals2Amount } from './utils';
export const dexList = new Map();


export const dealPromise = promise => {
  return promise.then(data => {
    return [ null, data ];
  }).catch(err => {
    console.log(err);
    return [ JSON.stringify(err) ];
  });
};

// eslint-disable-next-line jsdoc/check-param-names
/**
 *
 * @param params
 * @param outAmount
 * @param gasPrice
 * @return
 */
export const pkgRes = async (params: any, outAmount: any, transCost: any): Promise<any> => {
  console.log(outAmount);
  const [ error, usd ] = await tokenToUsd(params);
  if (error) return { code: 500, error };

  const { decimals } = getDecimals(params.outTokenAddress, params.chainId);

  outAmount = decimals2Amount(outAmount, decimals);

  transCost = transCost ? decimals2Amount(transCost * params.gasPrice, 18) : undefined;
  let save;
  if (params.save) {
    save = decimals2Amount(params.save, decimals);
    save = toFixed(save, 4);
  }

  const inUsd = (usd.inUsd && params.inAmount) ? toFixed(usd.inUsd * params.inAmount, 4) : 0;
  const outUsd = (usd.outUsd && outAmount) ? toFixed(usd.outUsd * outAmount, 4) : 0;
  const transUsd = (usd.nativeUsd && transCost) ? toFixed(usd.nativeUsd * transCost, 4) : 0;
  outAmount = toFixed(outAmount, 4);
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
  return { code: 200, data: resp };
};
