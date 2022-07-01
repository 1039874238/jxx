'use strict';
const Service = require('egg').Service;

class Member extends Service {

  async createMember(params) {
    const { ctx } = this;
    const corrct = await ctx.model.Member.findOne({ memberTag: params.memberTag, status: 0 });
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

  async updateMember(params) {
    await this.ctx.model.Member.updateOne({ memberTag: params.memberTag }, { $set: { memberName: params.memberName, position: params.position, status: params.status } });
    this.ctx.body = {
      state: 200,
      msg: '修改成功',
    };
  }
  async getMember(params) {
    const option = { status: 0 };
    if (params.memberName) {
      option.memberNameparams.memberName;
    }
    const output = await this.ctx.model.Member.find(option).sort({ position: -1 });
    this.ctx.body = {
      state: 200,
      data: output,
      msg: '成功',
    };
  }


}

module.exports = Member;
