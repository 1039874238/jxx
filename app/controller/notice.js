'use strict';
const Controller = require('egg').Controller;
class UserController extends Controller {
  async sendNotice() {
    const { ctx } = this;
    const req = ctx.request.body;
    await ctx.service.notice.sendNotice(req);
  }
  async saveNotice() {
    const { ctx } = this;
    const req = ctx.request.body;
    await ctx.service.notice.saveNotice(req);
  }
  async getWXAccessToken() {
    const { ctx } = this;
    await ctx.service.notice.getWXAccessToken();
  }
  async getWXTagList() {
    const { ctx } = this;
    await ctx.service.notice.getWXTagList();
  }
}
module.exports = UserController;
