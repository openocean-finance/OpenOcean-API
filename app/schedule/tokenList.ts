import { Subscription } from 'egg';
import { getCacheList, getCacheDexList } from '../service/GlobData';

export default class tokenListMonitor extends Subscription {
  static get schedule() {
    return {
      interval: '10m',
      type: 'worker',
      immediate: true,
    };
  }


  async subscribe() {
    const url = this.app.config.url.openocean;
    const urls = {
      1: 'https://market-api.openocean.finance/v2/eth/token',
      10: 'https://market-api.openocean.finance/v2/optimism/token',
      56: 'https://market-api.openocean.finance/v2/bsc/token',
      66: 'https://market-api.openocean.finance/v2/okex/token',
      100: 'https://market-api.openocean.finance/v2/xdai/token',
      128: 'https://market-api.openocean.finance/v2/heco/token',
      137: 'https://market-api.openocean.finance/v2/polygon/token',
      250: 'https://market-api.openocean.finance/v2/fantom/token',
      288: 'https://market-api.openocean.finance/v2/boba/token',
      43114: 'https://market-api.openocean.finance/v2/avax/token',
      42161: 'https://market-api.openocean.finance/v2/arbitrum/token',
      solana: 'https://market-api.openocean.finance/v2/solana/token',
      ont: 'https://market-api.openocean.finance/v2/ont/token',
      401: 'https://market-api.openocean.finance/v2/ont/token',
      tron: 'https://market-api.openocean.finance/v2/tron/token',
      400: 'https://market-api.openocean.finance/v2/terra/token',
      terra: 'https://market-api.openocean.finance/v2/terra/token',
    };
    const dexUrls = {
      1: `${url}/v2/1/dex`,
      10: `${url}/v2/10/dex`,
      56: `${url}/v2/56/dex`,
      66: `${url}/v2/66/dex`,
      100: `${url}/v2/100/dex`,
      128: `${url}/v2/128/dex`,
      137: `${url}/v2/137/dex`,
      250: `${url}/v2/250/dex`,
      288: `${url}/v2/288/dex`,
      43114: `${url}/v2/43114/dex`,
      42161: `${url}/v2/42161/dex`,
    };
    const tokenList: any = await getCacheList(urls);
    const dexList: any = await getCacheDexList(dexUrls);
    this.ctx.app.messenger.sendToApp('data', { tokenList, gasPriceList: null, dexList });

  }
}
