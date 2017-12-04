import Koa from 'koa'
import {
  KoaRouterApp
} from './router/index'
import {
  SeqExample,
  Sequelize
} from './dbpool/connect'
import {
  BaseMiddleware
} from './controller/middleware/base-middleware'
const Log4js = require('log4js')
import Cors from 'koa2-cors'
const App = new Koa()

// 在ctx上添加数据库的引用
App.context.db = SeqExample
App.context.sequelize = Sequelize

// 添加打印日志
Log4js.configure({
  appenders: {
    app: { type: 'dateFile', filename: `./log/app.log`}
  },
  categories: {
    default: {
      appenders: [ 'app'], level: 'all'
    }
  }
});
var Logger = Log4js.getLogger('app')
// 添加logger到context,如果有需要方便路由层中使用
App.context.logger = Logger

// 跨域设置
App.use(Cors({
  origin: function(ctx) {
    return '*'
  },
  maxAge: 86400
}))

// 处理错误中间件
App.use(BaseMiddleware)

// 请求设置
App.use(async (ctx, next) => {
  // ctx.throw(500)
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`)
  Logger.info(`Process ${ctx.request.method} ${ctx.request.url}...`)
  await next()
})

// 路由注入
App.use(KoaRouterApp.routes())

// error 事件的监听
App.on('error', (err, ctx) => {
  Logger.info(`server error: ${err}. Context is ${JSON.stringify(ctx)}.`)
  // console.log('server error', err)
})

// 启动服务
App.listen(2000)
console.log('koa server is starting, the link is http://api.zerotoone.com')
