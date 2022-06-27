'use strict';
const Service = require('egg').Service;
class Users extends Service {
  // 注册
  async registered(params) {
    const { ctx } = this;
    const corrct = await ctx.model.User.findOne({ phone: params.phone });
    const corrctName = await ctx.model.User.findOne({ userName: params.userName });

    if (!corrct) {
      if (corrctName) {
        ctx.body = {
          state: 201,
          msg: '用户名已存在',
        };
      } else {
        await ctx.model.User.insertMany([ params ]);
        ctx.body = {
          state: 200,
          msg: '注册成功',
        };
      }
    } else {
      ctx.body = {
        state: 201,
        msg: '该用户手机号已注册',
      };
    }
  }

  // 登录
  async login(params) {
    const corrct = await this.ctx.model.User.findOne({ phone: params.phone });
    if (corrct) {
      if (corrct.password === params.password) {
        const output = await this.ctx.model.User.findOne({ phone: params.phone }, { userName: 1, type: 1 });
        this.ctx.body = {
          state: 200,
          data: output,
          msg: '登录成功',
        };

      } else {
        this.ctx.body = {
          state: 201,
          msg: '密码错误',
        };
      }
    } else {
      this.ctx.body = {
        state: 201,
        msg: '用户名不存在',
      };
    }
  }

  // 获取所有用户
  async getAllUser() {
    const output = await this.ctx.model.User.find({}, { userName: 1, phone: 1 });
    this.ctx.body = {
      state: 200,
      data: output,
      msg: '成功',
    };
  }


}
module.exports = Users;
