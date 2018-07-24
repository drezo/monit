const mongoose = require('mongoose');

const { Schema } = mongoose;

const ReportSchema = new Schema({
  siteId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  http: {
    type: Number,
    required: true
  },
  message: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Report', ReportSchema);
