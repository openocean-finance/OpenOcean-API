/**
 * @name BaseChain
 * @author openocean
 * @date 2021/4/20
 * @desc
 */
import { Context } from 'egg';
import { Contract, ethers } from 'ethers';
import { EnumRPC, EnumContract, EnumChainCode, EnumUrl, EnumQuoteUrl, EnumSwapQuoteUrl, EnumDexListUrl, EnumTokenListUrl, EnumGasPriceUrl } from '../config';
import { TokenModel, QuoteModel, BEP20Model, SwapModel, DexModel } from '../models';
// import { quoteRes } from '../utils/1inch/res';
import { pkgReq } from '../utils/commonReq';
import { amount2Decimals, decimals2Amount } from '../utils/utils';
import erc20Abi from '../utils/abi/erc20Abi.json';
import Web3 from 'web3';
import { MultiCallService, Web3ProviderConnector } from '@1inch/multicall';
import { getMulticallAddress, isNativeToken } from '../utils/chain';
import { dealPromise } from '../utils/commonRes';
import BigNumber from 'bignumber.js';
import openAbi from '../utils/abi/openAbi.json';
import axios from 'axios';
const address_plat = {
  '0x3487ef9f9b36547e43268b8f0e2349a226c70b53': 'PC',
  '0x40603469c577b1db3d401155901a276f604436f4': 'H5',
  '0x9fac0e61e7d2a2a7c5e01c7acb4c805d58cd41c1': 'OPENAPI',
  '0xf01fa7de4fd0c9d044bbae496b162ab933df3e5e': 'PME',
  '0x0000000000000000000000000000000000000000': 'UnKnow',
  '0x934b510d4c9103e6a87aef13b816fb080286d649': 'Mask', // mask self
  '0x8960A6cD268E44F14AC150A60700928Acfe49260': 'Rango',
  '0x8237EbDF7f96Afd86eD9Fd02e07E559fA600b8bf': 'Cross',
  '0xB5B569B36534F6852af43C2a4F03b5Bd9aFc0146': 'ONT',
};
// import { dealPromise } from '../utils/commonRes';
// const reg = /\/tx\/0x[0-9a-zA-Z]{64}|>[0-9-:]{10}\s[0-9-:]{7,9}|block\/[0-9]{7,8}|fa-exclamation-circle|\/address\/0x[0-9a-zA-Z]{40}/g;

abstract class BaseChain {
  public abstract readonly chain: EnumChainCode;
  public abstract readonly contractAddress: EnumContract;
  public abstract readonly tokenIds: string;
  public abstract readonly url: EnumUrl;
  public abstract readonly rpcUrl: EnumRPC;
  public abstract readonly quoteUrl: EnumQuoteUrl;
  public abstract readonly swapQuoteUrl: EnumSwapQuoteUrl;
  public abstract readonly tokeListUrl: EnumTokenListUrl;
  public abstract readonly dexListUrl: EnumDexListUrl;
  public abstract readonly gasPriceUrl: EnumGasPriceUrl;

  public abstract ctx: Context;
  public abstract tokenList: Array<TokenModel>;
  public abstract dexList: Array<DexModel>;
  public abstract tokenPrice: number;
  public abstract gasPrice: number;
  public abstract provider;

