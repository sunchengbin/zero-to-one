// 数据库query操作提炼，解决了sql注入问题，待完善增删改查相关操作
class DataBaseQueryClass {
    constructor(sequelize) {
        this.sequelize = sequelize
    }

    async dataBaseQuery(opts) {
        // opts = {
        //   db: ctx.sizerdb, //db数据库连接对象
        //   sql: 'select * from',// mysql查询语句
        //   bind: {}, // 防注入拼sql方式
        //   type: 'get' // 查询类型
        // }
        let result = []
        let db = opts.db
        let sql = opts.sql
        let bind = opts.bind
        let type = opts.type
        let sequelize = this.sequelize
        let queryParam = {
            type: sequelize.QueryTypes.SELECT
        }
        if (bind) {
            queryParam.bind = bind
        }
        switch (type) {
            case 'get':
                queryParam.type = sequelize.QueryTypes.SELECT
                break
            case 'delete':
                queryParam.type = sequelize.QueryTypes.DELETE
                break
            case 'insert':
                queryParam.type = sequelize.QueryTypes.INSERT
                break
            case 'update':
                queryParam.type = sequelize.QueryTypes.UPDATE
                queryParam.useMaster = true
                break
            // 需要跟据实际情况添加不同的queryTypes类型
            default:
                queryParam.type = sequelize.QueryTypes.SELECT
                break
        }
        return await db.query(sql, queryParam)
    }
}

let DataBaseQuery = (sequelize) => {
    return new DataBaseQueryClass(sequelize)
}
export {
    DataBaseQuery
}
