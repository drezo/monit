const fs = require('fs');
const path = require('path');

const basename = path.basename(__filename);

const filesDir = fs
  .readdirSync(__dirname)
  .filter(
    file =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  );

const modules = filesDir.reduce((acc, element) => {
  const nameWithoutExt = element
    .split('.')
    .slice(0, -1)
    .join('.');
  const nameModel =
    nameWithoutExt.charAt(0).toUpperCase() + nameWithoutExt.slice(1);
  // eslint-disable-next-line global-require, import/no-dynamic-require
  acc[nameModel] = require(path.resolve(__dirname, element));
  return acc;
}, {});

module.exports = modules;
