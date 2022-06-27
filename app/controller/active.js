'use strict';
const Controller = require('egg').Controller;
class ActiveController extends Controller {
  async createActive() {
    const { ctx } = this;
    const req = ctx.request.body;
    await ctx.service.active.createActive(req);
  }
  async getActive() {
    const { ctx } = this;
    const req = ctx.request.body;
    await ctx.service.active.getActive(req);
  }
  async deleteActive() {
    const { ctx } = this;
    const req = ctx.request.body;
    await ctx.service.active.deleteActive(req);
  }
  async startActive() {
    const { ctx } = this;
    const req = ctx.request.body;
    await ctx.service.active.startActive(req);
  }
}
module.exports = ActiveController;
