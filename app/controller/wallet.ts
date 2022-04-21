import { Controller } from 'egg';

export default class WalletController extends Controller {
  /**
   * create wallet
   */
  public async createWallet() {
    const { ctx } = this;
    const { chain } = ctx.params;
    this.logger.error('dddd');
    ctx.body = await ctx.service.wallet.createWallet(chain);
  }

  // public async checkBalance() {
  //   const { ctx } = this;
  //   ctx.body = await ctx.service.wallet.checkBalance(ctx.request.query);
  // }

  //   /**
  //    * get token balance
  //    */
  public async getBalance() {
    const { ctx } = this;
    const { chain } = ctx.params;
    ctx.body = await ctx.service.wallet.getBalance(chain, ctx.request.query);
  }

  //   /**
  //  * get token balance
  //  */
  public async allowance() {
    const { ctx } = this;
    const { chain } = ctx.params;
    ctx.body = await ctx.service.wallet.allowance(chain, ctx.request.query);
  }

  public async approve() {
    const { ctx } = this;
    const { chain } = ctx.params;
    ctx.body = await ctx.service.wallet.approve(chain, this.ctx.request.query);
  }
}
