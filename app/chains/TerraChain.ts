/**
 * @name TerraChain
 * @author openocean
 * @date 2021/4/21
 * @desc
 */
import axios from 'axios';
import { Context } from 'egg';
import { EnumRPC, EnumContract, EnumChainCode, EnumNativeToken, EnumUrl, EnumQuoteUrl, EnumDexListUrl, EnumGasPriceUrl, EnumTokenListUrl, EnumSwapQuoteUrl } from '../config';
import { DexModel } from '../models';
import { TokenModel } from '../models/token';
import { pkgReq } from '../utils/commonReq';
import { LCDClient, MsgExecuteContract } from '@terra-money/terra.js';
import BaseChain from './BaseChain';
import { dealPromise } from '../utils/commonRes';
// import { swap_quote_terra } from '../../terra';
const lcd = new LCDClient({
  URL: 'https://lcd.terra.dev/',
  chainID: 'bombay-12',
});

class TerraChain extends BaseChain {
  public tokeListUrl: EnumTokenListUrl = EnumTokenListUrl.Terra;
  public dexListUrl: EnumDexListUrl = EnumDexListUrl.Terra;
  public gasPriceUrl: EnumGasPriceUrl = EnumGasPriceUrl.Terra;
  public rpcUrl: EnumRPC = EnumRPC.Terra;
  public quoteUrl: EnumQuoteUrl = EnumQuoteUrl.Terra;
  public swapQuoteUrl: EnumSwapQuoteUrl = EnumSwapQuoteUrl.Terra;
  public gasPrice: number;
  public dexList: DexModel[];
  public provider: any;
  public chain = EnumChainCode.Terra;
  public rpc = EnumRPC.Terra;
  public tokenIds = EnumNativeToken.Terra;
  public scanStep = 500;
  public scanLimit = 1000;
  public tokenPrice = 0;
  public hashMap = {};
  public ctx: Context;
  public tokenList: Array<TokenModel> = [];
  public contractAddress = EnumContract.Terra;
  public url = EnumUrl.Terra;

  public async swap_quote(params) {
    const reqBody = await this.buildSwap(params);
    const [ error, swapResp ] = await pkgReq(this.swapQuoteUrl, reqBody);
    if (error) return { code: 500, error: 'swap-quote error' };
    const result = await this.swap_quote_terra(params.account, swapResp, 'terra1xgwtavpnt2vp87nq0zvu0wk2zw3wulz5yfeqs2');
    delete swapResp.execute_swap_operations;
    swapResp.data = result.data;

    return { code: 200, data: swapResp };
  }

  public async getTerraFee(address, msg, gasPrices): Promise<any> {
    try {
      const terra = new LCDClient({
        chainID: 'bombay-12',
        URL: 'https://lcd.terra.dev',
        gasPrices,
        gasAdjustment: 1.75,
      });
      const accountInfo = await terra.auth.accountInfo(address);
      const fee = await terra.tx.estimateFee(
        [
          {
            sequenceNumber: accountInfo.getSequenceNumber(),
            publicKey: accountInfo.getPublicKey(),
          },
        ],
        {
          msgs: [ msg ],
        },
      );
      return {
        fee,
        accountInfo,
      };
    } catch (e) {
      return { fee: 0, accountInfo: 0 };
    }
  }

  public async getTerraMsgExecuteContract(res, contract, sender, gasPrices) {
    try {
      const { inToken, inAmount, execute_swap_operations } = res;
      const { address } = inToken;
      let msg;
      if (gasPrices[address]) {
        const coins = {};
        coins[address] = +inAmount;
        msg = new MsgExecuteContract(
          sender,
          contract,
          {
            execute_swap_operations,
          },
          coins,
        );
      } else {
        msg = new MsgExecuteContract(
          sender,
          address,
          {
            send: {
              contract,
              amount: inAmount,
              msg: Buffer.from(JSON.stringify(execute_swap_operations)).toString('base64'),
            },
          },
          [],
        );
      }
      return msg;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  public async swap_quote_terra(address, res, contract) {
    try {
      const gasPrices = await axios.get('https://fcd.terra.dev/v1/txs/gas_prices');
      const msg = await this.getTerraMsgExecuteContract(res, contract, address, gasPrices.data);
      const { fee, accountInfo } = await this.getTerraFee(address, msg, gasPrices.data);
      return { code: 200, data: {
        msgs: [ msg ],
        gasAdjustment: 1.5,
        waitForConfirmation: true,
        fee,
        account_number: accountInfo.account_number,
        sequence: accountInfo.sequence,
        purgeQueue: true },
      };
    } catch (error) {
      console.log(error);
      return { code: 500, error };
    }
  }
  public async getTransactionReceipt(params): Promise<any> {
    const { hash } = params;
    let bool = false;
    // get hash from terra chain
    const result = await axios.get('https://fcd.terra.dev/v1/txs?offset=0&limit=100&account=terra1xgwtavpnt2vp87nq0zvu0wk2zw3wulz5yfeqs2');

    if (!result || !result.data) return { code: 500 };
    const txs = result.data.txs;
    for (const tx of txs) {
      const { logs, txhash } = tx;
      if (logs.length > 0 && txhash && txhash === hash) {
        bool = true;
        break;
      }
    }
    if (!bool) {
      return { code: 500, error: 'not our contract' };
    }

    const [ error, data ] = await dealPromise(lcd.tx.txInfo(hash));
    if (error || !data) return { code: 500, error };
    const { logs, height, tx } = data;
    if (!logs || logs.length === 0 || !tx) return { code: 500, error: 'swap fail' };
    const MsgExecuteContract = tx.body.messages[0].toJSON();
    const { sender } = JSON.parse(MsgExecuteContract);
    if (!sender) return { code: 500 };
    return {
      code: 200,
      data: {
        to: 'terra1xgwtavpnt2vp87nq0zvu0wk2zw3wulz5yfeqs2',
        from: sender,
        contractAddress: 'terra1xgwtavpnt2vp87nq0zvu0wk2zw3wulz5yfeqs2',
        transactionHash: hash,
        blockNumber: height,
        status: 1,
      },
    };
  }
}

export default new TerraChain();
