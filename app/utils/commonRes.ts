import { toFixed, tokenToUsd } from './utils';
import { decimals2Amount } from './utils';
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
export const pkgRes = async (params: any, estOutAmount: any, transCost: any): Promise<any> => {
  let usd: any = {};
  const { withUsd } = params;
  let outAmount: any = decimals2Amount(estOutAmount, params.out_token_decimals);
  transCost = transCost ? decimals2Amount(transCost * params.gasPrice, 18) : undefined;
  if (params.chainId === 401 || params.chainId === '401') transCost = 0.15;
  let save;
  if (params.save) {
    save = decimals2Amount(params.save, params.out_token_decimals);
    save = toFixed(save, 4);
  }
  if (withUsd === true || withUsd === 'true') {
    // ingore err
    [ , usd ] = await tokenToUsd(params);
  }
  const inUsd = (usd.inUsd && params.inAmount) ? toFixed(usd.inUsd * params.inAmount, 4) : undefined;
  const outUsd = (usd.outUsd && outAmount) ? toFixed(usd.outUsd * outAmount, 4) : undefined;
  const transUsd = (usd.nativeUsd && transCost) ? toFixed(usd.nativeUsd * transCost, 4) : undefined;
  outAmount = toFixed(outAmount, 4);
  const dexes = params.withDex ? params.dexes : undefined;
  const path = params.withRoute ? params.path : undefined;
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
    outAmount: params.withDecimals ? estOutAmount : outAmount,
    transCost,
    transUsd,
    save,
    nativeUsd: params.nativeTokenUsd,
    path,
    dexes,
    // crossType: '',
  };
  // params.redis.setex(params.key, '30', JSON.stringify(resp));
  return { code: 200, data: resp };
};
