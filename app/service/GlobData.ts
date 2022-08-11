/* eslint-disable no-var */
import { Service } from 'egg';
import { pkgReq } from '../utils/commonReq';
import { decimals2Amount } from '../utils/utils';
export let tokenList :any = {};
export let gasPriceList :any = {};
export let dexList :any = {
  401: [{ index: 0, code: 'innoswap', name: 'innoswap' }],
};


export const getCacheList = async (urls: any) => {
  const chainIds = Object.keys(urls);
  console.log(chainIds);
  for (const chainId of chainIds) {
    const [ err, data ] = await pkgReq(urls[chainId], undefined);
    if (!err) {
      tokenList[chainId] = data.data;
    }
  }
  return tokenList;
};

export const getCacheDexList = async (urls: any) => {
  const chainIds = Object.keys(urls);
  for (const chainId of chainIds) {
    const [ err, data ] = await pkgReq(urls[chainId], undefined);
    if (!err) {
      dexList[chainId] = data;
    }
  }
  return dexList;
};

export const gasPrice = async (urls: any) => {
  const chainIds = Object.keys(urls);
  for (const chainId of chainIds) {
    const [ err, data ] = await pkgReq(urls[chainId], undefined);
    if (!err) {
      const standard = (chainId === '1' ? data.base : data.standard);
      const gas = parseInt(decimals2Amount(standard, 9));
      gasPriceList[chainId] = gas ?? 5;
    }
  }
  return gasPriceList;
};

export const getGasPrice = chainId => {
  console.log(gasPriceList, chainId);
  return gasPriceList[chainId] || 5;
};

export const getTokenList = (chainId: string) => {
  if (tokenList[chainId]) {
    return { code: 200, data: tokenList[chainId] };
  }
  return { code: 204, error: `invalid params, chainId: ${chainId}` };
};

export const getDexList = (chainId: string) => {
  if (dexList[chainId]) {
    return { code: 200, data: dexList[chainId] };
  }
  return { code: 204, error: `invalid params, chainId: ${chainId}` };
};

/**
 * News Service
 */
export default class SyncData extends Service {
  public update(params: any) {
    if (params.tokenList) tokenList = params.tokenList;
    if (params.gasPriceList) gasPriceList = params.gasPriceList;
    if (params.dexList) dexList = params.dexList;
  }
}

