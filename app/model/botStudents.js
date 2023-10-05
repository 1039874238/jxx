'use strict';
module.exports = app => {
    const { mongoose } = app;
    const { Schema } = mongoose;
    const studentsSchema = new Schema({
        // 姓名
        account: { type: String },
        password: { type: String },
        botName: { type: String },
        browserKey: { type: String },
        startTime: { type: String },
        endTime: { type: String },
        status: { type: String, default: '0' }, // 0 未开始 1 进行中 2 已完成 3 失败
    });
    return mongoose.model('botStudentsModel', studentsSchema, 'studentsBot');
};
