'use strict';

const dayjs = require('dayjs');
const Service = require('egg').Service;

class Bots extends Service {

  async addStudents(params) {
    const userList = await this.ctx.model.BotStudents.find();
    const newUserList = params.students.filter(item => {
      const findUser = userList.find(value => value.account === item.account && value.status !== '2');
      if (findUser && findUser.password === item.password) {
        return false;
      }
      return true;
    });
    let browser = [];
    if (params.type === '0') { // 导入到所有设备
      browser = await this.ctx.model.BotBrowser.find();
    } else if (params.type === '1') { // 导入到指定设备
      browser = await this.ctx.model.BotBrowser.find({ botName: params.botName });
    } else { // 导入到指定设备的某个浏览器
      browser = await this.ctx.model.BotBrowser.find({ botName: params.botName, key: params.key });
    }
    const allGroup = browser.length - 1;
    let currentGroup = 0;
    let pushNum = 0;

    newUserList.forEach(item => {
      const currentBrowser = browser[currentGroup];
      item.botName = currentBrowser.botName;
      item.browserKey = currentBrowser.key;

      if (pushNum++ && pushNum === 2) {
        pushNum = 0;
        if (currentGroup === allGroup) {
          currentGroup = 0;
        } else {
          currentGroup++;
        }
      }
    });

    if (newUserList.length > 0) {
      await this.ctx.model.BotStudents.insertMany(newUserList);
      this.ctx.body = {
        state: 200,
        msg: '新建成功',
      };
    } else {
      this.ctx.body = {
        state: 201,
        msg: '新建失败',
      };
    }
  }

  async getStudents(params) {
    const output = await this.ctx.model.BotStudents.find({
      status: params.status,
    }).sort({ startTime: -1 });
    this.ctx.body = {
      state: 200,
      data: output,
      msg: '查询成功',
    };
  }

  async resetStudents(params) {
    const output = await this.ctx.model.BotStudents.find({
      status: '1',
      botName: params.botName,
      browserKey: params.browserKey,
    });
    if (output.length > 0) {
      for (let index = 0; index < output.length; index++) {
        await this.ctx.model.BotStudents.updateOne(
          { _id: output[index]._id },
          {
            $set: {
              status: '0',
              startTime: '',
            },
          });
      }
    }
    this.ctx.body = {
      state: 200,
      msg: '成功',
    };
  }

  async getOneStudents(params) {
    const output = await this.ctx.model.BotStudents.findOne({
      status: '0',
      botName: params.botName,
      browserKey: params.browserKey,
    });
    if (output) {
      await this.ctx.model.BotStudents.updateOne(
        { _id: output._id },
        {
          $set: {
            status: '1',
            startTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
          },
        }
      );
    }
    this.ctx.body = {
      state: 200,
      data: output,
      msg: '查询成功',
    };
  }

  async updateStudents(params) {
    const newParams = {
      ...params,
      ...(params.status === '0' && { startTime: '', endTime: '' }),
      ...((params.status === '2' || params.status === '3') && { endTime: dayjs().format('YYYY-MM-DD HH:mm:ss') }),
    };
    delete newParams.id;
    await this.ctx.model.BotStudents.updateOne(
      { _id: params.id },
      { $set: newParams }
    );
    this.ctx.body = {
      state: 200,
      msg: '修改成功',
    };
  }

  async addBot(params) {
    const bot = await this.ctx.model.Bot.findOne({ botName: params.botName });
    if (bot) {
      this.ctx.body = {
        state: 201,
        msg: '该设备已存在',
      };
    } else {
      await this.ctx.model.Bot.insertMany([ params ]);
      this.ctx.body = {
        state: 200,
        msg: '新建成功',
      };
    }
  }

  async deleteBot(params) {
    const browser = await this.ctx.model.BotBrowser.find({ botName: params.botName });
    if (browser.length > 0) {
      this.ctx.body = {
        state: 201,
        msg: '删除失败,请先删除该设备下的浏览器！',
      };
    } else {
      await this.ctx.model.Bot.deleteOne({ botName: params.botName });
      this.ctx.body = {
        state: 200,
        msg: '删除成功',
      };
    }
  }

