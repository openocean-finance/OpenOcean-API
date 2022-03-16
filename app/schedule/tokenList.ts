import { Subscription } from 'egg';
import { getCacheList, gasPrice, getCacheDexList } from '../service/GlobData';

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
      1: `${url}/v2/1/dex`,
      56: `${url}/v2/56/dex`,
      137: `${url}/v2/137/dex`,
      250: `${url}/v2/250/dex`,
      43114: `${url}/v2/43114/dex`,
    };
    const gasUrls = {
      1: `${url}/v2/1/gas-price`,
      56: `${url}/v2/56/gas-price`,
      137: `${url}/v2/137/gas-price`,
      43114: `${url}/v2/43114/gas-price`,
      250: `${url}/v1/fantom/gas-price`,
    };

    const tokenList: any = await getCacheList(urls);
    const dexList: any = await getCacheDexList(dexUrls);
    const gasPriceList: any = await gasPrice(gasUrls);
    this.ctx.app.messenger.sendToApp('data', { tokenList, gasPriceList, dexList });

  }
}
