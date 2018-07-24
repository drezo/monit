const debug = require('debug')('monit:index');

const { promisify } = require('util');
const { Server, Bot } = require('./bin');

const serverListen = port => promisify(Server.listen.bind(Server))(port);

const production = !(process.env.NODE_ENV === 'production');

const { SERVER_PORT } = process.env;

(async () => {
  try {
    const [, bot] = await Promise.all([
      serverListen(SERVER_PORT),
      Bot.telegram.getMe()
    ]);

    const { address, port } = Server.address();

    const { username, first_name: firstName } = bot;

    // eslint-disable-next-line no-console
    console.log(`Server: ${address}:${port}, development: ${production}`);

    // eslint-disable-next-line no-console
    console.log(`Bot @${username} (name: ${firstName}) is running`);

    debug(`Server ${address}:${port}`);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('Error happened during server start', err);
    process.exit(1);
  }
})();
