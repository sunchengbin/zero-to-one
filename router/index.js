// 初始化后端router
import Fs from 'fs'
import KoaRouter from 'koa-router'
const KoaRouterApp = KoaRouter()
const routerFiles = Fs.readdirSync(__dirname + '/api')
var outerFilesArr = routerFiles.filter((f) => {
    return f.endsWith('.js')
})
outerFilesArr.forEach((f) => {
  console.log(`process controller: ${f}...`)
  // 导入js文件:
  let file = require(__dirname + '/api/' + f)
  for (let param in file) {
    let fileParam = file[param]
    let type = fileParam.type
    switch (type) {
      case 'GET':
        KoaRouterApp.get(fileParam.url, fileParam.callback)
        break
      case 'POST':
        KoaRouterApp.post(fileParam.url, fileParam.callback)
        break
      case 'PUT':
        KoaRouterApp.put(fileParam.url, fileParam.callback)
        break
      case 'DELETE':
        KoaRouterApp.del(fileParam.url, fileParam.callback)
        break
      default:
        KoaRouterApp.all(fileParam.url, fileParam.callback)
        break
    }
  }
})
export {
  KoaRouterApp
}
