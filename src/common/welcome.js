const { User } = require('../models');
const { createKeyboard } = require('../helpers');

module.exports = async ctx => {
  const {
    i18n,
    reply,
    from: { id, ...data }
  } = ctx;
  await User.update({ id }, { $set: { ...data } }, { upsert: true });
  reply('Choose Language:', createKeyboard.buttons([i18n.t('buttons.en')]));
};
