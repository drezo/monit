const Telegraf = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

const { WEBHOOK_URL, WEBHOOK_PREFIX } = process.env;

bot.telegram.setWebhook(`${WEBHOOK_URL}/${WEBHOOK_PREFIX}`);

bot.start(ctx => ctx.reply('Hello!'));

bot.on('text', ctx => ctx.reply('Command not found :('));

module.exports = bot;
