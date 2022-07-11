'use strict';
const Controller = require('egg').Controller;
class LeagueController extends Controller {
  async create() {
    const { ctx } = this;
    const req = ctx.request.body;
    await ctx.service.league.create(req);
  }
  async get() {
    const { ctx } = this;
    await ctx.service.league.get();
  }
  async delete() {
    const { ctx } = this;
    const req = ctx.request.body;
    await ctx.service.league.delete(req);
  }
}
module.exports = LeagueController;
