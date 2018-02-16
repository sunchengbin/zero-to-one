import Koa from 'koa'
import {
  KoaRouterApp
} from './router/index'
import {
  DbPool
} from './dbpool/connect'
import {
  DataBaseQuery
} from './dbpool/query'
import {
  BaseMiddleware
} from './controller/middleware/base-middleware'
import {
  ParseBody
} from './controller/libs/response'
import {
  GetDbTableModels
} from './dbpool/db-table-models'
import BodyParser from 'koa-bodyparser'
import {
  DefenseXss
} from './controller/libs/defense-xss'
const Log4js = require('log4js')
import Cors from 'koa2-cors'
const App = new Koa()
const KoaStatic = require('koa-static')
const KoaHelmet = require("koa-helmet")
import {
  Util
} from './controller/libs/util'

// 设置环境变量，用于数据库连接
let ENV = process.argv.splice(2, 1)[0] || 'development'
App.env = global.env = ENV
App.context.env = App.env
// 在ctx上添加数据库的引用
const envDb = DbPool(App)
// 默认数据库
App.context.db = envDb.SeqExample
// 筛选器数据库
App.context.sizerdb = envDb.SeqSizerExample
// 评估数据库包含产品信息
App.context.evaluationdb = envDb.SeqEvaluationExample
// 推广达人
App.context.ambassadordb = envDb.SeqAmbassadorExample
// 答题活动
App.context.quizdb = global.quizdb = envDb.SeqQuizExample
// sequelize对象
App.context.sequelize = global.sequelize = envDb.Sequelize
// 统一的数据库query方法
App.context.sequelizeQueryFn = global.sequelizeQueryFn = DataBaseQuery(envDb.Sequelize).dataBaseQuery
// response结果格式化方法
App.context.parseBody = ParseBody
// 初始化所有table的model
App.context.getDbTableModels = GetDbTableModels
// 添加全局预防xss攻击的过滤方法
App.context.defenseXss = DefenseXss
// 设置请求超时时间监控

// 添加打印日志
Log4js.configure({
  appenders: {
    console: {type: 'stdout'},
    app: {type: 'dateFile', filename: `./log/app.log`},
    err: {type: 'dateFile', filename: `./log/err.log`},
    debug: {type: 'dateFile', filename: `./log/debug.log`}
  },
  categories: {
    default: {
      appenders: ['app'], level: 'all'
    },
    err: {
      appenders: ['console', 'err'], level: 'error'
    },
    debug: {
      appenders: ['console', 'debug'], level: 'debug'
    }
  }
})

// 全局log存放请求log信息
let Logger = Log4js.getLogger('app')
// 错误级别的log
let ErrLogger = Log4js.getLogger('err')
// debug调试级别的log
let DebugLogger = Log4js.getLogger('debug')
// 添加logger到context,如果有需要方便路由层中使用
App.context.logger = Logger
App.context.errorLogger = ErrLogger
App.context.debugLogger = DebugLogger

// 日志使用方法
// Logger.info(全部日志)
// ErrLogger.error(`err.log info`) 错误日志
// LoggerDebug.debug(`debug.log info`) 调试日志

// 跨域设置
App.use(Cors({
  origin: function (ctx) {
    let origin = ctx.request.header.origin
    if (ENV === 'online') {
      // 设置支持多域名跨域
      if (/fangxin.com/g.test(origin)) {
        return origin
      } else {
        return false
      }
    } else {
      return '*'
    }
  },
  credentials: true, //客户端没有credentials则跨域cookie不传递
  maxAge: 86400
}))

// 常见9种安全隐患防御
App.use(KoaHelmet())

// 设置请求超时时间限制
// App.context.timeout = 2000
// App.use(KoaTimeout)

// 请求速度和次数限制，预防洪水攻击
// todo

// 处理错误中间件
App.use(BaseMiddleware)

// post请求等body解析
App.use(BodyParser({
  onerror: function (err, ctx) {
    ErrLogger.error(`body parse error`)
    ctx.throw('body parse error', 422);
  }
}))

//请求参数解析统一
App.use(async function (ctx, next) {
  let resUrl = decodeURIComponent(ctx.request.url)
  let urlParam = Util.getParamByUrl(resUrl);
  let param = urlParam.param || ctx.request.body.param;
  if (param) {
    try {
      ctx.param = JSON.parse(param);
    } catch (e) {
      ctx.param = {};
    }
  } else {
    ctx.param = Object.assign(urlParam, ctx.request.body)
  }
  await next()
})
// 用于获取cookie
// App.use(async function (ctx, next) {
//   let cookie = ctx.cookies.request.headers.cookie;
//   if (cookie) {
//     let cookieArr = cookie.split(';');
//     let cookies = {};
//     cookieArr.forEach(item => {
//       let kv = item.split('=');
//       if (kv.length == 2) {
//         cookies[kv[0].trim()] = kv[1].trim();
//       }
//     });
//     global.cookies = cookies;
//   }
//   await next()
// })

// 请求设置 这里可以优先过滤
App.use(async (ctx, next) => {
  Logger.info(`Process ${JSON.stringify(ctx)}`)
  Logger.info(`${ctx.request.url} Start Time ${Date.now()}`)
  await next()
})

// 静态资源路由录入
App.use(KoaStatic(`${__dirname}/router/page`))

// 接口路由注入
App.use(KoaRouterApp.routes())

// error 事件的监听
App.on('error', (err, ctx) => {
  ErrLogger.error(`server error: ${err}. Context is ${JSON.stringify(ctx)}.`)
  console.log('server error', err)
})

// 启动服务
// 配置支持https
// 本地测试https
// if (App.env === 'online') {
//   const options = {
//     key: fs.readFileSync('./ssl/server.key'),  //ssl文件路径
//     cert: fs.readFileSync('./ssl/server.pem')  //ssl文件路径
//   }
//   http.createServer(App.callback()).listen(8080)
//   https.createServer(options, App.callback()).listen(443)
// } else {
//   App.listen(8080)
// }

// 线上https，通过负载均衡服务器，直接指向本服务的http:8080端口

// 其他
switch (ENV) {
  case 'online':
    App.listen(8080)
    Logger.info('koa server is starting, the link is http://api.zerotoone.com')
    break
  case 'preview':
    App.listen(8088)
    Logger.info('koa server is starting, the link is http://api.zerotoone.com')
    break
  default:
    App.listen(8080)
    Logger.info('koa server is starting, the link is http://api.zerotoone.com')
    break
}