  async addBrowser(params) {
    if (params.id) {
      await await this.ctx.model.BotBrowser.updateOne({ _id: params.id }, {
        $set: {
          path: params.path,
          model: params.model,
        },
      });
      this.ctx.body = {
        state: 200,
        msg: '操作成功',
      };
    } else {
      const browser = await this.ctx.model.BotBrowser.find({ botName: params.botName, key: params.key });
      if (browser.length > 0) {
        this.ctx.body = {
          state: 201,
          msg: '操作失败',
        };
      } else {
        await this.ctx.model.BotBrowser.insertMany([ params ]);
        this.ctx.body = {
          state: 200,
          msg: '操作成功',
        };
      }
    }
  }

  async deleteBrowser(params) {
    await this.ctx.model.BotStudents.deleteMany({ botName: params.botName, browserKey: params.key });
    await this.ctx.model.BotBrowser.deleteOne({ _id: params.id });
    this.ctx.body = {
      state: 200,
      msg: '删除成功',
    };
  }

  async setBrowserStatus(params) {
    await this.ctx.model.BotBrowser.updateOne(
      {
        botName: params.botName,
        key: params.key,
      },
      {
        $set: {
          status: params.status,
          runTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        },
      }
    );
    this.ctx.body = {
      state: 200,
      msg: '成功',
    };
  }

  async checkBrowser() {
    const browsers = await this.ctx.model.BotBrowser.find({ status: '1' });
    if (browsers.length > 0) {
      const needNotice = [];
      for (let index = 0; index < browsers.length; index++) {
        if (dayjs().diff(dayjs(browsers[index].runTime), 'minutes') > 10) {
          await this.ctx.model.BotBrowser.updateOne({ _id: browsers[index]._id }, { $set: { status: '0' } });
          needNotice.push(browsers[index]);
        }
      }
      if (needNotice.length > 0) {
        const configList = await this.ctx.model.BotConfig.find();
        let config = {};
        if (configList.length > 0) {
          config = configList[0];
        }
        if (config.notice) {
          const { wxCompanyId, wxAppId, wxSecret } = config;
          let content = 'Auto Learn 通知:';
          needNotice.forEach(item => {
            content += `\n [${item.botName}(${item.key})] 停止运行！`;
          });
          // 处理通知逻辑
          this.ctx.helper.WxNotify({
            WX_COMPANY_ID: wxCompanyId,
            WX_APP_ID: wxAppId,
            WX_APP_SECRET: wxSecret,
            content,
          });
        }
      }
    }
    this.ctx.body = {
      state: 200,
      msg: '成功',
    };
  }

  async getBot(params) {
    let bot = [];
    if (params.botName) {
      bot = await this.ctx.model.Bot.findOne({ botName: params.botName });
    } else {
      bot = await this.ctx.model.Bot.find();
    }
    const output = [];
    for (let index = 0; index < bot.length; index++) {
      const browser = await this.ctx.model.BotBrowser.find({ botName: bot[index].botName });
      output.push({
        botName: bot[index].botName,
        botKey: bot[index].botKey,
        browser,
      });
    }
    this.ctx.body = {
      state: 200,
      data: output,
    };
  }

  async runBot(params) {
    const bot = await this.ctx.model.Bot.findOne({ botName: params.botName, botKey: params.botKey });
    if (bot) {
      const browser = await this.ctx.model.BotBrowser.find({ botName: params.botName });
      let apiKey = null;
      const configList = await this.ctx.model.BotConfig.find();
      if (configList.length > 0) {
        apiKey = configList[0].apiKey;
      }
      if (browser.length > 0 && apiKey) {
        this.ctx.body = {
          state: 200,
          data: browser,
          apiKey,
        };
      } else {
        this.ctx.body = {
          state: 202,
          msg: '该设备没有可运行浏览器',
        };
      }
    } else {
      this.ctx.body = {
        state: 202,
        msg: '设备不存在或密钥不正确',
      };
    }
  }

  async getConfig() {
    const output = await this.ctx.model.BotConfig.find();
    this.ctx.body = {
      state: 200,
      data: output,
      msg: '成功',
    };
  }

  async updateConfig(params) {
    if (params.id) {
      const id = params.id;
      delete params.id;
      await this.ctx.model.BotConfig.updateOne({ _id: id }, { $set: params });
    } else {
      await this.ctx.model.BotConfig.insertMany([ params ]);
    }
    this.ctx.body = {
      state: 200,
      msg: '成功',
    };
  }

}
module.exports = Bots;
