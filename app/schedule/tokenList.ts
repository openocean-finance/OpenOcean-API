import { Subscription } from 'egg';
import { CHAIN_LIST } from '../chains';

// const chainList = [ 'bsc', 'eth', 'polygon', 'avax', 'heco', 'fantom', 'arbitrum', 'optimism', 'okex', 'xdai', 'boba', 'moonriver', 'solana', 'terra', 'tron', 'ont' ];
export default class tokenListMonitor extends Subscription {
  static get schedule() {
    return {
      interval: '5m',
      type: 'worker',
      immediate: true,
    };
  }


  async subscribe() {
    for (const chain in CHAIN_LIST) {
      await CHAIN_LIST[chain].init(this.ctx);
    }
  }
}
