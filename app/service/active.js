'use strict';
const Service = require('egg').Service;
class Active extends Service {

  // 新建活动
  async createActive(params) {
    await this.ctx.model.Active.insertMany([ params ]);
    this.ctx.body = {
      state: 200,
      msg: '新建成功',
    };
  }

  // 获取活动
  async getActive(params) {
    let output = [];
    if (params.activeName) {
      output = await this.ctx.model.Active.find({ activityName: params.activeName });
    } else {
      output = await this.ctx.model.Active.find();

    }
    this.ctx.body = {
      state: 200,
      data: output,
      msg: '成功',
    };
  }

  // 开始活动
  async startActive(params) {
    const data = await this.ctx.model.Active.findOne({ _id: params.id }, { activityStaff: 1, result: 1 });
    if (data.result) {
      this.ctx.body = {
        state: 201,
        msg: '活动已结束！',
      };
    } else {
      const index = Math.floor(Math.random() * data.activityStaff.length);
      await this.ctx.model.Active.updateOne({ _id: params.id }, { $set: { result: data.activityStaff[index] } });
      this.ctx.body = {
        state: 200,
        msg: `恭喜${data.activityStaff[index]}获得奖励！`,
      };
    }
  }

  // 删除活动
  async deleteActive(params) {
    await this.ctx.model.Active.deleteOne({ _id: params.id });
    this.ctx.body = {
      state: 200,
      msg: '成功',
    };
  }


}
module.exports = Active;
