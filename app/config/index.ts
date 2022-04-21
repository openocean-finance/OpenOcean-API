export const MARKET_API_URL: any = 'https://market-api.openocean.finance';
export const DEX_BACKEND_URL = 'https://ethapi.openocean.finance';

export enum EnumChainCode {
  ETH = 'eth',
  BSC = 'bsc',
  ONT = 'ont',
  TRON = 'tron',
  Solana = 'solana',
  Polygon = 'polygon',
  XDai = 'xdai',
  Fantom = 'fantom',
  Avalanche = 'avax',
  HECO = 'heco',
  OKEX = 'okex',
  Arbitrum = 'arbitrum',
  Optimism = 'optimism',
  Terra = 'terra',
  Boba = 'boba',
  Moonriver = 'moonriver',
  Aurora = 'aurora',
  Cronos = 'cronos',
  Harmony = 'harmony'
}

export enum EnumChainId {
  ETH = 1,
  BSC = 56,
  Polygon = 137,
  XDai = 100,
  Fantom = 250,
  Avalanche = 43114,
  HECO = 128,
  OKEX = 66,
  Arbitrum = 42161,
  Optimism = 10,
  Boba = 288,
  Moonriver = 1285,
  Aurora = 1313161554,
  Cronos = 25,
  Harmony = 1666600000
}

export enum EnumNativeToken {
  ETH = 'ethereum',
  BSC = 'binancecoin',
  ONT = '',
  TRON = '',
  Solana = 'solana',
  Polygon = 'matic-network',
  XDai = 'wrapped-xda',
  Fantom = 'fantom',
  Avalanche = 'wrapped-avax',
  HECO = 'huobi-token',
  OKEX = 'okexchain',
  Arbitrum = 'ethereum',
  Optimism = 'ethereum',
  Terra = 'terrausd',
  Boba = 'ethereum',
  Moonriver = 'moonriver',
  Aurora = 'ethereum',
  Cronos = 'crypto-com-chain',
  Harmony = 'harmony'
}
export enum EnumRPC {
  ETH = 'https://api.etherscan.io/',
  BSC = 'https://bsc-dataseed1.binance.org/',
  ONT = '',
  TRON = '',
  Solana = '',
  Polygon = 'https://rpc-mainnet.maticvigil.com',
  XDai = 'https://rpc.xdaichain.com',
  Fantom = 'https://rpcapi.fantom.network/',
  Avalanche = 'https://api.avax.network/ext/bc/C/rpc',
  HECO = 'https://http-mainnet-node.huobichain.com',
  OKEX = 'https://exchainrpc.okex.org',
  Arbitrum = '',
  Optimism = 'https://mainnet.optimism.io',
  Terra = 'https://lcd.terra.dev/',
  Boba = 'https://mainnet.boba.network',
  Moonriver = '',
  SolanaQuoteUrl = 'http://ethapi.jys.in/v1/solana/quote',
  SolanaSwapQuoteUrl = 'http://ethapi.jys.in/v1/solana/swap-quote',
  SolanaMarketUrl = '',
  Aurora = 'https://mainnet.aurora.dev/',
  Cronos = '',
  Harmony = ''
}

export enum EnumContract {
  ETH = '0x6352a56caadc4f1e25cd6c75970fa768a3304e64',
  BSC = '0x6352a56caadc4f1e25cd6c75970fa768a3304e64',
  ONT = '0x6352a56caadc4f1e25cd6c75970fa768a3304e64',
  TRON = '0x6352a56caadc4f1e25cd6c75970fa768a3304e64',
  Solana = '2mJZ38dRtFLyzwdAmWy5iZjeXkmERX5jJdWQ3Lo5JwBd',
  Polygon = '0x6352a56caadc4f1e25cd6c75970fa768a3304e64',
  XDai = '0x6352a56caadc4f1e25cd6c75970fa768a3304e64',
  Fantom = '0x6352a56caadc4f1e25cd6c75970fa768a3304e64',
  Avalanche = '0x6352a56caadc4f1e25cd6c75970fa768a3304e64',
  HECO = '0x6352a56caadc4f1e25cd6c75970fa768a3304e64',
  OKEX = '0x6352a56caadc4f1e25cd6c75970fa768a3304e64',
  Arbitrum = '0x6352a56caadc4f1e25cd6c75970fa768a3304e64',
  Optimism = '0x6352a56caadc4f1e25cd6c75970fa768a3304e64',
  Terra = 'terra1xgwtavpnt2vp87nq0zvu0wk2zw3wulz5yfeqs2',
  Boba = '0x6352a56caadc4f1e25cd6c75970fa768a3304e64',
  Moonriver = '0x6352a56caadc4f1e25cd6c75970fa768a3304e64',
  Aurora = '0x6352a56caadc4f1e25cd6c75970fa768a3304e64',
  Cronos = '0x6352a56caadc4f1e25cd6c75970fa768a3304e64',
  Harmony = ''
}

