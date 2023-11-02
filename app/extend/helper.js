'use strict';

const jwt = require('jsonwebtoken');
const axios = require('axios');
module.exports = {
  // 生成Token
  getToken(payload = {}, secret) {
    return jwt.sign(payload, secret, { expiresIn: '1h' });
  },
  async validataServer() {
    const BASE_URL = 'https://qyapi.weixin.qq.com';
    let accessToken = false;
    try {
      const response = await axios({
        url: `${BASE_URL}/cgi-bin/gettoken?corpid=wwb3c165816fdc331f&corpsecret=2lqY1kgBlhM8hv7rkojVtDLkY4DDnyksteL6ns5Phv8`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      accessToken = response.data.access_token;
    } catch (error) {
      console.log(error);
      accessToken = false;
    }
    return !!accessToken;
  },
  async WxNotify(payload) {
    const { WX_COMPANY_ID, WX_APP_SECRET, WX_APP_ID, content } = payload;
    try {
      // 获取token
      let accessToken = '';
      const BASE_URL = 'https://qyapi.weixin.qq.com';
      try {
        const response = await axios({
          url: `${BASE_URL}/cgi-bin/gettoken?corpid=${WX_COMPANY_ID}&corpsecret=${WX_APP_SECRET}`,
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        accessToken = response.data.access_token;
      } catch (error) {
        console.log(error);
      }
      // 发送消息
      const defaultConfig = {
        agentid: WX_APP_ID,
        msgtype: 'text',
        text: {
          content,
        },
      };
      await axios({
        url: `${BASE_URL}/cgi-bin/message/send?access_token=${accessToken}`,
        method: 'POST',
        data: {
          touser: '@all',
          ...defaultConfig,
        },
      });
      return true;
    } catch (error) {
      return false;
    }
  },
};
