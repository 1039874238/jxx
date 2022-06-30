'use strict';
const Controller = require('egg').Controller;
class MemberController extends Controller {
  async createMember() {
    const { ctx } = this;
    const req = ctx.request.body;
    await ctx.service.member.createMember(req);
  }
  async updateMember() {
    const { ctx } = this;
    const req = ctx.request.body;
    await ctx.service.member.updateMember(req);
  }
}
module.exports = MemberController;
