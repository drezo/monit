const Koa = require('koa');
const bugsnag = require('bugsnag');
const logger = require('koa-logger');
const koaBody = require('koa-body');
const Bot = require('./bot');

const app = new Koa();

const isProduction = process.env.NODE_ENV === 'production';

if (isProduction) {
  app.proxy = true; // eg header 'X-Forwarded-Host'

  if (process.env.BUGSNAG_KEY) {
    bugsnag.register(process.env.BUGSNAG_KEY, {
      filters: ['authorization']
    });
    app.on('error', bugsnag.koaHandler);
  }
}

app.use(logger());
app.use(koaBody());

app.use(
  (ctx, next) =>
    ctx.method === 'POST' || ctx.url === '/sc'
      ? Bot.handleUpdate(ctx.request.body, ctx.response)
      : next()
);

module.exports = app;
