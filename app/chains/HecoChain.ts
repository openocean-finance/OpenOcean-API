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

class HecoChain extends BaseChain {
  public tokeListUrl: EnumTokenListUrl = EnumTokenListUrl.HECO;
  public dexListUrl: EnumDexListUrl = EnumDexListUrl.HECO;
  public gasPriceUrl: EnumGasPriceUrl = EnumGasPriceUrl.HECO;
  public rpcUrl: EnumRPC = EnumRPC.HECO;
  public quoteUrl: EnumQuoteUrl = EnumQuoteUrl.HECO;
  public swapQuoteUrl: EnumSwapQuoteUrl = EnumSwapQuoteUrl.HECO;
  public gasPrice: number;
  public dexList: DexModel[];
  public provider: any;
  public chain = EnumChainCode.HECO;
  public rpc = EnumRPC.HECO;
  public tokenIds = EnumNativeToken.HECO;
  public scanStep = 500;
  public scanLimit = 1000;
  public tokenPrice = 0;
  public hashMap = {};
  public ctx: Context;
  public tokenList: Array<TokenModel> = [];
  public contractAddress = EnumContract.HECO;
  public url = EnumUrl.HECO;

}

export default new HecoChain();