  public async buildQuote(params: any): Promise<QuoteModel> {
    const srcInfo = await this.getTokenInfo(this.tokenList, params.inTokenAddress);
    const reqBody: QuoteModel = {
      inTokenAddress: params.inTokenAddress,
      outTokenAddress: params.outTokenAddress,
      amount: amount2Decimals(params.amount, srcInfo.decimals || 18),
      gasPrice: amount2Decimals(params.gasPrice, 9),
    };
    // with decimals
    params.inTokenDecimals = params.inTokenDecimals || 18;
    params.outTokenDecimals = params.outTokenDecimals || 18;
    return reqBody;
  }
  public async buildSwap(params): Promise<SwapModel> {
    const quoteReq = await this.buildQuote(params);
    const swapReq: SwapModel = Object.assign(quoteReq, {
      sender: params.sender,
      account: params.account,
      referrer: params.referrer,
      slippage: params.slippage * 100,
    });
    return swapReq;
  }
  public async quote(params: any) {
    const req = await this.buildQuote(params);
    const startTime = new Date().getTime();
    const [ error, data ] = await pkgReq(this.quoteUrl, req);
    if (error) return { code: 500, error: 'quote error, please check your params' };
    const endTime = new Date().getTime();
    data.useTime = endTime - startTime;
    return { code: 200, data };
    // return quoteRes(params, data);
  }
  public async swap_quote(params: any) {
    const reqBody = await this.buildSwap(params);
    const [ error, data ] = await pkgReq(this.swapQuoteUrl, reqBody);
    if (error) return { code: 500, error };
    return { code: 200, data };
  }
  public async swap(ctx: Context, params: any) {
    this.ctx = ctx;
    const reqBody = await this.buildSwap(params);
    return await pkgReq(this.swapQuoteUrl, reqBody, {});
  }
  //   const [ error, swapResp ] = await pkgReq(this.swapQuoteUrl, reqBody);
  //   console.log(error, swapResp);
  //   if (error) return { code: 500, error: 'swap fail' };
  //   const result = await this.checkBalance(params);
  //   if (result.code !== 200) return result;

  //   const estimateGasParams: any = {
  //     from: swapResp.from,
  //     to: swapResp.to,
  //     data: swapResp.data,
  //   };
  //   if (isNativeToken(params.inTokenAddress.toLowerCase())) {
  //     estimateGasParams.value = ethers.BigNumber.from(swapResp.value);
  //   }
  //   const [ estGasError, gasLimit ] = await dealPromise(this.provider.estimateGas(estimateGasParams));
  //   if (estGasError) {
  //     if (estGasError.indexOf('Return amount is not enough') > -1) {
  //       return { code: 209, error: 'Return amount is not enough' };
  //     }
  //     return { code: 500, error: estGasError };
  //   }
  //   swapResp.estimatedGas = Math.floor(gasLimit * 1.5);
  //   return { code: 200, data: swapResp };
  // }

  // public async swap(ctx: Context) {
  //   this.ctx = ctx;

  // }

  // public async transfer(ctx: Context) {
  //   this.ctx = ctx;

  // }

  // // params
  public async getTransaction(params:any) {
    const { hash } = params;
    const [ error, result ] = await pkgReq('https://pre-market-api.openocean.finance/v1/data/getTransactionFromDB', { hash, chain: this.chain }, {});
    if (error || result.code !== 200) return { code: 500, error };
    return { code: 200, data: result.data };
  }

