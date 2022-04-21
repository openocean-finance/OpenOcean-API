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

class FantomChain extends BaseChain {
  public tokeListUrl: EnumTokenListUrl = EnumTokenListUrl.Fantom;
  public dexListUrl: EnumDexListUrl = EnumDexListUrl.Fantom;
  public gasPriceUrl: EnumGasPriceUrl = EnumGasPriceUrl.Fantom;
  public rpcUrl: EnumRPC = EnumRPC.Fantom;
  public quoteUrl: EnumQuoteUrl = EnumQuoteUrl.Fantom;
  public swapQuoteUrl: EnumSwapQuoteUrl = EnumSwapQuoteUrl.Fantom;
  public gasPrice: number;
  public dexList: DexModel[];
  public provider: any;
  public chain = EnumChainCode.Fantom;
  public rpc = EnumRPC.Fantom;
  public tokenIds = EnumNativeToken.Fantom;
  public scanStep = 500;
  public scanLimit = 1000;
  public tokenPrice = 0;
  public hashMap = {};
  public ctx: Context;
  public tokenList: Array<TokenModel> = [];
  public contractAddress = EnumContract.Fantom;
  public url = EnumUrl.Fantom;

}

export default new FantomChain();
