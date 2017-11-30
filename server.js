import Koa from 'koa'
import { KoaRouterApp } from './router/index'
const Cors = require('koa2-cors')
const App = new Koa()
App.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`)
  await next()
})
App.use(Cors({
  origin: function(ctx) {
    return '*'
  },
  maxAge: 86400
}))
App.use(KoaRouterApp.routes())
App.listen(2000)
console.log('koa server is starting, the link is http://api.zerotoone.com')
