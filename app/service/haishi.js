'use strict';

const Service = require('egg').Service;
const dayjs = require('dayjs');

class HaishiService extends Service {
  async addUser(params) {
    const userList = await this.ctx.model.StudentsJshs.find({
      $or: [{ status: '0' }, { status: '1' }],
    });
    const newUserList = params.students.filter(item => {
      const findUser = userList.find(value => value.idCard === item.idCard);
      if (findUser && findUser.password === item.password) {
        return false;
      }
      return true;

    });
    await this.ctx.model.StudentsJshs.insertMany(newUserList);
    this.ctx.body = {
      state: 200,
      msg: '新建成功',
    };
  }
  async addProject(params) {
    const project = await this.ctx.model.ProjectJshs.find({
      studentId: params.studentId,
      projectId: params.projectId,
    });
    let msg = '新建成功';
    if (project.length > 0) {
      await this.ctx.model.ProjectJshs.updateOne(
        { studentId: params.studentId, projectId: params.projectId },
        { $set: { status: '1', startTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), endTime: '' } }
      );
      msg = '已存在';
    } else {
      await this.ctx.model.ProjectJshs.insertMany([
        { ...params, startTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), status: '1' },
      ]);
    }
    this.ctx.body = {
      state: 200,
      msg,
    };
  }

  async updateProject(params) {
    const editParams = {
      ...(params.status && { status: params.status }),
      ...(params.status === '1' && {
        startTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      }),
      ...(params.status === '2' && {
        endTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      }),
    };
    await this.ctx.model.ProjectJshs.updateOne(
      { studentId: params.studentId, projectId: params.projectId },
      { $set: { ...editParams } }
    );
    this.ctx.body = {
      state: 200,
      msg: '修改成功',
    };
  }

  async getProject(params) {
    const output = await this.ctx.model.ProjectJshs.find({
      studentId: params.studentId,
    });
    this.ctx.body = {
      state: 200,
      data: output,
      msg: '查询成功',
    };
  }
  async getUser(params) {
    const output = await this.ctx.model.StudentsJshs.find({
      status: params.status,
    });
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
