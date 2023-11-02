'use strict';
module.exports = app => {
  const { mongoose } = app;
  const { Schema } = mongoose;
  const botSchema = new Schema({
    // 姓名
    botName: { type: String },
    botKey: { type: String },
  });
  return mongoose.model('BotModel', botSchema, 'bots');
};
