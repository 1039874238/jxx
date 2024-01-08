'use strict';
const Service = require('egg').Service;
const dayjs = require('dayjs');
const axios = require('axios');
const WX_BASE_URL = 'https://qyapi.weixin.qq.com';


class Notice extends Service {
  async sendNotice(data) {
    const result = await this.getWXAccessToken();
    if (result.state === 200) {
      // 发送消息
      const defaultConfig = {
        agentid: result.data.wxAppId,
        msgtype: 'text',
        text: {
          content: data.message,
        },
      };
      const res = await axios({
        url: `${WX_BASE_URL}/cgi-bin/message/send?access_token=${result.data.accessToken}`,
        method: 'POST',
        data: {
          totag: data.receiver,
          ...defaultConfig,
        },
      });
      if (res.data.errcode === 0) {
        this.saveNotice({ message: data.message, status: 0, receiver: data.receiver });
        this.ctx.body = {
          state: 200,
          msg: '发送成功',
        };
      } else {
        this.saveNotice({ message: data.message, status: 1, receiver: data.receiver });
        this.ctx.body = {
          state: 201,
          msg: '发送失败',
        };
      }
    } else {
      this.saveNotice({ message: data.message, status: 1, receiver: data.receiver });
      this.ctx.body = {
        state: 201,
        msg: '发送失败',
      };
    }
  }

  async saveNotice({ message, status, receiver }) {
    const newNotice = {
      message,
      status,
      sendTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      receiver: receiver.split('|'),
    };
    await this.ctx.model.Notice.insertMany([ newNotice ]);
    this.ctx.body = {
      state: 200,
      msg: '成功',
    };
  }

  async getWXAccessToken() {
    const wxTokenList = await this.ctx.model.WxToken.find();
    const configList = await this.ctx.model.BotConfig.find();
    if (wxTokenList.length > 0 && wxTokenList[0].status === 0) {
      // 判断token 有没有过期
      const res = await axios({
        url: `${WX_BASE_URL}/cgi-bin/getcallbackip?access_token=${wxTokenList[0].accessToken}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.data.errcode === 0) {
        const config = configList[0];
        const { wxCompanyId, wxSecret, wxAppId } = config;
        return {
          state: 200,
          data: {
            accessToken: wxTokenList[0].accessToken,
            wxCompanyId,
            wxSecret,
            wxAppId,
          },
        };
      }
      await this.ctx.model.WxToken.updateOne({ _id: wxTokenList[0]._id }, { $set: { status: 1, updateTime: dayjs().format('YYYY-MM-DD HH:mm:ss') } });
    }
    if (configList.length > 0) {
      const config = configList[0];
      const { wxCompanyId, wxSecret, wxAppId } = config;
      // 获取token
      const response = await axios({
        url: `${WX_BASE_URL}/cgi-bin/gettoken?corpid=${wxCompanyId}&corpsecret=${wxSecret}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.data.errcode === 0) {
        if (wxTokenList.length > 0) { // 更新
          await this.ctx.model.WxToken.updateOne({ _id: wxTokenList[0]._id }, { $set: { accessToken: response.data.access_token, status: 0, updateTime: dayjs().format('YYYY-MM-DD HH:mm:ss') } });
        } else {
          await this.ctx.model.WxToken.insertMany([{ accessToken: response.data.access_token, status: 0, updateTime: dayjs().format('YYYY-MM-DD HH:mm:ss') }]);
        }
        return {
          state: 200,
          data: {
            accessToken: response.data.access_token,
            wxCompanyId,
            wxSecret,
            wxAppId,
          },
        };
      }
      return {
        msg: 'access_token 获取失败',
        state: 201,
      };
    }
    return {
      msg: '配置信息不存在',
      state: 201,
    };
  }

  async getWXTagList() {
    const result = await this.getWXAccessToken();
    if (result.state === 200) {
      const accessToken = result.data.accessToken;
      const response = await axios({
        url: `${WX_BASE_URL}/cgi-bin/tag/list?access_token=${accessToken}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.data.errcode === 0) {
        this.ctx.body = {
          state: 200,
          data: response.data.taglist,
          msg: '成功',
        };
      } else {
        this.ctx.body = {
          state: 201,
          msg: response.data.errmsg,
        };
      }
    } else {
      this.ctx.body = {
        state: 201,
        msg: result.msg,
      };
    }
  }

  async validataServer() {
    const result = await this.getWXAccessToken();
    let flag = false;
    if (result.state === 200) {
      const accessToken = result.data.accessToken;
      const res = await axios({
        url: `${WX_BASE_URL}/cgi-bin/tag/list?access_token=${accessToken}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.data.errcode === 0) {
        const index = res.data.taglist.findIndex(item => item.tagname === 'admin');
        flag = index > -1;
      } else {
        flag = false;
      }
    }
    return flag;
  }
}
module.exports = Notice;
