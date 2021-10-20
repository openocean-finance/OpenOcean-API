export const getRpcUrlByChainId = (chainId: string) => {
  return {
    1: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    56: 'https://bsc-dataseed1.binance.org/',
    66: 'https://exchainrpc.okex.org',
    100: 'https://rpc.xdaichain.com',
    128: 'https://http-mainnet-node.huobichain.com',
    137: 'https://rpc-mainnet.maticvigil.com',
    250: 'https://rpcapi.fantom.network',
    43114: 'https://api.avax.network/ext/bc/C/rpc',
  }[chainId];
};


export const isNativeToken = (token: string) => {
  return [
    '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    '0x0000000000000000000000000000000000001010',
    '0x0000000000000000000000000000000000000000',
  ].indexOf(token.toLowerCase()) >= 0;
};

export const getIdsByChainId = (chainId: string):any => {
  return {
    1: 'ethereum',
    56: 'binancecoin',
    137: 'matic-network',
    43114: 'wrapped-avax',
  }[chainId];
};

export const getPlatByChainId = (chainId: string):any => {
  return {
    1: 'ethereum',
    56: 'binance-smart-chain',
    137: 'polygon-pos',
    43114: 'avalanche',
  }[chainId];
};

export const getChainByChainId = (chainId: string):any => {
  return {
    1: 'eth',
    56: 'bsc',
    137: 'polygon',
    43114: 'avax',
  }[chainId];
};
