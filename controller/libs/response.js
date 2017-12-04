export default class ParseBody{
  static parseBody (ctx, res) {
    let _code = err.statusCode || err.status || 500
    return {
      code: _code,
      data: res
    }
  }
}
