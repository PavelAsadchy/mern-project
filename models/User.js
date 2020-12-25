const { Schema, model, Types } = require('mongoose');

// Setting user schema
const schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  links: [
    {
      type: Types.ObjectId,
      ref: 'Link',
    }
  ],
});

// Exporting model (name, working schema)
module.exports = model('User', schema);