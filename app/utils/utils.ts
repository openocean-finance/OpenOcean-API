
import { Logger } from 'egg-logger';
import BigNumber from 'bignumber.js';
import { pkgReq } from '../utils/commonReq';
import { getIdsByChainId, getPlatByChainId } from './chain';
import { getPriceByAddress, getPriceByIds } from './supply';
import { getChainByChainId } from './chain';
import tokenAddressIds from './token.json';

export const logger = new Logger({});
export const tokenList = new Map();
export const getShift = (a, b) => new BigNumber(a).shiftedBy(Number(b)).toFixed();

export const decimals2Amount = (amount, decimals) => getShift(amount, -decimals);

export const getFixed = (val, fixed, trailingZeros) => {
  const numStr = val || '0';
  if (trailingZeros) {
    return new BigNumber(numStr).toFixed(fixed);
  }
  return new BigNumber(numStr).decimalPlaces(fixed).toString();
};
export const amount2Decimals = (amount, decimals) => getFixed(getShift(amount, decimals), 0, true);

export const haveSave = (outAmount: any, dexes: any): number => {
  const amounts: any = [];
  if (!dexes) return 0;
  let maxAmount = 0;
  for (const dex of dexes) {
    const swapAmount = dex.swapAmount;
    amounts.push(Number(swapAmount));

    for (const amount of amounts) {
      if (maxAmount < amount) maxAmount = amount;
    }
  }
  const save = outAmount - maxAmount;
  return save;
};

export const getDecimals = (address: string, chainId: string):any => {
  let decimals = 18;
  if (tokenList && tokenList.has(chainId)) {
    const tokenArr = tokenList.get(chainId);
    for (const token of tokenArr) {
      if (token.address === address) {
        decimals = token.decimals;
        break;
      }
    }
  }
  return decimals;
};

export const getCacheList = async (urls: any) => {
  tokenList.set('1', await pkgReq(urls['1'], undefined));
  tokenList.set('56', await pkgReq(urls['56'], undefined));
  tokenList.set('137', await pkgReq(urls['137'], undefined));
  tokenList.set('43114', await pkgReq(urls['43114'], undefined));
};

export const tokenToUsd = async (params: any):Promise<any> => {
  const inTokenAddress = params.inTokenAddress.toLowerCase();
  const outTokenAddress = params.outTokenAddress.toLowerCase();
  const plat = getPlatByChainId(params.chainId);
  const ids = getIdsByChainId(params.chainId);
  const nativeTokenUsd = await getPriceByIds(ids);
  const tokenUsd = await getPriceByAddress(plat, `${inTokenAddress},${outTokenAddress}`);
  let [ inUsd, outUsd, nativeUsd ] = [ tokenUsd[inTokenAddress], tokenUsd[outTokenAddress], nativeTokenUsd[ids] ];

  if (!inUsd) {
    const chain = getChainByChainId(params.chainId);
    const symbol = params.inTokenSymbol;
    const id = tokenAddressIds[`${chain}_${symbol}_${inTokenAddress}`];
    const idUsd = await getPriceByIds(id);
    if (idUsd && idUsd[ids]) {
      inUsd = idUsd[ids].usd;
    }
  } else {
    inUsd = inUsd.usd;
  }
  if (!outUsd) {
    const chain = getChainByChainId(params.chainId);
    const symbol = params.outTokenSymbol;
    const id = tokenAddressIds[`${chain}_${symbol}_${outTokenAddress}`];
    const idUsd = await getPriceByIds(id);
    if (idUsd && idUsd[ids]) {
      outUsd = idUsd[ids].usd;
    }
  } else {
    outUsd = outUsd.usd;
  }
  if (nativeUsd) {
    nativeUsd = nativeUsd.usd;
  }
  return { inUsd, outUsd, nativeUsd };
};
