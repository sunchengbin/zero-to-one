const ParseBody = (ctx, res, code, msg) => {
  // ctx.logger.info(`${ctx.request.url} End Time ${Date.now()}`)
  return {
    status: {
      status_code: code || 0,
      status_reason : msg || ''
    },
    result: res
  }
}
export {
  ParseBody
}