export enum EnumUrl {
  ETH = 'https://etherscan.io/txs',
  BSC = 'https://bscscan.com/txs',
  ONT = '',
  TRON = 'https://apiasia.tronscan.io:5566',
  Solana = 'https://api.solscan.io/transaction',
  Polygon = 'https://polygonscan.com/txs',
  XDai = 'https://blockscout.com/xdai/mainnet/address/0x6352a56caadC4F1E25CD6c75970Fa768A3304e64/transactions?type=JSON',
  Fantom = 'https://ftmscan.com/txs',
  Avalanche = 'https://snowtrace.io/txs',
  HECO = 'https://hecoinfo.com/txs',
  OKEX = 'https://www.oklink.com/api/explorer/v1/okexchain/addresses/0x6352a56caadc4f1e25cd6c75970fa768a3304e64/transactions/condition',
  Arbitrum = 'https://arb1-indexer.arbitrum.io/graphql',
  Optimism = 'https://optimistic.etherscan.io/txs',
  Terra = 'https://fcd.terra.dev/v1/txs',
  Boba = 'https://blockexplorer.boba.network/address/0x6352a56caadC4F1E25CD6c75970Fa768A3304e64/transactions?type=JSON',
  Moonriver = 'https://moonriver.moonscan.io/address/0x6352a56caadc4f1e25cd6c75970fa768a3304e64',
  Aurora = 'https://aurorascan.dev/txs',
  Cronos = 'https://cronos.org/explorer/address/0x6352a56caadC4F1E25CD6c75970Fa768A3304e64/transactions?type=JSON',
  Harmony = ''
}

export enum EnumQuoteUrl {
  ETH = 'https://ethapi.openocean.finance/v2/1/quote',
  BSC = 'https://ethapi.openocean.finance/v2/56/quote',
  ONT = 'https://ethapi.openocean.finance/v1/ont/quote',
  TRON = 'https://ethapi.openocean.finance/v1/tron/quote',
  Solana = 'https://ethapi.openocean.finance/v1/solana/quote',
  Polygon = 'https://ethapi.openocean.finance/v2/137/quote',
  XDai = 'https://ethapi.openocean.finance/v2/100/quote',
  Fantom = 'https://ethapi.openocean.finance/v2/250/quote',
  Avalanche = 'https://ethapi.openocean.finance/v2/43114/quote',
  HECO = 'https://ethapi.openocean.finance/v2/128/quote',
  OKEX = 'https://ethapi.openocean.finance/v2/66/quote',
  Arbitrum = 'https://ethapi.openocean.finance/v2/42161/quote',
  Optimism = 'https://ethapi.openocean.finance/v2/10/quote',
  Terra = 'https://ethapi.openocean.finance/v1/terra/quote',
  Boba = 'https://ethapi.openocean.finance/v2/288/quote',
  Moonriver = 'https://ethapi.openocean.finance/v2/1285/quote',
  Aurora = 'https://ethapi.openocean.finance/v2/1313161554/quote',
  Cronos = 'https://ethapi.openocean.finance/v2/25/quote',
  Harmony = 'https://ethapi.openocean.finance/v2/1666600000/quote'
}

export enum EnumSwapQuoteUrl {
  ETH = 'https://ethapi.openocean.finance/v2/1/swap',
  BSC = 'https://ethapi.openocean.finance/v2/56/swap',
  ONT = 'https://ethapi.openocean.finance/v1/ont/swap-quote',
  TRON = 'https://ethapi.openocean.finance/v1/tron/swap-quote',
  Solana = 'https://ethapi.openocean.finance/v1/solana/swap-quote',
  Polygon = 'https://ethapi.openocean.finance/v2/137/swap',
  XDai = 'https://ethapi.openocean.finance/v2/100/swap',
  Fantom = 'https://ethapi.openocean.finance/v2/250/swap',
  Avalanche = 'https://ethapi.openocean.finance/v2/43114/swap',
  HECO = 'https://ethapi.openocean.finance/v2/128/swap',
  OKEX = 'https://ethapi.openocean.finance/v2/66/swap',
  Arbitrum = 'https://ethapi.openocean.finance/v2/42161/swap',
  Optimism = 'https://ethapi.openocean.finance/v2/10/swap',
  Terra = 'https://ethapi.openocean.finance/v1/terra/swap-quote',
  Boba = 'https://ethapi.openocean.finance/v2/288/swap',
  Moonriver = 'https://ethapi.openocean.finance/v2/1285/swap',
  Aurora = 'https://ethapi.openocean.finance/v2/1313161554/swap',
  Cronos = 'https://ethapi.openocean.finance/v2/25/swap',
  Harmony = 'https://ethapi.openocean.finance/v2/1666600000/swap'
}
export enum EnumTokenListUrl {
  ETH = 'https://market-api.openocean.finance/v2/eth/token',
  BSC = 'https://market-api.openocean.finance/v2/bsc/token',
  ONT = 'https://market-api.openocean.finance/v2/ont/token',
  TRON = 'https://market-api.openocean.finance/v2/tron/token',
  Solana = 'https://market-api.openocean.finance/v2/solana/token',
  Polygon = 'https://market-api.openocean.finance/v2/polygon/token',
  XDai = 'https://market-api.openocean.finance/v2/xdai/token',
  Fantom = 'https://market-api.openocean.finance/v2/fantom/token',
  Avalanche = 'https://market-api.openocean.finance/v2/avax/token',
  HECO = 'https://market-api.openocean.finance/v2/heco/token',
  OKEX = 'https://market-api.openocean.finance/v2/okex/token',
  Arbitrum = 'https://market-api.openocean.finance/v2/arbitrum/token',
  Optimism = 'https://market-api.openocean.finance/v2/optimism/token',
  Terra = 'https://market-api.openocean.finance/v2/terra/token',
  Boba = 'https://market-api.openocean.finance/v2/boba/token',
  Moonriver = 'https://market-api.openocean.finance/v2/moonriver/token',
  Aurora = 'https://market-api.openocean.finance/v2/aurora/token',
  Cronos = 'https://market-api.openocean.finance/v2/cronos/token',
  Harmony = 'https://market-api.openocean.finance/v2/harmony/token'
}

