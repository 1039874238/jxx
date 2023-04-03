'use strict';
const Controller = require('egg').Controller;
class UserController extends Controller {
  async getUser() {
    const { ctx } = this;
    const req = ctx.request.body;
    await ctx.service.zgyk.getUser(req);
  }
  async addProject() {
    const { ctx } = this;
    const req = ctx.request.body;
    await ctx.service.zgyk.addProject(req);
  }
  async updateProject() {
    const { ctx } = this;
    const req = ctx.request.body;
    await ctx.service.zgyk.updateProject(req);
  }
  async getProject() {
    const { ctx } = this;
    const req = ctx.request.body;
    await ctx.service.zgyk.getProject(req);
  }
  async updateUser() {
    const { ctx } = this;
    const req = ctx.request.body;
    await ctx.service.zgyk.updateUser(req);
  }
}
module.exports = UserController;
