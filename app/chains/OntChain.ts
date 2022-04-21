/**
* @name OntChain
* @author openocean
* @date 2021/4/21
* @desc
*/
import axios from 'axios';
import { Context } from 'egg';
import { EnumRPC, EnumContract, EnumChainCode, EnumNativeToken, EnumUrl, EnumQuoteUrl, EnumDexListUrl, EnumGasPriceUrl, EnumTokenListUrl, EnumSwapQuoteUrl } from '../config';
import { DexModel } from '../models';
import { TokenModel } from '../models/token';
import { pkgReq } from '../utils/commonReq';
import BaseChain from './BaseChain';
// import { LCDClient } from '@terra-money/terra.js';
// const lcd = new LCDClient({
//   URL: 'https://lcd.terra.dev/',
//   chainID: 'bombay-12',
// });

class OntChain extends BaseChain {
  public tokeListUrl: EnumTokenListUrl = EnumTokenListUrl.ONT;
  public dexListUrl: EnumDexListUrl = EnumDexListUrl.ONT;
  public gasPriceUrl: EnumGasPriceUrl = EnumGasPriceUrl.ONT;
  public rpcUrl: EnumRPC = EnumRPC.ONT;
  public quoteUrl: EnumQuoteUrl = EnumQuoteUrl.ONT;
  public swapQuoteUrl: EnumSwapQuoteUrl = EnumSwapQuoteUrl.ONT;
  public gasPrice: number;
  public dexList: DexModel[];

  public provider: any;
  public chain = EnumChainCode.ONT;
  public rpc = EnumRPC.ONT;
  public tokenIds = EnumNativeToken.ONT;
  public scanStep = 500;
  public scanLimit = 1000;
  public tokenPrice = 0;
  public hashMap = {};
  public ctx: Context;
  public tokenList: Array<TokenModel> = [];
  public contractAddress = EnumContract.ONT;
  public url = EnumUrl.ONT;

  public getDexList() {
    return { code: 200, data: [{ index: 0, code: 'innoswap', name: 'innoswap' }] };
  }
  public async getBalance(params: any): Promise<any> {
    const { account, inTokenAddress } = params;
    const result: any = {
      code: 200,
      data: [],
    };
    const tokenAddressArr = inTokenAddress.split(',');

    const [ error, data ] = await pkgReq('https://ethapi.openocean.finance/v1/ont/token-balance', { token: tokenAddressArr, account }, {});
    if (error) return { code: 204, error };
    for (const address in data) {
      const tokenMsg = this.getDecimals(address);
      const { symbol } = tokenMsg;
      const { balance, raw } = data[address];
      result.data.push({ symbol, balance, raw });
    }
    return result;
  }

  public async getTransactionReceipt(params) {
    const { hash } = params;
    const data = await axios.get(`https://explorer.ont.io/v2/transactions/${hash}`);
    if (!data || !data.data) {
      return { code: 200, data: { status: -2 } };
    }
    const result = data.data;
    if (result.msg !== 'SUCCESS') {
      return { code: 200, data: { status: -1 } };
    }
    const status = result.result && result.result.confirm_flag ? 1 : 0;
    return { code: 200, data: { status } };
  }
}

export default new OntChain();
