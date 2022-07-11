'use strict';

const Service = require('egg').Service;

class League extends Service {
  // 创建
  async create(params) {
    await this.ctx.model.League.insertMany([ params ]);
    this.ctx.body = {
      state: 200,
      msg: '新建成功',
    };
  }

  // 查询
  async get() {
    const output = await this.ctx.model.League.find();
    this.ctx.body = {
      state: 200,
      data: output,
      msg: '成功',
    };
  }

  // 删除
  async delete(params) {
    await this.ctx.model.League.deleteOne({ _id: params.id });
    this.ctx.body = {
      state: 200,
      msg: '删除成功',
    };
  }
}

module.exports = League;

