const devConfig = {
  default: {
    database: 'test', //数据库
    username: 'root', //用户名
    password: 'fangxinxuan', //口令
    host: 'localhost', //主机名
    port: 3306 //端口号
  },
  sizer: {
    database: 'filter_sku', //数据库
    username: 'root', //用户名
    password: 'fangxinxuan', //口令
    host: 'localhost', //主机名
    port: 3306 //端口号
  },
  evaluation: {
    database: 'evaluation_pro', //数据库
    username: 'root', //用户名
    password: 'fangxinxuan', //口令
    host: 'localhost', //主机名
    port: 3306 //端口号
  },
  // 推广大使
  ambassador: {
    database: 'test', //数据库
    username: 'root', //用户名
    password: 'fangxinxuan', //口令
    host: 'localhost', //主机名
    port: 3306 //端口号
  },
  // 答题活动
  quiz: {
    database: 'quiz', //数据库
    username: 'root', //用户名
    password: 'fangxinxuan', //口令
    host: 'localhost', //主机名
    port: 3306 //端口号
  }
}
const preConfig = {
  default: {
    database: 'test', //数据库
    username: 'root', //用户名
    password: 'fangxinxuan', //口令
    host: 'localhost', //主机名
    port: 3306 //端口号
  },
  sizer: {
    database: 'filter_sku', //数据库
    username: 'root', //用户名
    password: 'fangxinxuan', //口令
    host: 'localhost', //主机名
    port: 3306 //端口号
  },
  evaluation: {
    database: 'evaluation_pro', //数据库
    username: 'root', //用户名
    password: 'fangxinxuan', //口令
    host: 'localhost', //主机名
    port: 3306 //端口号
  },
  // 推广大使
  ambassador: {
    database: 'test', //数据库
    username: 'root', //用户名
    password: 'fangxinxuan', //口令
    host: 'localhost', //主机名
    port: 3306 //端口号
  },
  // 答题活动
  quiz: {
    database: 'quiz', //数据库
    username: 'root', //用户名
    password: 'fangxinxuan', //口令
    host: 'localhost', //主机名
    port: 3306 //端口号
  }
}
const onlineConfig = {
  default: {
    database: 'test', //数据库
    username: 'root', //用户名
    password: 'fangxinxuan', //口令
    host: 'localhost', //主机名
    port: 3306 //端口号
  },
  sizer: {
    database: 'filter_sku', //数据库
    username: 'root', //用户名
    password: 'fangxinxuan', //口令
    host: 'localhost', //主机名
    port: 3306 //端口号
  },
  evaluation: {
    database: 'evaluation_pro', //数据库
    username: 'root', //用户名
    password: 'fangxinxuan', //口令
    host: 'localhost', //主机名
    port: 3306 //端口号
  },
  // 推广大使
  ambassador: {
    database: 'test', //数据库
    username: 'root', //用户名
    password: 'fangxinxuan', //口令
    host: 'localhost', //主机名
    port: 3306 //端口号
  },
  // 答题活动
  quiz: {
    database: 'quiz', //数据库
    username: 'root', //用户名
    password: 'fangxinxuan', //口令
    host: 'localhost', //主机名
    port: 3306 //端口号
  }
}
let MysqlConfig = (app) => {
  let config = devConfig
  console.log(`app.env is ${app.env}`)
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
