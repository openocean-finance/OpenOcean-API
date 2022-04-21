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

class EthChain extends BaseChain {
  public tokeListUrl: EnumTokenListUrl = EnumTokenListUrl.ETH;
  public dexListUrl: EnumDexListUrl = EnumDexListUrl.ETH;
  public gasPriceUrl: EnumGasPriceUrl = EnumGasPriceUrl.ETH;
  public rpcUrl: EnumRPC = EnumRPC.ETH;
  public quoteUrl: EnumQuoteUrl = EnumQuoteUrl.ETH;
  public swapQuoteUrl: EnumSwapQuoteUrl = EnumSwapQuoteUrl.ETH;
  public gasPrice: number;
  public dexList: DexModel[];
  public provider: any;
  public chain = EnumChainCode.ETH;
  public rpc = EnumRPC.ETH;
  public tokenIds = EnumNativeToken.ETH;
  public scanStep = 500;
  public scanLimit = 1000;
  public tokenPrice = 0;
  public hashMap = {};
  public ctx: Context;
  public tokenList: Array<TokenModel> = [];
  public contractAddress = EnumContract.ETH;
  public url = EnumUrl.ETH;
}

export default new EthChain();
