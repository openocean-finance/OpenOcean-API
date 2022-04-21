import { BigNumber, ethers } from 'ethers';

export interface BEP20Model extends ethers.Contract {
  symbol(): Promise<string>;
  name(): Promise<string>;
  decimals(): Promise<number>;
  balanceOf(account: string): Promise<BigNumber>;
  allowance(owner: string, spender: string): Promise<BigNumber>;
}
