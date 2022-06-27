'use strict';
module.exports = app => {
  const { mongoose } = app;
  const { Schema } = mongoose;
  const activeSchema = new Schema({
    // 姓名
    activityName: { type: String },
    result: { type: String, default: '' },
    creater: { type: String },
    createTime: { type: String },
    activityPrizes: { type: String },
    activityStaff: { type: Array },
    activityRemark: { type: String, default: '' },
  });
  return mongoose.model('activeModel', activeSchema, 'active');
};
