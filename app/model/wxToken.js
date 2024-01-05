'use strict';
module.exports = app => {
  const { mongoose } = app;
  const { Schema } = mongoose;
  const newSchema = new Schema({
    accessToken: { type: String, required: true },
    status: { type: Number, required: true }, // 0 正常 1 失效
    updateTime: { type: String, required: true },
  });
  return mongoose.model('WxTokenModel', newSchema, 'wxtoken');
};
