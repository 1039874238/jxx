'use strict';
const Controller = require('egg').Controller;
class UserController extends Controller {
  async getUser() {
    const { ctx } = this;
    const req = ctx.request.body;
    await ctx.service.haishi.getUser(req);
  }
}
module.exports = UserController;
