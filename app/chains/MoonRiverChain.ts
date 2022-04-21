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

class MoonRiverChain extends BaseChain {
  public tokeListUrl: EnumTokenListUrl = EnumTokenListUrl.Moonriver;
  public dexListUrl: EnumDexListUrl = EnumDexListUrl.Moonriver;
  public gasPriceUrl: EnumGasPriceUrl = EnumGasPriceUrl.Moonriver;
  public rpcUrl: EnumRPC = EnumRPC.Moonriver;
  public quoteUrl: EnumQuoteUrl = EnumQuoteUrl.Moonriver;
  public swapQuoteUrl: EnumSwapQuoteUrl = EnumSwapQuoteUrl.Moonriver;
  public gasPrice: number;
  public dexList: DexModel[];
  public provider: any;
  public chain = EnumChainCode.Moonriver;
  public rpc = EnumRPC.Moonriver;
  public tokenIds = EnumNativeToken.Moonriver;
  public scanStep = 500;
  public scanLimit = 1000;
  public tokenPrice = 0;
  public hashMap = {};
  public ctx: Context;
  public tokenList: Array<TokenModel> = [];
  public contractAddress = EnumContract.Moonriver;
  public url = EnumUrl.Moonriver;


}

export default new MoonRiverChain();
