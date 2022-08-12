'use strict';
module.exports = app => {
  const { mongoose } = app;
  const { Schema } = mongoose;
  const warResultSchema = new Schema({
    warId: {
      type: String,
    },
    ourTag: {
      type: String,
    },
    ourName: {
      type: String,
    },
    others: {
      type: Array,
      default: [],
    },
    point: {
      type: Number,
      default: 0,
    },
  });
  return mongoose.model('WarResultModel', warResultSchema, 'warResult');
};
