import { MultiCallService, Web3ProviderConnector } from '@1inch/multicall';
import Web3 from 'web3';
import erc20Abi from './abi/erc20Abi.json';

import { getRpcUrlByChainId, isNativeToken } from './chain';
import { decimals2Amount, getDecimals } from './utils';

export async function getmultiCallBalance(inTokenAddress: string, walletAddress: string, chainId) {

  const result: any = {
    code: 200,
    data: [],
  };
  const rpcUrl = getRpcUrlByChainId(chainId);
  const web3: any = new Web3(new Web3.providers.HttpProvider(rpcUrl, { timeout: 30000 }));

  const provider = new Web3ProviderConnector(web3);
  const tokens = inTokenAddress.split(',');
  const tokenJ = {};
  const callDatas = tokens.map(tokenAddress => {
    const tokenMsg = getDecimals(tokenAddress, chainId);
    const decimals = tokenMsg.decimals;
    const symbol = tokenMsg.symbol;
    tokenJ[tokenAddress] = {
      decimals, symbol,
    };
    return {
      to: tokenAddress,
      data: provider.contractEncodeABI(
        erc20Abi.abi,
        tokenAddress,
        'balanceOf',
        [ walletAddress ],
      ),
    };
  });
  const multiCallService = new MultiCallService(provider, '0x804708de7af615085203fa2b18eae59c5738e2a9');

  const balances = await multiCallService.callByChunks(callDatas);
  for (let i = 0; i < tokens.length; i++) {
    const { symbol, decimals } = tokenJ[tokens[i]];
    let raw;
    if (isNativeToken(tokens[i])) {
      raw = await web3.eth.getBalance(walletAddress);
    } else {
      raw = Number(balances[i]);
    }
    const balance = Number(decimals2Amount(raw, decimals));
    const data = {
      symbol,
      balance,
      raw,
    };
    result.data.push(data);
  }
  if (result.data.length === 0) {
    result.code = 500;
    result.error = 'try again larter';
  }
  return result;
}
