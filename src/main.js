const Spider = require("./ts/Spider.js");
const bodyParser = require('koa-bodyparser');
const Koa = require('koa');
const app = new Koa();
app.use(bodyParser());
app.use(async (ctx, next) => {
  if (ctx.request.path === '/imgSpider') {
    console.log("ctx.request.body", ctx.request.body)
    const obj = ctx.request.body;
    const spider = new Spider({
      url: obj.url,
      method: obj.method || 'get',
      headers: obj.headers || {},
      host: obj.host || "http",
      ...ctx.request.body
    })
    spider.imgSpider(obj.outPath, obj.queryClassPath,
        () => {
          ctx.response.body = '完成！';
        })
  } else {
    await next();
  }
});
app.listen(8083);
