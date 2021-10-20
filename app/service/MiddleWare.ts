import { Service, Application } from 'egg';
import OOEV1 from '../utils/ooe/v1/req';
import OOEV2 from '../utils/ooe/v2/req';
import OneInch from '../utils/1inch/req';
import Matcha from '../utils/matcha/req';
import Paraswap from '../utils/paraswap/req';
import { amount2Decimals, getDecimals } from '../utils/utils';
import { ethers } from 'ethers';
import { getRpcUrlByChainId } from '../utils/chain';
const app = new Application();
const privateKey = app.config.privateKey;
const address = app.config.address;
// import arbAbi from '../utils/arbAbi.json';

/**
 * MiddleWare Service
 */
const plats = {
  openoceanv1: new OOEV1(),
  openoceanv2: new OOEV2(),
  oneinch: new OneInch(),
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
    const decimals = getDecimals(params.inTokenAddress, params.chainId);
    // The original quantity is needed to calculate inUsd
    params.inAmount = params.amount;
    params.amount = amount2Decimals(params.amount, decimals);
    params.gasPrice = amount2Decimals(params.gasPrice, 9);
    const exChange = params.exChange;
    return await plats[exChange].quote(params);
  }

  /**
 * swap_quote
 */
  public async swap_quote(params: any) {
    const exChange = params.exChange;
    return await plats[exChange].swap_quote(params);
  }


  /**
 * swap
 */
  public async swap(params: any) {
    const decimals = getDecimals(params.inTokenAddress, params.chainId);
    // The original quantity is needed to calculate inUsd
    params.inAmount = params.amount;

    // The rate of conversion
    params.amount = amount2Decimals(params.amount, decimals);
    params.gasPrice = amount2Decimals(params.gasPrice, 9);
    params.privateKey = privateKey;
    params.account = address;
    // const exChange = params.exChange;
    return await plats.openoceanv2.swap(params);
  }


  /**
 * getList token list
 */
  public async tokenList(params) {
    return await plats.openoceanv1.tokenList(params);
  }

  /**
   * create wallet
   */
  public async createWallet(params) {
    const randomBytes = ethers.utils.randomBytes(32);
    // hexadecimal
    const privateKey = ethers.BigNumber.from(randomBytes)._hex;
    const rcpUrl = getRpcUrlByChainId(params.chainId);
    const provider = new ethers.providers.JsonRpcProvider(rcpUrl);
    const wallet = new ethers.Wallet(privateKey, provider);
    if (wallet && wallet.address) {
      return { ret: 'ok', address: wallet.address, privateKey };
    }
    return { ret: 'fail' };
  }

  /**
   * get balance
   */
  public async getBalance(params) {
    return await plats.openoceanv2.getBalance(params);
  }

  /**
   * get transaction
   */
  public async getTransaction(params) {
    const rcpUrl = getRpcUrlByChainId(params.chainId);
    console.log(rcpUrl);
    const provider = new ethers.providers.JsonRpcProvider(rcpUrl);
    const bool = await provider.getTransaction(params.hash);
    console.log(bool);
    return bool;
  }

  public async transfer(params) {
    // The rate of conversion
    params.amount = amount2Decimals(params.amount, params.decimals);
    params.gasPrice = amount2Decimals(params.gasPrice, 9);
    params.privateKey = privateKey;
    params.account = address;
    return await plats.openoceanv2.transfer(params);
  }
}
