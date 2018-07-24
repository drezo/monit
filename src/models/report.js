const mongoose = require('mongoose');

const { Schema } = mongoose;

const ReportSchema = new Schema({
  siteId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Report', ReportSchema);
