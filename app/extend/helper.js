'use strict';

const jwt = require('jsonwebtoken');
module.exports = {
  // 生成Token
  getToken(payload = {}, secret) {
    return jwt.sign(payload, secret, { expiresIn: '1h' });
  },
};
