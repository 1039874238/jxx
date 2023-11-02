'use strict';
module.exports = app => {
    const { mongoose } = app;
    const { Schema } = mongoose;
    const botBrowserSchema = new Schema({
        // 姓名
        botName: { type: String },
        key: { type: String },
        path: { type: String },
        model: { type: String, default: 'new' },
        runTime: { type: String },
        status: { type: String, default: '0' }, // 0 未开始 1 进行中 
    });
    return mongoose.model('BotBrowserModel', botBrowserSchema, 'botBrowsers');
};
