'use strict';
module.exports = app => {
    const { mongoose } = app;
    const { Schema } = mongoose;
    const botLogSchema = new Schema({
        type: { type: String },
        content: { type: String },
        logTime: { type: String }
    });
    return mongoose.model('BotLogModel', botLogSchema, 'botLog');
};
