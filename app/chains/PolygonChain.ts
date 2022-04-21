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

class PolygonChain extends BaseChain {
  public tokeListUrl: EnumTokenListUrl = EnumTokenListUrl.Polygon;
  public dexListUrl: EnumDexListUrl = EnumDexListUrl.Polygon;
  public gasPriceUrl: EnumGasPriceUrl = EnumGasPriceUrl.Polygon;
  public rpcUrl: EnumRPC = EnumRPC.Polygon;
  public quoteUrl: EnumQuoteUrl = EnumQuoteUrl.Polygon;
  public swapQuoteUrl: EnumSwapQuoteUrl = EnumSwapQuoteUrl.Polygon;
  public gasPrice: number;
  public dexList: DexModel[];
  public provider: any;
  public chain = EnumChainCode.Polygon;
  public rpc = EnumRPC.Polygon;
  public tokenIds = EnumNativeToken.Polygon;
  public scanStep = 500;
  public scanLimit = 5000;
  public tokenPrice = 0;
  public hashMap = {};
  public ctx: Context;
  public tokenList: Array<TokenModel> = [];
  public contractAddress = EnumContract.Polygon;
  public url = EnumUrl.Polygon;

}

export default new PolygonChain();
