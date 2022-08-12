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
};
