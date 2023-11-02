'use strict';
module.exports = app => {
    const { mongoose } = app;
    const { Schema } = mongoose;
    const botLogSchema = new Schema({
        type: { type: String },// 1:setComplateNum;2:checkBrowser;3:sendDayLog
        content: { type: String },
        logTime: { type: String }
    });
    return mongoose.model('BotLogModel', botLogSchema, 'botLog');
};
