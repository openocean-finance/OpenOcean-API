import { Contract, ethers } from 'ethers';
import erc20Abi from './abi/erc20Abi.json';
import BigNumber from 'bignumber.js';
import { getRpcUrlByChainId } from './chain';
import Web3 from 'web3';

/**
   * approve
*/
export const approve = async (approveContract: string, walletAddress: string, amount: string, inTokenAddress: string, wallet: ethers.Wallet) => {
  const contract = await new Contract(inTokenAddress, erc20Abi.abi, wallet);
  const bal = await contract.allowance(walletAddress, approveContract);
  console.log(amount, bal, Number(bal));
  if (Number(bal) > Number(amount)) {
    console.log('have approve');
    return;
  }
  let result;
  try {
    result = await contract.approve(approveContract, new BigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff').toFixed(0, 1));
  } catch (error) {
    console.log('approve error: ', error);
  }
  // this.ctx.logger.info('approve result', result);
  console.log('result: ', result);
  return {
    code: 0,
    msg: 'success',
    data: result,
  };
};

export const createWallet = async (chainId: string, privateKey: string) => {
  const rpcUrl = getRpcUrlByChainId(chainId);
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
  const wallet = new ethers.Wallet(privateKey, provider);
  return wallet;
};

export const getMyWallet = (chainId: any, privateKey):any => {
  const rpcUrl: any = getRpcUrlByChainId(chainId);
  const provider = new Web3.providers.HttpProvider(rpcUrl, { timeout: 30000 });
  const web3 = new Web3(provider);
  web3.eth.accounts.wallet.add(privateKey);
  return web3;
};

export const ecRecover = async (chaindId: string, msg: string, signature: string, privateKey: string): Promise<any> => {
  const web3: Web3 = getMyWallet(chaindId, privateKey);
  return await web3.eth.accounts.recover(msg, signature);
};
