let Hello = {
  type: 'GET',
  url: '/v1/hello/:name',
  callback: async (ctx, next) => {
    let name = ctx.params.name
    ctx.response.body = `<h1>Hello, ${name}!</h1>`
  }
}
export {
  Hello
}
