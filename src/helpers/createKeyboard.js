const { Markup } = require('telegraf');

const buttons = button =>
  Markup.keyboard([...button])
    .oneTime()
    .resize()
    .extra();

module.exports = {
  buttons
};
