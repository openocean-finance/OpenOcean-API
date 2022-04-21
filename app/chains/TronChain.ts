/**
* @name TronChain
* @author openocean
* @date 2021/4/21
* @desc
*/
import { Context } from 'egg';
import { EnumRPC, EnumContract, EnumChainCode, EnumNativeToken, EnumUrl, EnumQuoteUrl, EnumDexListUrl, EnumGasPriceUrl, EnumTokenListUrl, EnumSwapQuoteUrl } from '../config';
import { DexModel } from '../models';
import { TokenModel } from '../models/token';
import BaseChain from './BaseChain';

class TronChain extends BaseChain {
  public tokeListUrl: EnumTokenListUrl = EnumTokenListUrl.TRON;
  public dexListUrl: EnumDexListUrl = EnumDexListUrl.TRON;
  public gasPriceUrl: EnumGasPriceUrl = EnumGasPriceUrl.TRON;
  public rpcUrl: EnumRPC = EnumRPC.TRON;
  public quoteUrl: EnumQuoteUrl = EnumQuoteUrl.TRON;
  public swapQuoteUrl: EnumSwapQuoteUrl = EnumSwapQuoteUrl.TRON;
  public marketUrl: EnumRPC;
  public gasPrice: number;
  public dexList: DexModel[];
  public provider: any;
  public chain = EnumChainCode.TRON;
  public rpc = EnumRPC.TRON;
  public tokenIds = EnumNativeToken.TRON;
  public scanStep = 500;
  public scanLimit = 1000;
  public tokenPrice = 0;
  public hashMap = {};
  public ctx: Context;
  public tokenList: Array<TokenModel> = [];
  public contractAddress = EnumContract.TRON;
  public url = EnumUrl.TRON;

}

export default new TronChain();
