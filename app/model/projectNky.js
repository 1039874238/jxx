'use strict';
module.exports = app => {
  const { mongoose } = app;
  const { Schema } = mongoose;
  const nkyProjectSchema = new Schema({
    // 姓名
    studentId: { type: String },
    projectName: { type: String },
    projectId: { type: String },
    needTime: { type: String },
    startTime: { type: String, default: '' },
    endTime: { type: String, default: '' },
    status: { type: String, default: '0' }, // 0 未开始 1 进行中 2 已完成 3 失败
  });
  return mongoose.model('nkyProjectModel', nkyProjectSchema, 'nkyProject');
};
