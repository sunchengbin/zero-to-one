import {MysqlConfig} from './config'
import Sequelize from 'sequelize'
// 创建数据库连接池
let SeqExample = new Sequelize(MysqlConfig.database, MysqlConfig.username, MysqlConfig.password, {
    host: MysqlConfig.host,
    port: MysqlConfig.port,
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      idle: 30000,
      acquire: 30000
    }
})
export {
  SeqExample
}
