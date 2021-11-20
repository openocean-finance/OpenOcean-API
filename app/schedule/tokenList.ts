import { Subscription } from 'egg';
import { getCacheList } from '../utils/utils';
import { getDexList } from '../utils/commonRes';

export default class tokenListMonitor extends Subscription {
  static get schedule() {
    return {
      interval: '10m',
      type: 'all',
      immediate: true,
    };
  }


  async subscribe() {
    const dexUrl = this.app.config.url.openocean;
    const urls = {
      1: 'https://market-api.openocean.finance/v2/eth/token',
      56: 'https://market-api.openocean.finance/v2/bsc/token',
      66: 'https://market-api.openocean.finance/v2/okex/token',
      128: 'https://market-api.openocean.finance/v2/heco/token',
      137: 'https://market-api.openocean.finance/v2/polygon/token',
      250: 'https://market-api.openocean.finance/v2/fantom/token',
      43114: 'https://market-api.openocean.finance/v2/avax/token',
      solana: 'https://market-api.openocean.finance/v2/solana/token',
      ont: 'https://market-api.openocean.finance/v2/ont/token',
      tron: 'https://market-api.openocean.finance/v2/tron/token',
    };
    const dexUrls = {
      1: `${dexUrl}/v2/1/dex`,
      56: `${dexUrl}/v2/56/dex`,
      137: `${dexUrl}/v2/137/dex`,
      250: `${dexUrl}/v2/250/dex`,
      43114: `${dexUrl}/v2/43114/dex`,
    };

    await getCacheList(urls);
    await getDexList(dexUrls);
  }
}
