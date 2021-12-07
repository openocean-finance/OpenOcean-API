import { Controller } from 'egg';
import { logger } from '../utils/utils';
export default class MiddleWareController extends Controller {
  /**
   * for test
   */
  public async test() {
    const { ctx } = this;
    logger.error('test');
    ctx.body = await ctx.service.middleWare.test();
  }


  /**
   * quote
   */
  public async quote() {
    const { ctx } = this;
    logger.warn('receive a request', ctx.request.query);
    ctx.body = await ctx.service.middleWare.quote(ctx.request.query);
  }

  /**
   * swap
   */
  public async swap() {
    const { ctx } = this;
    logger.error('dddd');
    ctx.body = await ctx.service.middleWare.swap(ctx.request.query);
  }

  /**
   * token list
   */
  public async tokenList() {
    const { ctx } = this;
    logger.error('dddd');
    ctx.body = await ctx.service.middleWare.tokenList(ctx.request.query);
  }

  /**
   * token list
   */
  public async getGasPrice() {
    const { ctx } = this;
    const { chainId } = ctx.params || {};
    ctx.body = await ctx.service.middleWare.getGasPrice(chainId);
  }

  /**
   * create wallet
   */
  public async createWallet() {
    const { ctx } = this;
    logger.error('dddd');
    ctx.body = await ctx.service.middleWare.createWallet(ctx.request.query);
  }

  /**
   * get token balance
   */
  public async getBalance() {
    const { ctx } = this;
    logger.error('dddd');
    ctx.body = await ctx.service.middleWare.getBalance(ctx.request.query);
  }

  /**
   * get transaction
   */
  public async getTransaction() {
    const { ctx } = this;
    logger.error('dddd');
    ctx.body = await ctx.service.middleWare.getTransaction(ctx.request.query);
  }

  /**
   * get transaction
   */
  public async getTransactionReceipt() {
    const { ctx } = this;
    logger.error('dddd');
    ctx.body = await ctx.service.middleWare.getTransactionReceipt(ctx.request.query);
  }

  /**
   * transfer
   */
  public async transfer() {
    const { ctx } = this;
    logger.error('dddd');
    ctx.body = await ctx.service.middleWare.transfer(ctx.request.query);
  }

  public async ecRecover() {
    const { ctx } = this;
    logger.error('dddd');
    ctx.body = await ctx.service.middleWare.ecRecover(ctx.request.body);
  }
}
