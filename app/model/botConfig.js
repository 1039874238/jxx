'use strict';
module.exports = app => {
  const { mongoose } = app;
  const { Schema } = mongoose;
  const botConfigSchema = new Schema({
    apiKey: { type: String },
    notice: { type: Boolean, default: false },
    validata: { type: Boolean, default: true },
    wxCompanyId: { type: String },
    wxAppId: { type: String },
    wxSecret: { type: String },
    maxRunNum: { type: Number, default: 70 },
    complateNum: { type: Number, default: 0 },
    scheduledRestart: { type: Number, default: 0 }, // 单位小时，为 0 时不自动重启
  });
  return mongoose.model('BotConfigModel', botConfigSchema, 'botConfig');
};
