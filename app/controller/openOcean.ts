import { Controller } from 'egg';
import { logger } from '../utils/utils';
export default class OpenOceanController extends Controller {
  /**
   * quote
   */
  public async quote() {
    const { ctx } = this;
    const { chain } = ctx.params;
    logger.warn('receive a request', ctx.request.query);
    ctx.body = await ctx.service.openOcean.quote(chain, ctx.request.query);
  }

  public async getTokenList() {
    const { ctx } = this;
    console.log(ctx.params);
    const { chain } = ctx.params;
    ctx.body = await ctx.service.openOcean.getTokenList(chain);
  }
  public async getDexList() {
    const { ctx } = this;
    const { chain } = ctx.params;
    ctx.body = await ctx.service.openOcean.getDexList(chain);
  }
  public async getGasPrice() {
    const { ctx } = this;
    const { chain } = ctx.params;
    ctx.body = await ctx.service.openOcean.getGasPrice(chain);
  }

  public async swap_quote() {
    const { ctx } = this;
    const { chain } = ctx.params;
    ctx.body = await ctx.service.openOcean.swap_quote(chain, this.ctx.request.query);
  }
  public async swap() {
    const { ctx } = this;
    const { chain } = ctx.params;
    ctx.body = await ctx.service.openOcean.swap(chain, this.ctx.request.body);
  }

  public async getTransaction() {
    const { ctx } = this;
    const { chain } = ctx.params;
    ctx.body = await ctx.service.openOcean.getTransaction(chain, this.ctx.request.query);
  }
  public async getChainMsg() {
    const { ctx } = this;
    const { chain } = ctx.params;
    ctx.body = await ctx.service.openOcean.getChainMsg(chain, this.ctx.request.query);
  }

  public async getTxs() {
    const { ctx } = this;
    const { chain } = ctx.params;
    ctx.body = await ctx.service.openOcean.getTxs(chain, this.ctx.request.query);
  }

  public async decodeInputData() {
    const { ctx } = this;
    const { chain } = ctx.params;
    ctx.body = await ctx.service.openOcean.decodeInputData(chain, this.ctx.request.query);
  }
  public async getTransactionReceipt() {
    const { ctx } = this;
    const { chain } = ctx.params;
    ctx.body = await ctx.service.openOcean.getTransactionReceipt(chain, this.ctx.request.query);
  }
  public async getBlockNumber() {
    const { ctx } = this;
    const { chain } = ctx.params || {};
    ctx.body = await ctx.service.openocean.getBlockNumber(chain);
  }
  public async getHashFromChain() {
    const { ctx } = this;
    const { chain } = ctx.params || {};
    ctx.body = await ctx.service.openocean.getHashFromChain(chain);
  }
}
