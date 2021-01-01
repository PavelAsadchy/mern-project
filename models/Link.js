const { Schema, model, Types } = require('mongoose');
const User = require('./User');

// Setting user schema
const schema = new Schema({
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
    unique: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  clicks: {
    type: Number,
    default: 0,
  },
  owner: {
    type: Types.ObjectId,
    ref: User, // referense to User.js model name //
  },
});

// Exporting model (name, working schema)
module.exports = model('Link', schema);