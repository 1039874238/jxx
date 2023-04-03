'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, jwt } = app;

  router.post('/registered', controller.user.registered);
  router.post('/login', controller.user.login);
  router.get('/user/authorization', jwt, controller.user.auth); // token授权
  router.get('/getAllUser', jwt, controller.user.getAllUser);
  router.get('/getUser', jwt, controller.user.getUser);

  router.post('/createActive', jwt, controller.active.createActive);
  router.post('/getActive', jwt, controller.active.getActive);
  router.post('/deleteActive', jwt, controller.active.deleteActive);
  router.post('/startActive', jwt, controller.active.startActive);

  router.post('/member/create', jwt, controller.member.createMember);
  router.post('/member/update', jwt, controller.member.updateMember);
  router.get('/member/get', jwt, controller.member.getMember);

  router.post('/league/create', jwt, controller.league.create);
  router.post('/league/delete', jwt, controller.league.delete);
  router.get('/league/get', jwt, controller.league.get);

  router.post('/war/create', controller.war.create);
  router.post('/war/delete', controller.war.delete);
  router.post('/war/update', controller.war.update);
  router.get('/war/get', controller.war.get);

  router.post('/njsj/create', controller.projectNjsj.createProject);
  router.post('/njsj/get', controller.projectNjsj.getProject);
  router.post('/njsj/update', controller.projectNjsj.updateProject);
  router.post('/njsj/getProjectWithCookie', controller.projectNjsj.getProjectWithCookie);

  router.post('/jshs/uploadUserList', controller.haishi.uploadFile.uploadFiles_stream);
  router.post('/jshs/getUser', controller.haishi.user.getUser);
  router.post('/jshs/updateUser', controller.haishi.user.updateUser);
  router.post('/jshs/addProject', controller.haishi.user.addProject);
  router.post('/jshs/updateProject', controller.haishi.user.updateProject);
  router.post('/jshs/getProject', controller.haishi.user.getProject);

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

};
