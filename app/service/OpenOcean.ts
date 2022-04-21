import { Service } from 'egg';
// import OOE from '../utils/ooe/req';
// import OneInch from '../utils/1inch/req';
// import Matcha from '../utils/matcha/req';
// import Paraswap from '../utils/paraswap/req';
// import { amount2Decimals, getDecimals } from '../utils/utils';
// import { getTokenList, getGasPrice, getDexList } from './GlobData';
// import { getChainById } from '../utils/chain';
// import { dealPromise } from '../utils/commonRes';
import quoteSchema from '../schemas/quote.json';
import swapSchema from '../schemas/swap.json';
// import { getProvider } from '../utils/ether';
import CHAIN_LIST from '../chains';

import Ajv from 'ajv';
// import axios from 'axios';

const options = { allErrors: true }; //
const ajv = new Ajv(options); //  new Ajv.default()

/**
 * MiddleWare Service
 */
// const plats = {
//   openocean: new OOE(),
//   '1inch': new OneInch(),
//   matcha: new Matcha(),
//   paraswap: new Paraswap(),
// };
export default class OpenOcean extends Service {
  /**
   * quote
   */
  public async quote(chain: string, params: any) {
    // schema params
    const isValid = ajv.validate(quoteSchema, params);
    if (!isValid) return { code: 201, error: ajv.errorsText() };
    return await CHAIN_LIST[chain].quote(params);
  }

  public async syncData(chain: string, params: any) {
    return await CHAIN_LIST[chain].syncData(params);
  }
  public async getTokenList(chain: string) {
    return await CHAIN_LIST[chain].getTokenList();
  }
  public async getDexList(chain: string) {
    return await CHAIN_LIST[chain].getDexList();
  }
  public async getGasPrice(chain: string) {
    return await CHAIN_LIST[chain].getGasPrice();
  }

  public async swap_quote(chain: string, params: any) {
    params.slippage = +params.slippage;
    const isValid = ajv.validate(swapSchema, params);
    if (!isValid) return { code: 201, error: ajv.errorsText() };
    return await CHAIN_LIST[chain].swap_quote(params);
  }

  public async swap(chain: string, params: any) {
    return await CHAIN_LIST[chain].swap_quote(params);
  }

  public async getTransaction(chain: string, params: any) {
    return await CHAIN_LIST[chain].getTransaction(params);
  }

  public async getChainMsg(chain: string, params: any) {
    return await CHAIN_LIST[chain].getTransaction(params);
  }
  public async getTxs(chain: string, params: any) {
    return await CHAIN_LIST[chain].getTxs(params);
  }

  public async decodeInputData(chain: string, params: any) {
    return await CHAIN_LIST[chain].decodeInputData(params);
  }
  public async getTransactionReceipt(chain: string, params: any) {
    return await CHAIN_LIST[chain].getTransactionReceipt(params);
  }

  public async getBlockNumber(chain: string) {
    return await CHAIN_LIST[chain].getBlockNumber();

  }
  public async getHashFromChain(chain: string, params: any) {
    return await CHAIN_LIST[chain].getHashFromChain(params);
  }
}
