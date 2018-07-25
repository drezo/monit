const TelegrafI18n = require('telegraf-i18n');
const { join } = require('path');

const i18n = new TelegrafI18n({
  defaultLanguage: 'en',
  directory: join(__dirname, '../locales')
});

module.exports = i18n;
