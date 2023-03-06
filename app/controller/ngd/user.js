'use strict';
const Controller = require('egg').Controller;
class UserController extends Controller {
  async getUser() {
    const { ctx } = this;
    const req = ctx.request.body;
    await ctx.service.ngd.getUser(req);
  }
  async addProject() {
    const { ctx } = this;
    const req = ctx.request.body;
    await ctx.service.ngd.addProject(req);
  }
  async updateProject() {
    const { ctx } = this;
    const req = ctx.request.body;
    await ctx.service.ngd.updateProject(req);
  }
  async getProject() {
    const { ctx } = this;
    const req = ctx.request.body;
    await ctx.service.ngd.getProject(req);
  }
  async updateUser() {
    const { ctx } = this;
    const req = ctx.request.body;
    await ctx.service.ngd.updateUser(req);
  }
}
module.exports = UserController;
