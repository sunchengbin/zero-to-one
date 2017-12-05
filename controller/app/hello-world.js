import {
  ParseBody
} from '../libs/response'
let HelloWorld = async (ctx, next) => {
  let name = ctx.params.name
  let res = await ctx.db.query('select answer from zhenduan_oral where id = 2', { type: ctx.sequelize.QueryTypes.SELECT }).then((results) => {
    return results
  })
  ctx.response.body = ParseBody(ctx, res)
}
export {
  HelloWorld
}
