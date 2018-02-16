import {
  GetComments,
  UpdateComments
} from '../../../controller/app/demo/comment'
let GetCommentsFn = {
  type: 'GET',
  url: '/v1/getComments/:itemId',
  callback: async (ctx, next) => {
    await GetComments(ctx, next)
  }
}
let UpdateCommentsFn = {
  type: 'POST',
  url: '/v1/updateComments',
  callback: async (ctx, next) => {
    await UpdateComments(ctx, next)
  }
}
export {
  GetCommentsFn,
  UpdateCommentsFn
}
