'use strict';
const Controller = require('egg').Controller;
class UserController extends Controller {
  async registered() {
    const { ctx } = this;
    const req = ctx.request.body;
    await ctx.service.user.registered(req);
  }
  async login() {
    const { ctx } = this;
    const req = ctx.request.body;
    await ctx.service.user.login(req);
  }
  async getAllUser() {
    const { ctx } = this;
    await ctx.service.user.getAllUser();
  }
  async getUser() {
    const { ctx } = this;
    await ctx.service.user.getUser();
  }
}
module.exports = UserController;
