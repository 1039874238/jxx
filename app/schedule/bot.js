'use strict';

const Subscription = require('egg').Subscription;


class WatchBrowser extends Subscription {
  static get schedule() {
    return {
      cron: '* * 7 * * ?',
      type: 'all',
    };
  }
  async subscribe() {
    this.ctx.service.bot.sendDayLog();
  }
}
module.exports = WatchBrowser;
