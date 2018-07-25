const Telegraf = require('telegraf');
const i18n = require('../lib/i18n');
const { welcome } = require('../common');

const bot = new Telegraf(process.env.BOT_TOKEN);

const { WEBHOOK_URL, WEBHOOK_PREFIX } = process.env;

bot.telegram.setWebhook(`${WEBHOOK_URL}/${WEBHOOK_PREFIX}`);

bot.use(i18n);

bot.start(welcome);

bot.on('text', ctx => ctx.reply('Command not found :('));

module.exports = bot;
