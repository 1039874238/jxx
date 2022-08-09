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

  async auth() {
    const { ctx, app } = this;
    const { username } = ctx.state.user;
    const secret = app.config.jwt.secret;
    const token = ctx.helper.getToken({ username }, secret);
    ctx.body = {
      code: 200,
      token,
    };

  }

}
module.exports = UserController;
