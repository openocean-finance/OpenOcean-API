import { Subscription } from 'egg';
import { getCacheList } from '../utils/utils';
export default class tokenListMonitor extends Subscription {
  static get schedule() {
    return {
      interval: '1m',
      type: 'all',
      immediate: true,
    };
  }


  async subscribe() {
    const urls = {
      1: 'https://ethapi.openocean.finance/v1/token',
      56: 'https://ethapi.openocean.finance/v1/bsc/token',
      137: 'https://ethapi.openocean.finance/v1/polygon/token',
      43114: 'https://ethapi.openocean.finance/v1/avax/token',
    };
    await getCacheList(urls);
  }
}
