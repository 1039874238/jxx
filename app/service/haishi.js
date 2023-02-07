'use strict';

const Service = require('egg').Service;


class HaishiService extends Service {
  async addUser(params) {
    await this.ctx.model.StudentsJshs.insertMany(params.students);
    this.ctx.body = {
      state: 200,
      msg: '新建成功',
    };
  }
  async getUser(params) {
    const output = await this.ctx.model.StudentsJshs.find({ status: params.status });
    this.ctx.body = {
      state: 200,
      data: output,
      msg: '查询成功',
    };
  }
  async updateUser(params) {
    const newParams = { ...params };
    delete newParams.id;
    await this.ctx.model.StudentsJshs.updateOne(
      { _id: params.id },
      { $set: newParams }
    );
    this.ctx.body = {
      state: 200,
      msg: '修改成功',
    };
  }
}
module.exports = HaishiService;
