'use strict';
module.exports = app => {
  const { mongoose } = app;
  const { Schema } = mongoose;
  const userSchema = new Schema({
    // 姓名
    userName: { type: String },
    phone: { type: String },
    type: { type: Number, default: 0 }, // 0普通用户 1 管理员 2超级管理员
    password: { type: String },
  });
  return mongoose.model('UserModel', userSchema, 'users');
};
