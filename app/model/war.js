'use strict';
module.exports = app => {
  const { mongoose } = app;
  const { Schema } = mongoose;
  const warSchema = new Schema({
    // 姓名
    typy: { type: Number, default: 0 }, // 0 常规 1 联赛
    counterpartyName: { type: String },
    counterpartyLevel: { type: Number, default: 1 },
    scale: { // 规模
      type: String,
      default: '20',
    },
    otherSide: {
      type: Array,
    },
    ourSide: {
      type: Array, // tag name
    },
    result: {
      type: String,
      default: '战斗中',
    },
    startTime: {
      type: Number,
    },
    endTime: {
      type: Number,
    },
    isDelete: {
      type: Number,
      default: 0,
    },
    sort: {
      type: Number,
    },
  });
  return mongoose.model('WarModel', warSchema, 'war');
};
