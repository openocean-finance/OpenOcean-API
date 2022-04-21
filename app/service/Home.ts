import { Service } from 'egg';

export default class Home extends Service {
  public async test() {
    return `hi openocean-api, ${process.pid}`;
  }
}
