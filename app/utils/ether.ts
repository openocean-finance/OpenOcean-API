import { Contract, ethers } from 'ethers';
import { getRpcUrlByChainId } from './chain';
import erc20Abi from './abi/erc20Abi.json';
import BigNumber from 'bignumber.js';
import { pkgReq } from './commonReq';
import { amount2Decimals, getDecimals, decimals2Amount } from './utils';
import { dealPromise } from './commonRes';
import { isNativeToken } from './chain';
import allAbi from '../utils/abi/erc20Abi.json';
// get contract
const approveContractUrl = 'https://ethapi.openocean.finance/v2/';

export const getMyWallet = async (chainId: any, privateKey: string) => {
  // get rpcUrl
  const rpcUrl = getRpcUrlByChainId(chainId);
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
  const myWallet = new ethers.Wallet(privateKey, provider);
  return { provider, myWallet };
};

export const getTokenContract = async (chainId, tokenAddress, privateKey: string) => {
  const { myWallet } = await getMyWallet(chainId, privateKey);
  return new Contract(tokenAddress, erc20Abi.abi, myWallet);
};

/**
   * approve
*/
export const sendApprove = async (chainId: any, inTokenAddress: string, wallet: ethers.Wallet) => {
  const exChangeResp = await pkgReq(`${approveContractUrl}${chainId}/exChange`, undefined, undefined);
  const approveContract = exChangeResp.approveContract;
  const contract = await new Contract(inTokenAddress, erc20Abi.abi, wallet);
  let result;
  try {
    console.log(approveContract);
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

/**
 *
 */
export async function sendEthApprove(account, inToken, type, amount, gasPrice, toContract, myWallet) {
  const contract = new myWallet.eth.Contract(erc20Abi.abi, inToken);
  const approveAmount =
    type === '1'
      ? new BigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff').toFixed(
        0,
        1,
      )
      : amount;
  const gasAmount = await contract.methods.approve(toContract, approveAmount).estimateGas({
    from: account,
  });
  console.log(account, amount2Decimals(gasPrice, 9), gasAmount);
  return await contract.methods.approve(toContract, approveAmount).send({
    from: account,
    gasPrice: amount2Decimals(gasPrice, 9),
    gas: 210000,
  });
}

export async function getBalanceByEthers(params) {
  const { chainId, account, inTokenAddress } = params;
  const bool = ethers.utils.isAddress(account);
  if (!bool) {
    return { code: 204, error: `invalid params, please check your special config address: ${account}` };
  }
  const tokenAddressArr = inTokenAddress.split(',');
  const result: any = {
    code: 200,
    data: [],
  };
  const rpcUrl = getRpcUrlByChainId(chainId);
  if (!rpcUrl) return { code: 204, error: `invalid params, chainId: ${chainId}` };
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
  for (let tokenAddress of tokenAddressArr) {
    tokenAddress = tokenAddress.trim();
    const tokenMsg = getDecimals(tokenAddress, chainId);
    const decimals = tokenMsg.decimals;
    const symbol = tokenMsg.symbol;
    let raw;
    if (isNativeToken(tokenAddress)) {
      const [ error, data ] = await dealPromise(provider.getBalance(account));
      if (error) return { code: 500, error };
      raw = data;
    } else {
      const contract = new ethers.Contract(tokenAddress, allAbi.abi, provider);
      const [ error, data ] = await dealPromise(contract.balanceOf(account));
      console.log(data);
      if (error) return { code: 500, error };
      raw = data;
    }
    raw = Number(raw);
    const balance = Number(decimals2Amount(Number(raw), decimals));
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

export const allowance = async (approveContract: string, walletAddress: string, inTokenAddress: string, wallet: ethers.Wallet) => {
  const contract = await new Contract(inTokenAddress, erc20Abi.abi, wallet);
  const bal = await contract.allowance(walletAddress, approveContract);
  return { code: 200, data: { allowance: Number(bal) } };
};
