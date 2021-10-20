import { Contract, ethers } from 'ethers';
import erc20Abi from './abi/erc20Abi.json';
import BigNumber from 'bignumber.js';

/**
   * approve
*/
export const approve = async (approveContract: string, amount: string, inTokenAddress: string, wallet: ethers.Wallet) => {
  console.log(amount, approveContract, inTokenAddress);
  const contract = await new Contract(inTokenAddress, erc20Abi.abi, wallet);
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
