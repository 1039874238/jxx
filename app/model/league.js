'use strict';
module.exports = app => {
  const { mongoose } = app;
  const { Schema } = mongoose;
  const leagueSchema = new Schema({
    startTime: {
      type: Number,
    },
    match: { type: Array },
    drgree: { type: Number, default: 0 },
    result: { type: Number, default: 0 },
  });
  return mongoose.model('leagueModel', leagueSchema, 'league');
};