export enum EnumDexListUrl {
  ETH = 'https://ethapi.openocean.finance/v2/1/dex',
  BSC = 'https://ethapi.openocean.finance/v2/56/dex',
  ONT = 'https://ethapi.openocean.finance/v1/ont/dex',
  TRON = 'https://ethapi.openocean.finance/v1/tron/dex',
  Solana = 'https://ethapi.openocean.finance/v1/solana/dex',
  Polygon = 'https://ethapi.openocean.finance/v2/137/dex',
  XDai = 'https://ethapi.openocean.finance/v2/100/dex',
  Fantom = 'https://ethapi.openocean.finance/v2/250/dex',
  Avalanche = 'https://ethapi.openocean.finance/v2/43114/dex',
  HECO = 'https://ethapi.openocean.finance/v2/128/dex',
  OKEX = 'https://ethapi.openocean.finance/v2/66/dex',
  Arbitrum = 'https://ethapi.openocean.finance/v2/42161/dex',
  Optimism = 'https://ethapi.openocean.finance/v2/10/dex',
  Terra = 'https://ethapi.openocean.finance/v1/terra/dex',
  Boba = 'https://ethapi.openocean.finance/v2/288/dex',
  Moonriver = 'https://ethapi.openocean.finance/v2/1285/dex',
  Aurora = 'https://ethapi.openocean.finance/v2/1313161554/dex',
  Cronos = 'https://ethapi.openocean.finance/v2/25/dex',
  Harmony = 'https://ethapi.openocean.finance/v2/1666600000/dex'
}

export enum EnumGasPriceUrl {
  ETH = 'https://ethapi.openocean.finance/v2/1/gas-price',
  BSC = 'https://ethapi.openocean.finance/v2/56/gas-price',
  ONT = 'https://ethapi.openocean.finance/v1/ont/gas-price',
  TRON = 'https://ethapi.openocean.finance/v1/tron/gas-price',
  Solana = 'https://ethapi.openocean.finance/v1/solana/gas-price',
  Polygon = 'https://ethapi.openocean.finance/v2/137/gas-price',
  XDai = 'https://ethapi.openocean.finance/v2/100/gas-price',
  Fantom = 'https://ethapi.openocean.finance/v2/250/gas-price',
  Avalanche = 'https://ethapi.openocean.finance/v2/43114/gas-price',
  HECO = 'https://ethapi.openocean.finance/v2/128/gas-price',
  OKEX = 'https://ethapi.openocean.finance/v2/66/gas-price',
  Arbitrum = 'https://ethapi.openocean.finance/v2/42161/gas-price',
  Optimism = 'https://ethapi.openocean.finance/v2/10/gas-price',
  Terra = 'https://ethapi.openocean.finance/v1/terra/gas-price',
  Boba = 'https://ethapi.openocean.finance/v2/288/gas-price',
  Moonriver = 'https://ethapi.openocean.finance/v2/1285/gas-price',
  Aurora = 'https://ethapi.openocean.finance/v2/1313161554/gas-price',
  Cronos = 'https://ethapi.openocean.finance/v2/25/gas-price',
  Harmony = 'https://ethapi.openocean.finance/v2/1666600000/gas-price'
}

export const isNativeToken = (token: string) => {
  return [
    '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    '0x0000000000000000000000000000000000001010',
    '0x0000000000000000000000000000000000000000',
  ].indexOf(token.toLowerCase()) >= 0;
};
