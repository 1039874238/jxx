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
}
module.exports = HaishiService;
