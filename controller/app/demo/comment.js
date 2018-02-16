function myTimeout(ms) {
	    return new Promise((resolve, reject) => {
	        setTimeout(resolve, ms, 'done');
	    });
	}
let GetComments = async (ctx, next) => {
  let itemId = ctx.params.itemId // '123 OR 1=1'
  let res = await ctx.db.query(`select * from comments where item_id = ${itemId}`, { type: ctx.sequelize.QueryTypes.SELECT })
  await myTimeout(3000)
  ctx.response.body = ctx.parseBody(ctx, res)
}
let UpdateComments = async (ctx, next) => {
  const Comment = ctx.db.define('comment', {
    id: {
      type: ctx.sequelize.BIGINT(11),
      primaryKey: true
    },
    comment: ctx.sequelize.TEXT,
    oneOne: {
      type: ctx.sequelize.TEXT,
      field: "one_one"
    },
    oneTwo: {
      type: ctx.sequelize.TEXT,
      field: "one_two"
    },
    twoOne: {
      type: ctx.sequelize.TEXT,
      field: "two_one"
    },
    twoTwo: {
      type: ctx.sequelize.TEXT,
      field: "two_two"
    },
    commentId: {
      type: ctx.sequelize.BIGINT(11),
      field: "comment_id",
      validate: {
        isInt: true
      }
    },
    itemId: {
      type: ctx.sequelize.BIGINT(20),
      field: "item_id",
      validate: {
        isInt: true
      }
    }
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'comments'
  })
  let resBody = ctx.request.body
  let resAdd = await Comment.create({
    comment: resBody.comment,
    oneOne: resBody.oneOne,
    oneTwo: resBody.oneTwo,
    twoOne: resBody.twoOne,
    twoTwo: resBody.twoTwo,
    commentId: resBody.commentId,
    itemId: resBody.itemId
  })
  console.log('created.' + JSON.stringify(resAdd))
  // console.log(ctx.request.body)
  ctx.response.body = ctx.parseBody(ctx, {
    comment: 'success'
  })
}
export {
  GetComments,
  UpdateComments
}
