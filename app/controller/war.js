'use strict';
const Controller = require('egg').Controller;

class WarController extends Controller {
  async create() {
    const { ctx } = this;
    const req = ctx.request.body;
    await ctx.service.war.create(req);
  }
  async delete() {
    const { ctx } = this;
    const req = ctx.request.body;
    await ctx.service.war.delete(req);
  }
  async update() {
    const { ctx } = this;
    const req = ctx.request.body;
    await ctx.service.war.update(req);
  }
  async get() {
    const { ctx } = this;
    await ctx.service.war.get();
  }
}

module.exports = WarController;
