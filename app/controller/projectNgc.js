'use strict';
const Controller = require('egg').Controller;
class ProjectController extends Controller {
  async createProject() {
    const { ctx } = this;
    const req = ctx.request.body;
    await ctx.service.projectNgc.createProject(req);
  }
  async getProject() {
    const { ctx } = this;
    const req = ctx.request.body;
    await ctx.service.projectNgc.getProject(req);
  }
  async updateProject() {
    const { ctx } = this;
    const req = ctx.request.body;
    await ctx.service.projectNgc.updateProject(req);
  }
  async getProjectWithCookie() {
    const { ctx } = this;
    const req = ctx.request.body;
    await ctx.service.projectNgc.getProjectWithCookie(req);
  }
}
module.exports = ProjectController;
