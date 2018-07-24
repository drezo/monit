const mongoose = require('mongoose');

const development = !(process.env.NODE_ENV === 'production');

mongoose.Promise = Promise;
mongoose.set('debug', development);

module.exports = mongoose;
