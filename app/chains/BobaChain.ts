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
class BobaChain extends BaseChain {
  public tokeListUrl: EnumTokenListUrl = EnumTokenListUrl.Boba;
  public dexListUrl: EnumDexListUrl = EnumDexListUrl.Boba;
  public gasPriceUrl: EnumGasPriceUrl = EnumGasPriceUrl.Boba;
  public rpcUrl: EnumRPC = EnumRPC.Boba;
  public quoteUrl: EnumQuoteUrl = EnumQuoteUrl.Boba;
  public swapQuoteUrl: EnumSwapQuoteUrl = EnumSwapQuoteUrl.Boba;
  public gasPrice: number;
  public dexList: DexModel[];
  public provider: any;
  public chain = EnumChainCode.Boba;
  public rpc = EnumRPC.Boba;
  public tokenIds = EnumNativeToken.Boba;
  public scanStep = 500;
  public scanLimit = 1000;
  public tokenPrice = 0;
  public hashMap = {};
  public ctx: Context;
  public tokenList: Array<TokenModel> = [];
  public contractAddress = EnumContract.Boba;
  public url = EnumUrl.Boba;
}

export default new BobaChain();
