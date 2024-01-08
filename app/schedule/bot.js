'use strict';

const Subscription = require('egg').Subscription;


class WatchBrowser extends Subscription {
  static get schedule() {
    return {
      cron: '0 48 7 * * ?',
      type: 'worker',
    };
  }
  async subscribe() {
    this.ctx.service.bot.sendDayLog();
  }
}
module.exports = WatchBrowser;