  public async getTxs(params:any) {
    const { pageSize, account, inTokenSymbol, outTokenSymbol } = params;
    const [ error, result ] = await pkgReq('https://pre-market-api.openocean.finance/v1/data/getTxs', { pageSize, chain: this.chain, account, inTokenSymbol, outTokenSymbol }, {});
    if (error || result.code !== 200) return { code: 500, error };
    return { code: 200, data: result.data };
  }
  public async decodeInputData(params: any) {
    const [ err, hashData ] = await dealPromise(this.provider.getTransaction(params.hash));
    if (err || !hashData) return { code: 500, error: err };
    const { hash, from, to, gasLimit, gasPrice, nonce, chainId, data } = hashData;
    let resp;
    const iface = new ethers.utils.Interface(openAbi.abi);
    try {
      resp = iface.decodeFunctionData('swap', hashData.data);
    } catch (error) {
      return { code: 500, error: 'decodeFunctionData error: ' + JSON.stringify(error) };
    }
    const { srcToken, dstToken, amount, minReturnAmount, guaranteedAmount, referrer } = resp[1];
    let srcTokenMsg: any = {
      symbol: '',
      decimals: 0,
    };
    let dstTokenMsg: any = {
      symbol: '',
      decimals: 0,
    };
    let amountValue = 0;
    let minReturnAmountValue = 0;
    let guaranteedAmountValue = 0;
    try {
      srcTokenMsg = this.getDecimals(srcToken);
      dstTokenMsg = this.getDecimals(dstToken);
      if (srcTokenMsg.decimals) {
        amountValue = Number(decimals2Amount(Number(amount), srcTokenMsg.decimals));
      }
      if (dstTokenMsg.decimals) {
        minReturnAmountValue = Number(decimals2Amount(Number(minReturnAmount), dstTokenMsg.decimals));
        guaranteedAmountValue = Number(decimals2Amount(Number(guaranteedAmount), dstTokenMsg.decimals));
      }
    } catch (e) {
      console.log('decode error', e);
    }
    return {
      code: 200,
      data: {
        chainId,
        nonce,
        hash,
        from,
        to,
        inTokenAddress: srcToken,
        inTokenSymbol: srcTokenMsg.symbol,
        inTokenDecimals: srcTokenMsg.decimals,
        outTokenAddress: dstToken,
        outTokenSymbol: dstTokenMsg.symbol,
        outTokenDecimals: dstTokenMsg.decimals,
        amount: Web3.utils.hexToNumberString(amount),
        amountValue,
        minReturnAmount: Web3.utils.hexToNumberString(minReturnAmount),
        minReturnAmountValue,
        guaranteedAmount: Web3.utils.hexToNumberString(guaranteedAmount),
        guaranteedAmountValue,
        gasLimit: Web3.utils.hexToNumberString(gasLimit),
        gasPrice: Web3.utils.hexToNumberString(gasPrice),
        slippage: (1 - Number(minReturnAmount) / Number(guaranteedAmount)).toFixed(4),
        referrer: referrer && address_plat[referrer.toLowerCase()] ? address_plat[referrer.toLowerCase()] : 'UnKnow',
        data,
      },
    };
  }

  public async getTransactionReceipt(params) {
    const [ error, res ] = await dealPromise(this.provider.getTransactionReceipt(params.hash));
    if (error) return { code: 500, error };
    if (!res) {
      let url = `https://bscscan.com/tx/${params.hash}`;
      if (+params.chainId === 137) {
        url = `https://polygonscan.com/tx/${params.hash}`;
      }
      const [ error, data ] = await pkgReq(url, '');
      if (error || data.indexOf('Sorry, We are unable to locate this TxnHash') > -1 || data.indexOf('Oops! An invalid Txn hash has been entered:') > -1) return { code: 200, data: { status: -2 } };
      return { code: 200, data: { status: -1 } };
    }
    const { to, from, contractAddress, transactionIndex, transactionHash, blockNumber, confirmations, status } = res || { status: '' };
    return {
      code: 200,
      data: {
        to,
        from,
        contractAddress,
        transactionIndex,
        transactionHash,
        blockNumber,
        confirmations,
        status,
      },
    };
  }
  public getProvider() {
    this.provider = new ethers.providers.JsonRpcProvider(this.rpcUrl);
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
    const provider = new ethers.providers.JsonRpcProvider(this.rpcUrl);
    const bep20 = new ethers.Contract(tokenAddress, erc20Abi.abi, provider) as BEP20Model;
    try {
      const symbol = await bep20.symbol();
      const name = await bep20.name();
      const decimals = await bep20.decimals();
      return {
        symbol,
        name,
        decimals,
        code: '',
        address: tokenAddress,
      };
    } catch (err) {
      return {
        symbol: '',
        name: '',
        decimals: 18,
        code: '',
        address: '',
      };
    }
  }

