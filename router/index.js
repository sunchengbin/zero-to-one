// 初始化后端router
import Fs from 'fs'
import KoaRouter from 'koa-router'
const KoaRouterApp = KoaRouter()
const routerFiles = Fs.readdirSync(__dirname + '/api')
const outerFilesArr = routerFiles.filter((f) => {
  return f
})
async function routerCallback(fileParam, ctx, next) {
  if (fileParam.auth) {
    // 这里可以做token验证
  }
  await fileParam.callback(ctx, next)
}
outerFilesArr.forEach((f) => {
  const files = Fs.readdirSync(`${__dirname}/api/${f}/`)
  const filesArr = files.filter((files) => {
    return files.endsWith('.js')
  })
  console.log(`${f}:${JSON.stringify(filesArr)}`)
  filesArr.forEach((fs) => {
    console.log(`process controller: ${fs}...`)
    // 导入js文件:
    let file = require(`${__dirname}/api/${f}/${fs}`)
    for (let param in file) {
      let fileParam = file[param]
      let type = fileParam.type
      switch (type) {
        case 'GET':
          KoaRouterApp.get(fileParam.url, async (ctx, next) => {
            await routerCallback(fileParam, ctx, next);
          })
          break
        case 'POST':
          KoaRouterApp.post(fileParam.url, async (ctx, next) => {
            await routerCallback(fileParam, ctx, next);
          })
          break
        case 'PUT':
          KoaRouterApp.put(fileParam.url, async (ctx, next) => {
            await routerCallback(fileParam, ctx, next);
          })
          break
        case 'DELETE':
          KoaRouterApp.del(fileParam.url, async (ctx, next) => {
            await routerCallback(fileParam, ctx, next);
          })
          break
        // case 'QUERY':
        //   KoaRouterApp.get('queryTypeUrl', fileParam.url, fileParam.callback)
        //   KoaRouterApp.url('queryTypeUrl', { id: 3 }, { query: fileParam.query });
        //   break
        default:
          KoaRouterApp.all(fileParam.url, fileParam.callback)
          break
      }
    }
  })
})
export {
  KoaRouterApp
}
