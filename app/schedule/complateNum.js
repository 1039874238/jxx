'use strict';

const Subscription = require('egg').Subscription;


class WatchComplate extends Subscription {
  static get schedule() {
    return {
      cron: '0 0/15 * * * ?',
      type: 'worker',
    };
  }
  async subscribe() {
    this.ctx.service.bot.setComplateNum();
  }
}
module.exports = WatchComplate;
