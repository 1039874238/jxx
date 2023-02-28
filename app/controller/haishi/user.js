'use strict';
const Controller = require('egg').Controller;
class UserController extends Controller {
  async getUser() {
    const { ctx } = this;
    const req = ctx.request.body;
    await ctx.service.haishi.getUser(req);
  }
  async addProject() {
    const { ctx } = this;
    const req = ctx.request.body;
    await ctx.service.haishi.addProject(req);
  }
  async updateProject() {
    const { ctx } = this;
    const req = ctx.request.body;
    await ctx.service.haishi.updateProject(req);
  }
  async getProject() {
    const { ctx } = this;
    const req = ctx.request.body;
    await ctx.service.haishi.getProject(req);
  }
  async updateUser() {
    const { ctx } = this;
    const req = ctx.request.body;
    await ctx.service.haishi.updateUser(req);
  }
}
module.exports = UserController;
