import { Service } from 'egg';
import OOEV1 from '../utils/ooe/v1/req';
import OOEV2 from '../utils/ooe/v2/req';
import OneInch from '../utils/1inch/req';
import Matcha from '../utils/matcha/req';
import Paraswap from '../utils/paraswap/req';
import { amount2Decimals, getDecimals, getTokenList } from '../utils/utils';
import { ethers } from 'ethers';
import { getRpcUrlByChainId } from '../utils/chain';
import { ecRecover } from '../utils/web3';
import { dealPromise } from '../utils/commonRes';


/**
 * MiddleWare Service
 */
const plats = {
  openoceanv1: new OOEV1(),
  openoceanv2: new OOEV2(),
  '1inch': new OneInch(),
  matcha: new Matcha(),
  paraswap: new Paraswap(),
};
export default class MiddleWare extends Service {
  public async test() {
    return 'hi openocean-api';
  }
  /**
   * quote
   */
  public async quote(params: any) {
    const { decimals } = getDecimals(params.inTokenAddress, params.chainId);
    // The original quantity is needed to calculate inUsd
    params.inAmount = params.amount;
    params.amount = amount2Decimals(params.amount, decimals);
    params.gasPrice = amount2Decimals(params.gasPrice, 9);
    const exChange = params.exChange;
    const plat = plats[exChange] || plats.openoceanv2;
    return await plat.quote(params);
  }

  /**
 * swap
 */
  public async swap(params: any) {
    const { decimals } = getDecimals(params.inTokenAddress, params.chainId);
    // The original quantity is needed to calculate inUsd
    params.inAmount = params.amount;

    // The rate of conversion
    params.amount = amount2Decimals(params.amount, decimals);
    params.gasPrice = amount2Decimals(params.gasPrice, 9);
    if (!params.privateKey) params.privateKey = this.config.privateKey;
    if (!params.account) params.account = this.config.address;
    return await plats.openoceanv2.swap(params);
  }


  /**
 * getList token list
 */
  public async tokenList(params) {
    return getTokenList(params.chainId);
  }

  /**
   * getList token list
   */
  public async createWallet(params) {
    const randomBytes = ethers.utils.randomBytes(32);
    // hexadecimal
    const privateKey = ethers.BigNumber.from(randomBytes)._hex;
    const rcpUrl = getRpcUrlByChainId(params.chainId);
    if (!rcpUrl) return { code: 204, error: 'invalid params, chainId: ' + params.chainId };
    const provider = new ethers.providers.JsonRpcProvider(rcpUrl);
    const wallet = new ethers.Wallet(privateKey, provider);
    if (wallet && wallet.address) {
      return { code: 200, data: { address: wallet.address, privateKey } };
    }
    return { code: 500, error: 'try again later' };
  }

  /**
   * getList token list
   */
  public async getBalance(params) {
    return await plats.openoceanv2.getBalance(params);
  }

  /**
   * get transaction
   */
  public async getTransaction(params) {
    const exChange = params.exChange || 'openoceanv2';
    return await plats[exChange].getTransaction(params);
  }

  /**
   * get transaction receipt
   */
  public async getTransactionReceipt(params) {
    const exChange = params.exChange || 'openoceanv2';
    return await plats[exChange].getTransactionReceipt(params);
  }

  public async transfer(params) {
    // The rate of conversion
    params.amount = amount2Decimals(params.amount, params.decimals);
    params.gasPrice = amount2Decimals(params.gasPrice, 9);
    if (!params.privateKey) params.privateKey = this.config.privateKey;
    if (!params.account) params.account = this.config.address;
    return await plats.openoceanv2.transfer(params);
  }

  public async ecRecover(params) {
    const [ error, data ] = await dealPromise(ecRecover(params.chainId, params.msg, params.signature, params.privateKey || this.app.config.privateKey));
    console.log(error, data);
    if (error) {
      return { code: 500, error };
    }
    return { code: 200, data };
  }
}
