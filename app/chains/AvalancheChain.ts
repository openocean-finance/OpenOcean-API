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

class AvalancheChain extends BaseChain {
  public tokeListUrl: EnumTokenListUrl = EnumTokenListUrl.Avalanche;
  public dexListUrl: EnumDexListUrl = EnumDexListUrl.Avalanche;
  public gasPriceUrl: EnumGasPriceUrl = EnumGasPriceUrl.Avalanche;
  public rpcUrl: EnumRPC = EnumRPC.Avalanche;
  public quoteUrl: EnumQuoteUrl = EnumQuoteUrl.Avalanche;
  public swapQuoteUrl: EnumSwapQuoteUrl = EnumSwapQuoteUrl.Avalanche;
  public gasPrice: number;
  public dexList: DexModel[];
  public provider: any;
  public chain = EnumChainCode.Avalanche;
  public rpc = EnumRPC.Avalanche;
  public tokenIds = EnumNativeToken.Avalanche;
  public scanStep = 500;
  public scanLimit = 1000;
  public tokenPrice = 0;
  public hashMap = {};
  public ctx: Context;
  public tokenList: Array<TokenModel> = [];
  public contractAddress = EnumContract.Avalanche;
  public url = EnumUrl.Avalanche;

}

export default new AvalancheChain();
