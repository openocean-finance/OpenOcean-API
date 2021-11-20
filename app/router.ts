import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.middleWare.test);

  // Get information of Swap quote
  router.get('/v1/cross/quote', controller.middleWare.quote);

  // Swap on chain
  router.get('/v1/cross/swap', controller.middleWare.swap);

  // Get supported Token(ETH) list
  router.get('/v1/cross/tokenList', controller.middleWare.tokenList);

  // create random wallet
  router.get('/v1/cross/createWallet', controller.middleWare.createWallet);

  // get balance by address
  router.get('/v1/cross/getBalance', controller.middleWare.getBalance);

  // get transaction
  router.get('/v1/cross/getTransaction', controller.middleWare.getTransaction);

  // get transaction receipt
  router.get('/v1/cross/getTransactionReceipt', controller.middleWare.getTransactionReceipt);

  // get transfer
  router.get('/v1/cross/transfer', controller.middleWare.transfer);

  router.post('/v1/cross/ecRecover', controller.middleWare.ecRecover);

  // get transaction
  router.use('*', () => {
    return 'invalid path';
  });

};
