'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  router.post('/registered', controller.user.registered);
  router.post('/login', controller.user.login);

  router.post('/bot/addStudents', controller.bot.index.addStudents);
  router.post('/bot/getStudents', controller.bot.index.getStudents);
  router.post('/bot/getOneStudents', controller.bot.index.getOneStudents);
  router.post('/bot/updateStudents', controller.bot.index.updateStudents);
  router.post('/bot/resetStudents', controller.bot.index.resetStudents);
  router.post('/bot/addBot', controller.bot.index.addBot);
  router.post('/bot/addBrowser', controller.bot.index.addBrowser);
  router.post('/bot/getBot', controller.bot.index.getBot);
  router.post('/bot/runBot', controller.bot.index.runBot);
  router.post('/bot/deleteBot', controller.bot.index.deleteBot);
  router.post('/bot/setBrowserStatus', controller.bot.index.setBrowserStatus);
  router.post('/bot/deleteBrowser', controller.bot.index.deleteBrowser);
  router.post('/bot/checkBrowser', controller.bot.index.checkBrowser);
  router.post('/bot/getConfig', controller.bot.index.getConfig);
  router.post('/bot/updateConfig', controller.bot.index.updateConfig);
  router.post('/bot/getAllowRunStatus', controller.bot.index.getAllowRunStatus);
  router.post('/bot/uploadUserList', controller.bot.uploadFile.uploadFiles_stream);

};
