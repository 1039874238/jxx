'use strict';
module.exports = app => {
  const { mongoose } = app;
  const { Schema } = mongoose;
  const projectSchema = new Schema({
    // 姓名
    courseName: { type: String },
    userInfo: { type: String },
    cookie: { type: String },
    contentId: { type: String },
    maxTime: { type: String },
    contentType: { type: String },
    teachPlanCourseId: { type: String },
    status: { type: Number, default: 0 }, // 0 未开始 1 进行中 2 已完成 3 失败
  });
  return mongoose.model('projectModel', projectSchema, 'projectNjsj');
};