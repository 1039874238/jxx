'use strict';
const Service = require('egg').Service;
const request = require('request');
const dayjs = require('dayjs');

const getNjsjProject = cookie => {
  return new Promise((resolve, reject) => {
    request(
      {
        url: `https://degree.qingshuxuetang.com/njsj/Student/Course/CourseData?_t=${new Date().valueOf()}`,
        headers: {
          accept: '*/*',
          'accept-language': 'zh-CN,zh;q=0.9',
          'device-trace-id-qs': '0aaf2c2f-9f33-4e09-8a9d-2ece1650d05f',
          'sec-ch-ua':
            '"Not_A Brand";v="99", "Google Chrome";v="109", "Chromium";v="109"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'x-requested-with': 'XMLHttpRequest',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
          cookie,
          Referer:
            'https://degree.qingshuxuetang.com/njsj/Student/Course/CourseList',
          'Referrer-Policy': 'strict-origin-when-cross-origin',
        },
        body: null,
        method: 'POST',
      },
      (err, res, body) => {
        try {
          const result = JSON.parse(body).data.filter(item => item.learnStatusName === '在修' && item.score !== 100 && item.courseName !== '南京审计大学党史知识竞赛');
          resolve(result);
        } catch (e) {
          reject(e);
        }
      }
    );
  });
};

class Project extends Service {

  // 新建活动
  async createProject(params) {
    await this.ctx.model.ProjectNjsj.insertMany(Object.values(params));
    this.ctx.body = {
      state: 200,
      msg: '新建成功',
    };
  }

  // 获取活动
  async getProject(params) {
    let output = [];
    if (params.status) {
      output = await this.ctx.model.ProjectNjsj.find({ status: params.status });
    } else {
      output = await this.ctx.model.ProjectNjsj.find();
    }
    this.ctx.body = {
      state: 200,
      data: output,
      msg: '成功',
    };
  }

  async updateProject(params) {
    const editParams = {
      status: params.status,
      ...params.status === '1' && { startTime: dayjs().format('YYYY-MM-DD HH:mm:ss') },
      ...params.status === '2' && { endTime: dayjs().format('YYYY-MM-DD HH:mm:ss') },
    };
    await this.ctx.model.ProjectNjsj.updateOne({ _id: params.id }, { $set: { ...editParams } });
    this.ctx.body = {
      state: 200,
      msg: '修改成功',
    };
  }

  async getProjectWithCookie(params) {
    const body = await getNjsjProject(params.cookie);
    const project = await this.ctx.model.ProjectNjsj.find();
    let result = [];
    if (body.length > 0) {
      result = body.map(item => {
        const pro = {
          teachPlanCourseId: item.teachingPlanCourseId,
          contentType: '',
          maxTime: '',
          contentId: '',
          courseName: item.courseName,
        };
        const findProject = project.find(value => value.teachPlanCourseId === item.teachingPlanCourseId);
        if (findProject) {
          pro.contentType = findProject.contentType;
          pro.maxTime = findProject.maxTime;
          pro.contentId = findProject.contentId;
        }
        return pro;
      });
    }
    this.ctx.body = {
      state: 200,
      data: result,
      msg: '成功',
    };
  }

}
module.exports = Project;
