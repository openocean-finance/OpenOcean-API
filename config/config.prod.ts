import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1629105948639_7668';

  // add your egg config in here
  config.middleware = [];

  config.cors = {
    origin: '*',
  };

  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true, 
      useSession: true,
      headerName: 'x-csrf-token',
    },
  };

  // session
  config.session = {
    key: 'EGG_SESS',
    maxAge: 24 * 3600 * 1000, 
    httpOnly: true,
    encrypt: true,
    path: '/',
    domain: 'api.openocean.finance',
  };

  config.logger = {
    level: 'DEBUG',
    consoleLevel: 'DEBUG',
    allowDebugAtProd: true,
    outputJSON: true,
  };


  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
