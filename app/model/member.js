'use strict';
module.exports = app => {
  const { mongoose } = app;
  const { Schema } = mongoose;
  const memberSchema = new Schema({
    memberName: { type: String },
    memberTag: { type: String },
    position: { type: Number, default: 0 }, // 职位 0 成员 1 长老 2 副手 3首领
    status: { type: Number, default: 0 }, // 是否在 0 在，1不在
  });
  return mongoose.model('memberModel', memberSchema, 'member');
};
