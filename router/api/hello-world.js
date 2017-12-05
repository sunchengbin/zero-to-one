import {
  HelloWorld
} from '../../controller/app/hello-world'
let Hello = {
  type: 'GET',
  url: '/v1/hello/:name',
  callback: async (ctx, next) => {
    await HelloWorld(ctx, next)
  }
}
export {
  Hello
}
