import {
  MysqlConfig
} from './config'
import Sequelize from 'sequelize'
// 创建数据库连接池
let DbPool = (app) => {
  let config = MysqlConfig(app)
  let SeqExample = new Sequelize(config.database, config.username, config.password, {
      host: config.host,
      port: config.port,
      dialect: 'mysql',
      pool: {
        max: 5,
        min: 0,
        idle: 30000,
        acquire: 30000
      }
  })
  return {
    SeqExample,
    Sequelize
  }
}

export {
  DbPool
}
