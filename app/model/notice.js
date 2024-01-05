'use strict';
module.exports = app => {
  const { mongoose } = app;
  const { Schema } = mongoose;
  const newSchema = new Schema({
    receiver: { type: Array, require: true },
    sender: { type: String, default: 'admin' },
    message: { type: String, required: true },
    sendTime: { type: String, required: true },
    status: { type: Number, required: true }, // 1 失败 0 成功
  });
  return mongoose.model('NoticeModel', newSchema, 'notice');
};
