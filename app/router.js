'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  router.post('/uesr/registered', controller.user.registered);
  router.post('/uesr/login', controller.user.login);

  router.post('/notice/send', controller.notice.sendNotice);
  router.post('/notice/save', controller.notice.saveNotice);
  router.get('/notice/getToken', controller.notice.getWXAccessToken);
  router.get('/notice/getUser', controller.notice.getWXTagList);

};
