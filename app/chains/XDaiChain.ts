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
class XDaiChain extends BaseChain {
  public tokeListUrl: EnumTokenListUrl = EnumTokenListUrl.XDai;
  public dexListUrl: EnumDexListUrl = EnumDexListUrl.XDai;
  public gasPriceUrl: EnumGasPriceUrl = EnumGasPriceUrl.XDai;
  public rpcUrl: EnumRPC = EnumRPC.XDai;
  public quoteUrl: EnumQuoteUrl = EnumQuoteUrl.XDai;
  public swapQuoteUrl: EnumSwapQuoteUrl = EnumSwapQuoteUrl.XDai;
  public gasPrice: number;
  public dexList: DexModel[];
  public provider: any;
  public chain = EnumChainCode.XDai;
  public rpc = EnumRPC.XDai;
  public tokenIds = EnumNativeToken.XDai;
  public scanStep = 500;
  public scanLimit = 1000;
  public tokenPrice = 0;
  public hashMap = {};
  public ctx: Context;
  public tokenList: Array<TokenModel> = [];
  public contractAddress = EnumContract.XDai;
  public url = EnumUrl.XDai;
}

export default new XDaiChain();
