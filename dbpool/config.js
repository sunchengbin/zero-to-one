const devConfig = {
  database: 'test', //数据库
  username: 'root', //用户名
  password: 'scb001986*()', //口令
  host: 'localhost', //主机名
  port: 3306 //端口号
}
const preConfig = {
  database: 'INVO_AUS_APP', //数据库
  username: 'INVO_AUS_APP_user', //用户名
  password: 'root', //口令
  host: '10.1.101.218', //主机名
  port: 3308 //端口号
}
const onlineConfig = {
  database: 'INVO_AUS_APP', //数据库
  username: 'INVO_AUS_APP_user', //用户名
  password: 'root', //口令
  host: '10.1.101.218', //主机名
  port: 3308 //端口号
}
let MysqlConfig = (app) => {
  let config = devConfig
  console.log(app.env)
  switch (app.env) {
    case 'preview':
      config = preConfig
      break
    case 'online':
      config = onlineConfig
      break
    default:
      break
  }
  return config
}

export {
  MysqlConfig
}
