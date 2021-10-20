import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.middleWare.test);

  // Get information of Swap quote
  router.get('/v1/cross/quote', controller.middleWare.quote);

  // Get information of Swap transactionss
  router.get('/v1/cross/swap-quote', controller.middleWare.swap_quote);

  // Get information of Swap
  router.get('/v1/cross/swap', controller.middleWare.swap);

  // Get supported Token(ETH) list
  router.get('/v1/cross/tokenList', controller.middleWare.tokenList);

  // Create wallet
  router.get('/v1/create', controller.middleWare.tokenList);

  // create wallet
  router.get('/v1/cross/createWallet', controller.middleWare.createWallet);

  // get balance
  router.get('/v1/cross/getBalance', controller.middleWare.getBalance);

  // get transaction
  router.get('/v1/cross/getTransaction', controller.middleWare.getTransaction);

  // get transfer
  router.get('/v1/cross/transfer', controller.middleWare.transfer);

  // get transaction
  router.use('*', () => {
    return 'invalid path';
  });

};
