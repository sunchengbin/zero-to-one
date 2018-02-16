// 添加基础中间件
const BaseMiddleware = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    let _code = err.statusCode || err.status || 500
    ctx.response.status = _code
    ctx.response.body = {
      status: {
        status_code: _code,
        status_reason : err.message
      }
    }
    ctx.app.emit('error', err, ctx)
  }
  ctx.logger.info(`${ctx.request.url} End Time ${Date.now()}`)
}
export {
  BaseMiddleware
}
