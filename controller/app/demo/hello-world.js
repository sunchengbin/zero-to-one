import {
  ParseBody
} from '../../libs/response'
let HelloWorld = async (ctx, next) => {
  try {
    let name = ctx.params.name
    ctx.response.body = ctx.parseBody(ctx, 'hello world:' + name)
  } catch (err) {
    console.log(err);
  }

}
export {
  HelloWorld
}
