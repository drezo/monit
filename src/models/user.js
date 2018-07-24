const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  is_bot: Boolean,
  first_name: String,
  last_name: String,
  username: String,
  language_code: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);
