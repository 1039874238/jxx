'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  router.post('/uesr/registered', controller.user.registered);
  router.post('/uesr/login', controller.user.login);

};
