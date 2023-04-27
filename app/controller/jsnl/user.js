'use strict';
const Controller = require('egg').Controller;
class UserController extends Controller {
  async getUser() {
    const { ctx } = this;
    const req = ctx.request.body;
    await ctx.service.jsnl.getUser(req);
  }
  async addProject() {
    const { ctx } = this;
    const req = ctx.request.body;
    await ctx.service.jsnl.addProject(req);
  }
  async updateProject() {
    const { ctx } = this;
    const req = ctx.request.body;
    await ctx.service.jsnl.updateProject(req);
  }
  async getProject() {
    const { ctx } = this;
    const req = ctx.request.body;
    await ctx.service.jsnl.getProject(req);
  }
  async updateUser() {
    const { ctx } = this;
    const req = ctx.request.body;
    await ctx.service.jsnl.updateUser(req);
  }
}
module.exports = UserController;
