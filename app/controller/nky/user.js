'use strict';
const Controller = require('egg').Controller;
class UserController extends Controller {
  async getUser() {
    const { ctx } = this;
    const req = ctx.request.body;
    await ctx.service.nky.getUser(req);
  }
  async addProject() {
    const { ctx } = this;
    const req = ctx.request.body;
    await ctx.service.nky.addProject(req);
  }
  async updateProject() {
    const { ctx } = this;
    const req = ctx.request.body;
    await ctx.service.nky.updateProject(req);
  }
  async getProject() {
    const { ctx } = this;
    const req = ctx.request.body;
    await ctx.service.nky.getProject(req);
  }
  async updateUser() {
    const { ctx } = this;
    const req = ctx.request.body;
    await ctx.service.nky.updateUser(req);
  }
}
module.exports = UserController;
