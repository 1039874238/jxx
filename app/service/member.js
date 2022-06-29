'use strict';
const Service = require('egg').Service;

class Member extends Service {

  async createMember(params) {
    const { ctx } = this;
    const corrct = await ctx.model.Member.findOne({ memberTag: params.memberTag });
    if (!corrct) {
      await ctx.model.Member.insertMany([ params ]);
      ctx.body = {
        state: 200,
        msg: '新增成功',
      };
    } else {
      ctx.body = {
        state: 201,
        msg: '该成员已存在',
      };
    }
  }


}

module.exports = Member;
