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

class OkexChain extends BaseChain {
  public tokeListUrl: EnumTokenListUrl = EnumTokenListUrl.OKEX;
  public dexListUrl: EnumDexListUrl = EnumDexListUrl.OKEX;
  public gasPriceUrl: EnumGasPriceUrl = EnumGasPriceUrl.OKEX;
  public rpcUrl: EnumRPC = EnumRPC.OKEX;
  public quoteUrl: EnumQuoteUrl = EnumQuoteUrl.OKEX;
  public swapQuoteUrl: EnumSwapQuoteUrl = EnumSwapQuoteUrl.OKEX;
  public gasPrice: number;
  public dexList: DexModel[];
  public provider: any;
  public chain = EnumChainCode.OKEX;
  public rpc = EnumRPC.OKEX;
  public tokenIds = EnumNativeToken.OKEX;
  public scanStep = 500;
  public scanLimit = 1000;
  public tokenPrice = 0;
  public hashMap = {};
  public ctx: Context;
  public tokenList: Array<TokenModel> = [];
  public contractAddress = EnumContract.OKEX;
  public url = EnumUrl.OKEX;

}

export default new OkexChain();
