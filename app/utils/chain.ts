export const getMulticallAddress = (chainId: string): any => {
  return {
    1: '0x8d035edd8e09c3283463dade67cc0d49d6868063',
    56: '0x804708de7af615085203fa2b18eae59c5738e2a9',
    137: '0x0196e8a9455a90d392b46df8560c867e7df40b34',
  }[chainId];
};
export const getPublicRpcUrlByChainId = (chainId: string): any => {
  return {
    1: 'https://api.etherscan.io/',
    10: 'https://mainnet.optimism.io',
    56: 'https://bsc-dataseed1.binance.org/',
    97: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    66: 'https://exchainrpc.okex.org',
    100: 'https://rpc.xdaichain.com',
    128: 'https://http-mainnet-node.huobichain.com',
    137: 'https://rpc-mainnet.maticvigil.com',
    250: 'https://rpcapi.fantom.network/',
    288: 'https://mainnet.boba.network/',
    42161: 'https://arb1.arbitrum.io/rpc',
    43114: 'https://api.avax.network/ext/bc/C/rpc',
  }[chainId];
};

// TODO: rename... this is just an hotfix
export const getRpcUrlByChainId = getPublicRpcUrlByChainId;
//
export const isNativeToken = (token: string) => {
  return [
    '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    '0x0000000000000000000000000000000000001010',
    '0x0000000000000000000000000000000000000000',
    '',
    '',
  ].indexOf(token.toLowerCase()) >= 0;
};
export const getIdsByChainId = (chainId: string):any => {
  return {
    1: 'ethereum',
    10: '',
    56: 'binancecoin',
    66: 'okexchain',
    100: 'xdai',
    128: 'huobi-token',
    137: 'matic-network',
    250: 'fantom',
    288: 'weth',
    // xdai: 'wrapped-xda',
    43114: 'wrapped-avax',
    42164: '',
    terra: 'uusd',
    401: 'ong',
  }[chainId];
};
export const getChainById = (chainId: string): any => {
  return {
    1: 'eth',
    56: 'bsc',
    137: 'polygon',
    250: 'fantom',
    43114: 'avax',
  }[chainId];
};

export const getChainByChainId = (chainId: string):any => {
  return {
    1: 'eth',
    56: 'bsc',
    66: 'okex',
    100: 'xdai',
    128: 'heco',
    137: 'polygon',
    250: 'fantom',
    288: 'boba',
    43114: 'avalanche',
    42161: 'arbitrum',
    400: 'terra', // custom chainId
    ont: 'ont',
    tron: 'tron',
    solana: 'solana',
    terra: 'terra',
  }[chainId];
};