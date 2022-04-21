import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  router.get('/test', controller.home.test);
  router.get('/v3/:chain/quote', controller.openOcean.quote);
  router.get('/v3/:chain/tokenList', controller.openOcean.getTokenList);
  router.get('/v3/:chain/dexList', controller.openOcean.getDexList);
  router.get('/v3/:chain/gasPrice', controller.openOcean.getGasPrice);
  router.get('/v3/:chain/swap_quote', controller.openOcean.swap_quote);
  router.get('/v3/:chain/getTransaction', controller.openOcean.getTransaction);
  router.get('/v3/:chain/chainMsg', controller.openOcean.getChainMsg);
  router.get('/v3/:chain/getTxs', controller.openOcean.getTxs);
  router.post('/v3/:chain/swap', controller.openOcean.swap);
  router.get('/v3/:chain/decodeInputData', controller.openOcean.decodeInputData);
  router.get('/v3/:chain/getTransactionReceipt', controller.openOcean.getTransactionReceipt);
  router.get('/v3/:chain/getBlockNumber', controller.openOcean.getBlockNumber);
  router.get('/v3/:chain/getHashFromChain', controller.openOcean.getHashFromChain);


  router.get('/v3/:chain/getBalance', controller.wallet.getBalance);
  router.get('/v3/:chain/approve', controller.wallet.approve);
  router.get('/v3/:chain/allowance', controller.wallet.allowance);
  router.get('/v3/:chain/createWallet', controller.wallet.createWallet);

  router.use('*', () => {
    return 'invalid path';
  });

};
