'use strict';
const Service = require('egg').Service;

class War extends Service {

  async create(params) {
    const { ctx } = this;
    const result = await ctx.model.War.insertMany([ params ]);
    console.log(result[0]._id);
    ctx.body = {
      state: 200,
      msg: '添加成功',
    };
  }

  async delete(params) {
    const { ctx } = this;
    await ctx.model.War.updateOne({ _id: params.id }, { $set: { isDelete: 1 } });
    ctx.body = {
      state: 200,
      msg: '删除成功',
    };
  }

  async update(params) {
    const { ctx } = this;
    await ctx.model.War.updateOne({ _id: params.id }, { $set: { ...params } });
    ctx.body = {
      state: 200,
      msg: '修改成功',
    };
  }

  async get() {
    const { ctx } = this;
    const output = await ctx.model.War.find();
    ctx.body = {
      state: 200,
      msg: '查询成功',
      data: output,
    };
  }

}

module.exports = War;
