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

class OptimismChain extends BaseChain {
  public tokeListUrl: EnumTokenListUrl = EnumTokenListUrl.Optimism;
  public dexListUrl: EnumDexListUrl = EnumDexListUrl.Optimism;
  public gasPriceUrl: EnumGasPriceUrl = EnumGasPriceUrl.Optimism;
  public rpcUrl: EnumRPC = EnumRPC.Optimism;
  public quoteUrl: EnumQuoteUrl = EnumQuoteUrl.Optimism;
  public swapQuoteUrl: EnumSwapQuoteUrl = EnumSwapQuoteUrl.Optimism;
  public gasPrice: number;
  public dexList: DexModel[];
  public provider: any;
  public chain = EnumChainCode.Optimism;
  public rpc = EnumRPC.Optimism;
  public tokenIds = EnumNativeToken.Optimism;
  public scanStep = 500;
  public scanLimit = 1000;
  public tokenPrice = 0;
  public hashMap = {};
  public ctx: Context;
  public tokenList: Array<TokenModel> = [];
  public contractAddress = EnumContract.Optimism;
  public url = EnumUrl.Optimism;

}

export default new OptimismChain();