  public getTokenList() {
    return { code: 200, data: this.tokenList };
  }
  public getDexList() {
    return { code: 200, data: this.dexList };
  }
  public getGasPrice() {
    return { code: 200, data: this.gasPrice };
  }
  public async getBalance(params: any) {
    if (getMulticallAddress(params.chainId)) {
      return await this.getmultiCallBalance(params.inTokenAddress, params.account, params.chainId);
    }

    const { account, inTokenAddress } = params;
    const result: any = {
      code: 200,
      data: [],
    };
    const tokenAddressArr = inTokenAddress.split(',');
    const bool = ethers.utils.isAddress(account);
    if (!bool) {
      return { code: 204, error: `invalid params, please check your special config address: ${account}` };
    }
    const provider = new ethers.providers.JsonRpcProvider(this.rpcUrl);
    for (let tokenAddress of tokenAddressArr) {
      tokenAddress = tokenAddress.trim();
      const tokenMsg = this.getDecimals(tokenAddress);
      const decimals = tokenMsg.decimals;
      const symbol = tokenMsg.symbol;
      let raw;
      if (isNativeToken(tokenAddress)) {
        const [ error, data ] = await dealPromise(provider.getBalance(account));
        if (error) return { code: 500, error };
        raw = data;
      } else {
        const contract = new ethers.Contract(tokenAddress, erc20Abi.abi, provider);
        const [ error, data ] = await dealPromise(contract.balanceOf(account));
        console.log(data);
        if (error) return { code: 500, error };
        raw = data;
      }
      raw = raw.toString();
      const balance = decimals2Amount(raw, decimals || 18);
      const data = {
        symbol,
        balance,
        raw,
      };
      result.data.push(data);
    }
    if (result.data.length === 0) {
      result.code = 500;
      result.error = 'try again later';
    }
    return result;
  }
  public getDecimals(address: string): any {
    for (const token of this.tokenList) {
      if (token.address.toLowerCase() === address.toLocaleLowerCase()) {
        console.log('true');
        return token;
      }
    }
    return {};
  }
  public async createWallet() {
    const randomBytes = ethers.utils.randomBytes(32);
    // hexadecimal
    const privateKey = ethers.BigNumber.from(randomBytes)._hex;
    const provider = new ethers.providers.JsonRpcProvider(this.rpcUrl);
    const wallet = new ethers.Wallet(privateKey, provider);
    if (wallet && wallet.address) {
      return { code: 200, data: { address: wallet.address, privateKey } };
    }
    return { code: 500, error: 'try again later' };
  }
  public async allowance(params) {
    const { account, inTokenAddress } = params;
    const addresses = inTokenAddress.split(',');
    const result: any = {
      code: 200,
      data: [],
    };
    // console.log(in_token_decimals, rcpUrl);
    for (const address of addresses) {
      console.log(address);
      let bal = Number('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff');
      if (!isNativeToken(address)) {
        const contract = new Contract(address, erc20Abi.abi, this.provider);
        bal = await contract.allowance(account, this.contractAddress);
      }
      const tokenMsg = this.getDecimals(address);
      const { symbol, decimals } = tokenMsg;
      result.data.push({ symbol: symbol || address, allowance: decimals2Amount(Number(bal), decimals || 18), raw: new BigNumber(Number(bal)).shiftedBy(0).toFixed() });
    }
    return result;
  }
  public async approve(params: any) {
    const in_token_decimals = this.getDecimals(params.inTokenAddress).decimals;
    params.amount = amount2Decimals(params.amount, in_token_decimals || 18);
    const wallet = new ethers.Wallet(params.privateKey, this.provider);
    if (isNativeToken(params.inTokenAddress)) {
      return { code: 200, data: { message: 'no need approve' } };
    }
    const contract = await new Contract(params.inTokenAddress, erc20Abi.abi, wallet);
    const bal = await contract.allowance(params.walletAddress, this.contractAddress);
    if (Number(bal) > Number(params.amount)) {
      console.log('have approve');
      return null;
    }
    try {
      await contract.approve(this.contractAddress, new BigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff').toFixed(0, 1));
    } catch (error) {
      return { code: 206, error: 'approve error, please try later again' };
    }
    return { code: 200 };
  }
  public async getmultiCallBalance(inTokenAddress: string, walletAddress: string, chainId) {

    const result: any = {
      code: 200,
      data: [],
    };
    const web3: any = new Web3(new Web3.providers.HttpProvider(this.rpcUrl, { timeout: 30000 }));

    const provider = new Web3ProviderConnector(web3);
    const tokens = inTokenAddress.split(',');
    const tokenJ = {};
    const callDatas = tokens.map(tokenAddress => {
      const tokenMsg = this.getDecimals(tokenAddress);
      const decimals = tokenMsg.decimals;
      const symbol = tokenMsg.symbol;
      tokenJ[tokenAddress] = {
        decimals, symbol,
      };
      return {
        to: tokenAddress,
        data: provider.contractEncodeABI(
          erc20Abi.abi,
          tokenAddress,
          'balanceOf',
          [ walletAddress ],
        ),
      };
    });
    const multiCallService = new MultiCallService(provider, getMulticallAddress(chainId));
    const balances = await multiCallService.callByChunks(callDatas);
    for (let i = 0; i < tokens.length; i++) {
      const { symbol, decimals } = tokenJ[tokens[i]];
      let raw;
      if (isNativeToken(tokens[i])) {
        raw = await web3.eth.getBalance(walletAddress);
      } else {
        raw = balances[i].toString();
      }
      const balance = decimals2Amount(raw, decimals || 18);
      const data = {
        symbol,
        balance,
        raw,
      };
      result.data.push(data);
    }
    if (result.data.length === 0) {
      result.code = 500;
      result.error = 'try again larter';
    }
    return result;
  }
  public async getBlockNumber() {
    const lastBlockNumber = await this.provider.getBlockNumber();
    const [ err, result ] = await dealPromise(axios('https://pre-market-api.openocean.finance/v1/data/getLastMonitorRecord'));
    let startBlockNumber;
    if (!err && result) {
      startBlockNumber = result.data.data.result[this.chain] ?? lastBlockNumber - 10 * 60 * 24;
    }
    return { code: 200, data: { lastBlockNumber, startBlockNumber } };
  }

  public async getHashFromChain(params: any) {
    let { lastBlock, fromBlock } = params;
    fromBlock = +fromBlock;
    lastBlock = +lastBlock ?? await this.provider.getBlockNumber();
    console.log(fromBlock, lastBlock);
    const step = 2000;
    let total_transMsg: any = [];
    while (fromBlock <= lastBlock) {
      const toBlock = fromBlock + step;
      const result: string[] = [];
      try {
        const datas = await this.provider.getLogs({
          address: '0x6352a56caadC4F1E25CD6c75970Fa768A3304e64',
          fromBlock,
          toBlock: toBlock < lastBlock ? toBlock : lastBlock,
        });
        for (const data of datas) {
          const { transactionHash } = data;
          result.push(transactionHash);
        }
      } catch (error) {
        console.log('getLogs', error);
      }

      console.log(fromBlock, toBlock, result.length);
      total_transMsg = total_transMsg.concat(result);
      fromBlock += step;
    }
    const hash = total_transMsg.reverse();
    return { code: 200, data: { hash } };
  }
  public async init(ctx) {
    this.ctx = ctx;
    const [ _error, tokenList ] = await pkgReq(this.tokeListUrl, {});
    const [ _error1, dexList ] = await pkgReq(this.dexListUrl, {});
    const [ _error2, gasPrice ] = await pkgReq(this.gasPriceUrl, {});
    const provider = await this.getProvider();
    this.tokenList = tokenList.data;
    this.dexList = dexList;
    this.gasPrice = gasPrice;
    this.provider = provider;
    this.ctx.app.messenger.sendToApp('data', { chain: this.chain, tokenList: tokenList.data, gasPrice, dexList, provider });
  }
  // update others worker
  public async syncData(params) {
    const { tokenList, gasPrice, dexList, provider } = params;
    this.tokenList = tokenList;
    this.dexList = dexList;
    this.gasPrice = gasPrice;
    this.provider = provider;
  }
}

export default BaseChain;