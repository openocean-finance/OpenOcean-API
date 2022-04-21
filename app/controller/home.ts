import { Controller } from 'egg';
import { logger } from '../utils/utils';
export default class HomeController extends Controller {
  /**
   * for test
   */
  public async test() {
    const { ctx } = this;
    logger.error('test');
    ctx.body = await ctx.service.home.test();
  }
}
