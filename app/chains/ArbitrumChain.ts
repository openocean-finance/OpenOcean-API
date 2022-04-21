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

class ArbitrumChain extends BaseChain {
  public tokeListUrl: EnumTokenListUrl = EnumTokenListUrl.Arbitrum;
  public dexListUrl: EnumDexListUrl = EnumDexListUrl.Arbitrum;
  public gasPriceUrl: EnumGasPriceUrl = EnumGasPriceUrl.Arbitrum;
  public rpcUrl: EnumRPC = EnumRPC.Arbitrum;
  public quoteUrl: EnumQuoteUrl = EnumQuoteUrl.Arbitrum;
  public swapQuoteUrl: EnumSwapQuoteUrl = EnumSwapQuoteUrl.Arbitrum;
  public gasPrice: number;
  public dexList: DexModel[];
  public provider: any;
  public chain = EnumChainCode.Arbitrum;
  public tokenIds = EnumNativeToken.Arbitrum;
  public tokenPrice = 0;
  public hashMap = {};
  public ctx: Context;
  public tokenList: Array<TokenModel> = [];
  public contractAddress = EnumContract.Arbitrum;
  public url = EnumUrl.Arbitrum;
}

export default new ArbitrumChain();
