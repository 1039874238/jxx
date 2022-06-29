'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/registered', controller.user.registered);
  router.post('/login', controller.user.login);
  router.get('/getAllUser', controller.user.getAllUser);
  router.post('/createActive', controller.active.createActive);
  router.post('/getActive', controller.active.getActive);
  router.post('/deleteActive', controller.active.deleteActive);
  router.post('/startActive', controller.active.startActive);
  router.post('/member/create', controller.member.createMember);
};
