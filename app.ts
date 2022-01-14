module.exports = app => {

  app.messenger.on('data', data => {
    const ctx = app.createAnonymousContext();
    ctx.service.globData.update(data);
  });
};
