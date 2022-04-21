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

class BscChain extends BaseChain {
  public tokeListUrl: EnumTokenListUrl = EnumTokenListUrl.BSC;
  public dexListUrl: EnumDexListUrl = EnumDexListUrl.BSC;
  public gasPriceUrl: EnumGasPriceUrl = EnumGasPriceUrl.BSC;
  public swapQuoteUrl: EnumSwapQuoteUrl = EnumSwapQuoteUrl.BSC;
  public marketUrl: EnumRPC;
  public gasPrice: number;
  public dexList: DexModel[];
  public quoteUrl: EnumQuoteUrl = EnumQuoteUrl.BSC;
  public swapUrl: EnumRPC;
  public provider: any;
  public chain = EnumChainCode.BSC;
  public rpcUrl = EnumRPC.BSC;
  public tokenIds = EnumNativeToken.BSC;
  public scanStep = 500;
  public scanLimit = 1000;
  public tokenPrice = 0;
  public hashMap = {};
  public ctx: Context;
  public tokenList: Array<TokenModel> = [];
  public contractAddress = EnumContract.BSC;
  public url = EnumUrl.BSC;
}

export default new BscChain();
