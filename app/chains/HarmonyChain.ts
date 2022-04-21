/**
 * @name EthChain
 * @author openocean
 * @date 2021/4/21
 * @desc
 */
import { Context } from 'egg';
import { EnumRPC, EnumContract, EnumChainCode, EnumNativeToken, EnumUrl, EnumQuoteUrl, EnumDexListUrl, EnumGasPriceUrl, EnumTokenListUrl, EnumSwapQuoteUrl } from '../config';
import { DexModel } from '../models';
import { TokenModel } from '../models/token';
import BaseChain from './BaseChain';

class HarmonyChain extends BaseChain {
  public tokeListUrl: EnumTokenListUrl = EnumTokenListUrl.Harmony;
  public dexListUrl: EnumDexListUrl = EnumDexListUrl.Harmony;
  public gasPriceUrl: EnumGasPriceUrl = EnumGasPriceUrl.Harmony;
  public swapQuoteUrl: EnumSwapQuoteUrl = EnumSwapQuoteUrl.Harmony;
  public marketUrl: EnumRPC;
  public gasPrice: number;
  public dexList: DexModel[];
  public quoteUrl: EnumQuoteUrl = EnumQuoteUrl.Harmony;
  public swapUrl: EnumRPC;
  public provider: any;
  public chain = EnumChainCode.Harmony;
  public rpcUrl = EnumRPC.Harmony;
  public tokenIds = EnumNativeToken.Harmony;
  public scanStep = 500;
  public scanLimit = 1000;
  public tokenPrice = 0;
  public hashMap = {};
  public ctx: Context;
  public tokenList: Array<TokenModel> = [];
  public contractAddress = EnumContract.Harmony;
  public url = EnumUrl.Harmony;
}

export default new HarmonyChain();
