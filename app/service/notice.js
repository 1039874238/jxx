'use strict';
const Service = require('egg').Service;

class Notice extends Service {
  // 注册
  async registered(params) {
    const { ctx } = this;
    const corrct = await ctx.model.User.findOne({ phone: params.phone });

    if (!corrct) {
      await ctx.model.User.insertMany([ params ]);
      ctx.body = {
        code: 200,
        msg: '注册成功',
      };
    } else {
      ctx.body = {
        code: 201,
        msg: '该用户手机号已注册',
      };
    }
  }

  // 登录
  async login(params) {
    const corrct = await this.ctx.model.User.findOne({ phone: params.phone });
    if (corrct) {
      if (corrct.password === params.password) {
        const output = await this.ctx.model.User.findOne(
          { phone: params.phone },
          { username: 1, type: 1, _id: 1 }
        );
        const userInfo = {
          userName: output.username,
          userId: output._id,
          userType: output.type,
        };
        this.ctx.body = {
          code: 200,
          data: userInfo,
          msg: '登录成功',
        };
      } else {
        this.ctx.body = {
          code: 201,
          msg: '密码错误',
        };
      }
    } else {
      this.ctx.body = {
        code: 201,
        msg: '用户名不存在',
      };
    }
  }
}
module.exports = Notice;
