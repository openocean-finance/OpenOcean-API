import { Service } from 'egg';
import CHAIN_LIST from '../chains';
// import { BigNumber, Contract, ethers } from 'ethers';
// import { getRpcUrlByChainId, isNativeToken } from '../utils/chain';
// import { allowance } from '../utils/ether';
// import { amount2Decimals, getDecimals, decimals2Amount } from '../utils/utils';
// import { approve } from '../utils/web3';

export default class Wallet extends Service {
  /**
   * create wallet
   */
  public async createWallet(chain: string) {
    return await CHAIN_LIST[chain].createWallet();
  }
  // /**
  //      * getBalance
  //      */
  public async getBalance(chain: string, params) {
    return await CHAIN_LIST[chain].getBalance(params);
  }
  // public async checkBalance(params) {
  //   params.amount = Number(amount2Decimals(params.amount, params.in_token_decimals));
  //   return await plats.openocean.checkBalance(params);
  // }
  // /**
  //    * getList token list
  //    */
  public async allowance(chain: string, params) {
    return await CHAIN_LIST[chain].allowance(params);
  }

  public async approve(chain: string, params: any) {
    return await CHAIN_LIST[chain].allowance(params);
  }

}
