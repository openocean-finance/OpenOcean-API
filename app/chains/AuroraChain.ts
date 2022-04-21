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

class AuroraChain extends BaseChain {
  public tokeListUrl: EnumTokenListUrl = EnumTokenListUrl.Aurora;
  public dexListUrl: EnumDexListUrl = EnumDexListUrl.Aurora;
  public gasPriceUrl: EnumGasPriceUrl = EnumGasPriceUrl.Aurora;
  public swapQuoteUrl: EnumSwapQuoteUrl = EnumSwapQuoteUrl.Aurora;
  public marketUrl: EnumRPC;
  public gasPrice: number;
  public dexList: DexModel[];
  public quoteUrl: EnumQuoteUrl = EnumQuoteUrl.Aurora;
  public swapUrl: EnumRPC;
  public provider: any;
  public chain = EnumChainCode.Aurora;
  public rpcUrl = EnumRPC.Aurora;
  public tokenIds = EnumNativeToken.Aurora;
  public scanStep = 500;
  public scanLimit = 1000;
  public tokenPrice = 0;
  public hashMap = {};
  public ctx: Context;
  public tokenList: Array<TokenModel> = [];
  public contractAddress = EnumContract.Aurora;
  public url = EnumUrl.Aurora;
}

export default new AuroraChain();
