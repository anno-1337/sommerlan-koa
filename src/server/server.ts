import * as koa from 'koa';
import * as serve from 'koa-static';
import * as webpack from 'webpack';
import * as config from '../../webpack.config.js';
import * as devMiddleware from 'koa-webpack-dev-middleware';
import * as hotMiddleware from 'koa-webpack-hot-middleware';
import Database from './database';

const app = new koa();

const database = new Database();

const compiler: object = webpack(config);

app.use(
    devMiddleware(compiler, {
        stats: {
            colors: true,
        },
        publicPath: config.output.publicPath,
    })
);

var a;
a = 2;

app.use(ctx => {
    ctx.set('Cache-Control', 'no-store, no-cache, must-revalidate');
    ctx.set('Pragma', 'no-cache');
    ctx.set('Expires', '0');
});

app.use(hotMiddleware(compiler));

app.use(serve('./dist'));

app.use(serve('./public'));

app.use(ctx => {
    if ((ctx.path = '/gamelist')) {
        database.refreshList();
        ctx.body = database.getList();
    }
});

app.listen(4000);
