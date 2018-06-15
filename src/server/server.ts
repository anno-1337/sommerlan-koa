import * as Koa from 'koa';
import * as serve from 'koa-static';
import * as config from '../../webpack.config.js';
import * as koaWebpack from 'koa-webpack';

const app = new Koa();
const index: string =
    '<html><head><link rel="stylesheet" type="text/css" href="main.css"></head><body><div id="main">Das it mang</div><script src="bundle.js"></script></body></html>';

koaWebpack({ config }).then(middleware => {
    app.use(middleware);
});

app.use(serve('./dist'));

app.use(serve('./public'));

app.use(async ctx => {
    if (ctx.path === '/') {
        ctx.body = index;
    }
});

app.listen(4000);
console.log('Now listening on localhost:4000...');
