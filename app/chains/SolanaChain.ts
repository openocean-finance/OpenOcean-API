/**
* @name SolanaChain
* @author openocean
* @date 2021/4/21
* @desc
*/
import { Context } from 'egg';
import { EnumRPC, EnumContract, EnumChainCode, EnumNativeToken, EnumUrl, EnumQuoteUrl, EnumDexListUrl, EnumGasPriceUrl, EnumTokenListUrl, EnumSwapQuoteUrl } from '../config';
import { TokenModel } from '../models/token';
import BaseChain from './BaseChain';
import { DexModel, QuoteModel, SwapModel } from '../models';
import { pkgReq } from '../utils/commonReq';
import { amount2Decimals } from '../utils/utils';

const strategies = [
  'https://cdn.jsdelivr.net/gh/solana-labs/token-list@main/src/tokens/solana.tokenlist.json',
  'https://raw.githubusercontent.com/solana-labs/token-list/main/src/tokens/solana.tokenlist.json',
  'https://token-list.solana.com/solana.tokenlist.json',
];

class SolanaChain extends BaseChain {
  public tokeListUrl: EnumTokenListUrl = EnumTokenListUrl.Solana;
  public dexListUrl: EnumDexListUrl = EnumDexListUrl.Solana;
  public gasPriceUrl: EnumGasPriceUrl = EnumGasPriceUrl.Solana;
  public rpcUrl: EnumRPC = EnumRPC.Solana;
  public quoteUrl = EnumQuoteUrl.Solana;
  public swapQuoteUrl = EnumSwapQuoteUrl.Solana;
  public gasPrice = 0.000005;
  public dexList: DexModel[];
  public provider: any;
  public chain = EnumChainCode.Solana;
  public rpc = EnumRPC.Solana;
  public tokenIds = EnumNativeToken.Solana;
  public scanStep = 500;
  public scanLimit = 1000;
  public tokenPrice = 0;
  public hashMap = {};
  public ctx: Context;
  public tokenList: Array<TokenModel> = [];
  public contractAddress = EnumContract.Solana;
  public url = EnumUrl.Solana;

  public async buildQuote(params: any): Promise<QuoteModel> {
    const srcInfo = await this.getTokenInfo(this.tokenList, params.inTokenAddress);
    const reqBody: QuoteModel = {
      inTokenAddress: params.inTokenAddress,
      outTokenAddress: params.outTokenAddress,
      amount: amount2Decimals(params.amount, srcInfo.decimals || 18),
      gasPrice: this.gasPrice,
    };
    return reqBody;
  }

  public async buildSwap(params): Promise<SwapModel> {
    const quoteRep = await this.buildQuote(params);
    const swapResp: SwapModel = Object.assign(quoteRep, {
      account: params.account,
      slippage: params.slippage > 30 ? 3000 : params.slippage * 100,
    });
    return swapResp;
  }

  public async swap_quote(params: any) {
    const reqBody = await this.buildSwap(params);
    const [ error, swapResp ] = await pkgReq(this.swapQuoteUrl, reqBody);
    console.log(error, swapResp);
    if (error) return { code: 500, error: 'swap fail' };
    swapResp.estimatedGas = 0.000005;
    return { code: 200, data: swapResp };
  }

  public async swap(params: any) {
    const reqBody = await this.buildSwap(params);
    const [ error, swapResp ] = await pkgReq(this.swapQuoteUrl, reqBody);
    console.log(error, swapResp);
    if (error) return { code: 500, error: 'swap fail' };
    return { code: 200, data: swapResp };
  }

  public async getTokenInfo(tokenList: Array<TokenModel>, tokenAddress: string) {
    // eslint-disable-next-line array-callback-return
    const token = tokenList.filter(item => {
      if (item.address && tokenAddress) {
        return item.address.toLocaleLowerCase() === tokenAddress.toLocaleLowerCase();
      }
    });
    if (token && token.length) {
      return token[0];
    }

    const [ error, tokens ] = await pkgReq(strategies[0], {});
    if (!error && tokens && tokens.tokens.length > 0) {
      const token = tokens.tokens.find(x => x.address.toLocaleLowerCase() === tokenAddress.toLocaleLowerCase());
      if (token) {
        return {
          symbol: token.symbol,
          name: token.name,
          decimals: token.decimals,
          code: '',
          address: tokenAddress,
        };
      }
    }
    return {
      symbol: '',
      name: '',
      decimals: 18,
      code: '',
      address: '',
    };
  }

  public async init(ctx) {
    this.ctx = ctx;
    const [ error, tokenList ] = await pkgReq(this.tokeListUrl, {});
    const [ error1, dexList ] = await pkgReq(this.dexListUrl, {});
    console.log(error, error1);
    this.ctx.app.messenger.sendToApp('data', { chain: this.chain, tokenList: tokenList.data, dexList });
  }
  // update others worker
  public async syncData(params) {
    const { tokenList, dexList } = params;
    this.tokenList = tokenList;
    this.dexList = dexList;
  }

}

export default new SolanaChain();
