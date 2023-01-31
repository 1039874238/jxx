'use strict';
const Controller = require('egg').Controller;
class ProjectController extends Controller {
  async createProject() {
    const { ctx } = this;
    const req = ctx.request.body;
    await ctx.service.projectNjsj.createProject(req);
  }
  async getProject() {
    const { ctx } = this;
    const req = ctx.request.body;
    await ctx.service.projectNjsj.getProject(req);
  }
  async updateProject() {
    const { ctx } = this;
    const req = ctx.request.body;
    await ctx.service.projectNjsj.updateProject(req);
  }
  async getProjectWithCookie() {
    const { ctx } = this;
    const req = ctx.request.body;
    await ctx.service.projectNjsj.getProjectWithCookie(req);
  }
}
module.exports = ProjectController;
