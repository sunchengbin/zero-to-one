import {
  TableInfo
} from './model-table-info'
const CreateTableModel = (opts) => {
  // opts = {
  //   ctx: ,中间件上下文
  //   db: ,数据库连接池
  //   tableName: ,数据库中的表名
  //   tableInfoKey: 用于获取tableInfo
  // }
  let timestamps = opts.timestamps ? true : false
  const Questions = opts.db.define(opts.tableInfoKey, TableInfo(opts.ctx)[opts.tableInfoKey],
  {
    'timestamps': timestamps,
    'freezeTableName': true,
    'tableName': opts.tableName
  })
  return Questions
}
export {
  CreateTableModel
}
