'use strict';
const Controller = require('egg').Controller;
class MemberController extends Controller {
  async createMember() {
    const { ctx } = this;
    const req = ctx.request.body;
    await ctx.service.member.createMember(req);
  }
}
module.exports = MemberController;
