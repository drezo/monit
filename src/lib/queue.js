const Queue = require('bull');

const uriQueue = new Queue('head');

uriQueue.process((job, done) => {
  done();
});

module.exports = {
  uriQueue
};
