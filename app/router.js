'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  router.post('/registered', controller.user.registered);
  router.post('/login', controller.user.login);
  router.get('/user/authorization', controller.user.auth); // token授权
  router.get('/getAllUser', controller.user.getAllUser);
  router.get('/getUser', controller.user.getUser);

  router.post('/createActive', controller.active.createActive);
  router.post('/getActive', controller.active.getActive);
  router.post('/deleteActive', controller.active.deleteActive);
  router.post('/startActive', controller.active.startActive);

  router.post('/member/create', controller.member.createMember);
  router.post('/member/update', controller.member.updateMember);
  router.get('/member/get', controller.member.getMember);

  router.post('/league/create', controller.league.create);
  router.post('/league/delete', controller.league.delete);
  router.get('/league/get', controller.league.get);

  router.post('/war/create', controller.war.create);
  router.post('/war/delete', controller.war.delete);
  router.post('/war/update', controller.war.update);
  router.get('/war/get', controller.war.get);

  router.post('/njsj/create', controller.projectNjsj.createProject);
  router.post('/njsj/get', controller.projectNjsj.getProject);
  router.post('/njsj/update', controller.projectNjsj.updateProject);
  router.post('/njsj/getProjectWithCookie', controller.projectNjsj.getProjectWithCookie);

  router.post('/ngc/create', controller.projectNgc.createProject);
  router.post('/ngc/get', controller.projectNgc.getProject);
  router.post('/ngc/update', controller.projectNgc.updateProject);
  router.post('/ngc/getProjectWithCookie', controller.projectNgc.getProjectWithCookie);

  router.post('/jshs/uploadUserList', controller.haishi.uploadFile.uploadFiles_stream);
  router.post('/jshs/getUser', controller.haishi.user.getUser);
  router.post('/jshs/updateUser', controller.haishi.user.updateUser);
  router.post('/jshs/addProject', controller.haishi.user.addProject);
  router.post('/jshs/updateProject', controller.haishi.user.updateProject);
  router.post('/jshs/getProject', controller.haishi.user.getProject);

  router.post('/jsnl/uploadUserList', controller.jsnl.uploadFile.uploadFiles_stream);
  router.post('/jsnl/getUser', controller.jsnl.user.getUser);
  router.post('/jsnl/updateUser', controller.jsnl.user.updateUser);
  router.post('/jsnl/addProject', controller.jsnl.user.addProject);
  router.post('/jsnl/updateProject', controller.jsnl.user.updateProject);
  router.post('/jsnl/getProject', controller.jsnl.user.getProject);

  router.post('/ngd/uploadUserList', controller.ngd.uploadFile.uploadFiles_stream);
  router.post('/ngd/getUser', controller.ngd.user.getUser);
  router.post('/ngd/updateUser', controller.ngd.user.updateUser);
  router.post('/ngd/addProject', controller.ngd.user.addProject);
  router.post('/ngd/updateProject', controller.ngd.user.updateProject);
  router.post('/ngd/getProject', controller.ngd.user.getProject);

  router.post('/zgyk/uploadUserList', controller.zgyk.uploadFile.uploadFiles_stream);
  router.post('/zgyk/getUser', controller.zgyk.user.getUser);
  router.post('/zgyk/updateUser', controller.zgyk.user.updateUser);
  router.post('/zgyk/addProject', controller.zgyk.user.addProject);
  router.post('/zgyk/updateProject', controller.zgyk.user.updateProject);
  router.post('/zgyk/getProject', controller.zgyk.user.getProject);

  router.post('/nky/uploadUserList', controller.nky.uploadFile.uploadFiles_stream);
  router.post('/nky/getUser', controller.nky.user.getUser);
  router.post('/nky/updateUser', controller.nky.user.updateUser);
  router.post('/nky/addProject', controller.nky.user.addProject);
  router.post('/nky/updateProject', controller.nky.user.updateProject);
  router.post('/nky/getProject', controller.nky.user.getProject);

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
  router.post('/bot/saveLog', controller.bot.index.saveLog);
  router.post('/bot/queryLog', controller.bot.index.queryLog);
  router.post('/bot/uploadUserList', controller.bot.uploadFile.uploadFiles_stream);

};
