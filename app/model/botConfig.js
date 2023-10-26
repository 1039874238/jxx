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
  });
  return mongoose.model('BotConfigModel', botConfigSchema, 'botConfig');
};
