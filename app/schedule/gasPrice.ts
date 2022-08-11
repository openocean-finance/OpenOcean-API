import { Subscription } from 'egg';
import { gasPrice } from '../service/GlobData';
export default class tokenListMonitor extends Subscription {
  static get schedule() {
    return {
      interval: '30s',
      type: 'worker',
      immediate: true,
    };
  }


  async subscribe() {
    const url = this.app.config.url.openocean;
    const gasUrls = {
      1: `${url}/v2/1/gas-price`,
      10: `${url}/v2/10/gas-price`,
      56: `${url}/v2/56/gas-price`,
      66: `${url}/v2/56/gas-price`,
      100: `${url}/v2/100/gas-price`,
      128: `${url}/v2/56/gas-price`,
      137: `${url}/v2/137/gas-price`,
      250: `${url}/v2/250/gas-price`,
      288: `${url}/v2/288/gas-price`,
      43114: `${url}/v2/43114/gas-price`,
      42161: `${url}/v2/42161/gas-price`,
    };
    const gasPriceList: any = await gasPrice(gasUrls);
    this.ctx.app.messenger.sendToApp('data', { tokenList: null, gasPriceList, dexList: null });
  }
}
