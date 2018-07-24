const debug = require('debug')('monit:index');

const { promisify } = require('util');
const { Server, Mongo, Bot } = require('./bin');

const serverListen = promisify(Server.listen.bind(Server));
const mongoListen = promisify(Mongo.connect.bind(Mongo));

const production = !(process.env.NODE_ENV === 'production');

const { SERVER_PORT, MONGO_URI } = process.env;

(async () => {
  try {
    const [, , bot] = await Promise.all([
      mongoListen(MONGO_URI, { useNewUrlParser: true }),
      serverListen(SERVER_PORT),
      Bot.telegram.getMe()
    ]);

    const { address, port } = Server.address();

    const {
      options: { debug: MongoDebug }
    } = Mongo;

    const { username, first_name: firstName } = bot;

    // eslint-disable-next-line no-console
    console.log(`Server: ${address}:${port}, development: ${production}`);

    // eslint-disable-next-line no-console
    console.log(`Database: ${process.env.MONGO_URI}, debugging: ${MongoDebug}`);

    // eslint-disable-next-line no-console
    console.log(`Bot @${username} (name: ${firstName}) is running`);

    debug(`Server ${address}:${port}`);
    debug(`Database ${MONGO_URI}, debug: ${MongoDebug}`);
    debug(`Telegram Bot: username: @${username}, name: ${firstName})`);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('Error happened during server start', err);
    process.exit(1);
  }
})();
