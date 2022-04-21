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

class CronosChain extends BaseChain {
  public tokeListUrl: EnumTokenListUrl = EnumTokenListUrl.Cronos;
  public dexListUrl: EnumDexListUrl = EnumDexListUrl.Cronos;
  public gasPriceUrl: EnumGasPriceUrl = EnumGasPriceUrl.Cronos;
  public swapQuoteUrl: EnumSwapQuoteUrl = EnumSwapQuoteUrl.Cronos;
  public marketUrl: EnumRPC;
  public gasPrice: number;
  public dexList: DexModel[];
  public quoteUrl: EnumQuoteUrl = EnumQuoteUrl.Cronos;
  public swapUrl: EnumRPC;
  public provider: any;
  public chain = EnumChainCode.Cronos;
  public rpcUrl = EnumRPC.Cronos;
  public tokenIds = EnumNativeToken.Cronos;
  public scanStep = 500;
  public scanLimit = 1000;
  public tokenPrice = 0;
  public hashMap = {};
  public ctx: Context;
  public tokenList: Array<TokenModel> = [];
  public contractAddress = EnumContract.Cronos;
  public url = EnumUrl.Cronos;
}

export default new CronosChain();
