import {
  MysqlConfig
} from './config'
import Sequelize from 'sequelize'
// 创建数据库连接池
let CreateSeqExample = (config) => {
  return new Sequelize(config.database, config.username, config.password, {
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
}
let DbPool = (app) => {
  let config = MysqlConfig(app)
  let defaultConfig = config.default
  let sizerConfig = config.sizer
  let evaluationConfig = config.evaluation
  let ambassadorConfig = config.ambassador
  let SeqExample = CreateSeqExample(defaultConfig)
  let SeqSizerExample = CreateSeqExample(sizerConfig)
  let SeqEvaluationExample = CreateSeqExample(evaluationConfig)
  let SeqAmbassadorExample = CreateSeqExample(ambassadorConfig)
  console.log(`ambassadorConfig is ${JSON.stringify(ambassadorConfig)}`)
  let SeqQuizExample = CreateSeqExample(config.quiz)

  return {
    SeqEvaluationExample,
    SeqSizerExample,
    SeqExample,
    Sequelize,
    SeqAmbassadorExample,
    SeqQuizExample
  }
}

export {
  DbPool
}
