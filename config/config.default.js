'use strict';
module.exports = appInfo => {
  const config = exports = {};
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1641975352438_173';
  // add your middleware config here
  config.middleware = [];
  config.security = {
    csrf: {
      enable: false,
    },
  };
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  // mongoose数据库配置
  config.mongoose = {
    url: 'mongodb://127.0.0.1:27017/cocdb', // 端口号27021数据库名cocDb
    options: { useNewUrlParser: true, useUnifiedTopology: true }, // 其他配置警告解除方法
  };

  return {
    ...config,
    ...userConfig,
  };
};
