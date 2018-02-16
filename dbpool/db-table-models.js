import {
  CreateTableModel
} from './model'
let GetDbTableModels = {
  filterSkuQuestionsModel: async (ctx, where) => {
    let result = []
    let questions = await CreateTableModel({
      ctx: ctx, //中间件上下文
      db: ctx.sizerdb, //数据库连接池
      tableName: 'questions',//数据库中的表名
      tableInfoKey: 'filterSkuQuestions'//用于获取tableInfo
    }).findAll(where)
    questions.forEach((qus, i) => {
      result.push(qus.dataValues)
    })
    return result
  },
  ambassadorActionsModel: (ctx) => {
    return CreateTableModel({
      ctx: ctx, //中间件上下文
      db: ctx.ambassadordb, //数据库连接池
      tableName: 'ambassador_actions',//数据库中的表名
      tableInfoKey: 'ambassadorActions'//用于获取tableInfo
    })
  },
  ambassadorUsersModel: (ctx) => {
    return CreateTableModel({
      ctx: ctx, //中间件上下文
      db: ctx.ambassadordb, //数据库连接池
      tableName: 'ambassador_users',//数据库中的表名
      tableInfoKey: 'ambassadorUsers'//用于获取tableInfo
    })
  },
  ambassadorInviteeUsersModel: (ctx) => {
    return CreateTableModel({
      ctx: ctx, //中间件上下文
      db: ctx.ambassadordb, //数据库连接池
      tableName: 'ambassador_invitee_users',//数据库中的表名
      tableInfoKey: 'ambassadorInviteeUsers'//用于获取tableInfo
    })
  }
}
export {
  GetDbTableModels
}
