import {SeqExample} from '../../dbpool/connect'
import Sequelize from 'sequelize'
let Hello = {
  type: 'GET',
  url: '/v1/hello/:name',
  callback: async (ctx, next) => {
    let name = ctx.params.name
    let res = await SeqExample.query('select * from zhenduan_oral where id = 2', { type: Sequelize.QueryTypes.SELECT }).spread((results) => {
      return results
    })
    ctx.response.body = `<h1>Hello, ${name},获取到数据如下: ${JSON.stringify(res)}!</h1>`
  }
}
export {
  Hello
}
