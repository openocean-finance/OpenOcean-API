
import { Logger } from 'egg-logger';
import BigNumber from 'bignumber.js';
import { getPriceByIds } from './supply';
import { getChainByChainId, isNativeToken, getIdsByChainId } from './chain';
import tokenAddressIds from './token.json';
import { tokenList } from '../service/GlobData';

export const logger = new Logger({});
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
  chainId = chainId + '';
  if (tokenList && tokenList[chainId]) {
    const tokenArr = tokenList[chainId];
    for (const token of tokenArr) {
      if (token.address.toLowerCase() === address.toLocaleLowerCase()) {
        console.log('true');
        return token;
      }
    }
  }
  return {};
};

export const getTokenAddress = (symbol: string, chainId: string):any => {
  chainId = chainId + '';
  if (tokenList && tokenList[chainId]) {
    const tokenArr = tokenList[chainId];
    for (const token of tokenArr) {
      if (token.symbol.toLowerCase() === symbol.toLocaleLowerCase()) {
        console.log('true');
        return token.address;
      }
    }
  }
  return {};
};

export const getId = (symbol, tokenAddress, chainId: string) => {
  if (isNativeToken(tokenAddress)) {
    return getIdsByChainId(chainId);
  }
  const chain = getChainByChainId(chainId);
  if (symbol) symbol = symbol.toLowerCase();
  return tokenAddressIds[`${chain}_${symbol}_${tokenAddress}`] || tokenAddressIds[`${chain}_${symbol}_${tokenAddress.toLocaleLowerCase()}`];
};

export const tokenToUsd = async (params: any):Promise<any> => {
  const { inTokenAddress, inTokenSymbol, outTokenAddress, outTokenSymbol, chainId } = params;
  const inTokenId = getId(inTokenSymbol, inTokenAddress, chainId);
  const outTokenId = getId(outTokenSymbol, outTokenAddress, chainId);
  const nativeId = getIdsByChainId(params.chainId);
  const ids = inTokenId + ',' + outTokenId + ',' + nativeId;
  const [ error, price ] = await getPriceByIds(ids);
  if (error) return [ null, { inUsd: 0, outUsd: 0, nativeUsd: 0 }];
  return [ null, { inUsd: price[inTokenId] ? price[inTokenId].usd : 0,
    outUsd: price[outTokenId] ? price[outTokenId].usd : 0,
    nativeUsd: price[nativeId] ? price[nativeId].usd : 0,
  }];
};

export const toFixed = function(val, decimal) {
  if (!val) return '';
  const value = Math.pow(10, decimal || 8);
  return Math.floor(val * value) / value;
};

export const toNonExponential = function(num?: any) {
  if (!num) return '';
  const _num = Number(num);
  const m: any = _num.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/);
  return _num.toFixed(Math.max(0, (m[1] || '').length - m[2]));
};

