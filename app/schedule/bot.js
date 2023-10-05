'use strict';

const Subscription = require('egg').Subscription;


class WatchBrowser extends Subscription {
  static get schedule() {
    return {
      interval: '5m',
      type: 'all'
    }
  }
  async subscribe() {
    this.ctx.service.bot.checkBrowser()
  }
}
module.exports = WatchBrowser;
