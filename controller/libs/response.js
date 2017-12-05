const ParseBody = (ctx, res, code) => {
  return {
    code: code || 200,
    data: res
  }
}
export {
  ParseBody
}
