// sql防注入添加验证条件方法 https://itbilu.com/nodejs/npm/V1PExztfb.html#definition-validations
let TableInfo = (ctx) => {
  let TableInfoJson = {
    // filter_sku库下的questions表的table_info
    filterSkuQuestions: {
      id: {
        type: ctx.sequelize.BIGINT(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        validate: {
          isInt: true
        }
      },
      category_id: {
        type: ctx.sequelize.CHAR(32),
        allowNull: false,
        comment: '所属品类ID',
        field: 'category_id'
      },
      unique_id: {
        type: ctx.sequelize.CHAR(32),
        allowNull: true,
        defaultValue: null,
        unique: true,
        comment: '唯一ID',
        field: 'unique_id'
      },
      type: {
        type: ctx.sequelize.TINYINT(3),
        allowNull: false,
        defaultValue: '01',
        field: 'type'
      },
      name: {
        type: ctx.sequelize.TEXT,
        allowNull: false,
        field: 'name'
      },
      location: {
        type: ctx.sequelize.TINYINT(3),
        allowNull: false,
        defaultValue: '001',
        comment: '问题的排序，0为第一个问'
      },
      filter_operator: {
        type: ctx.sequelize.TEXT,
        defaultValue: null,
        comment: '问题级别的过滤，优先级最高，无则使用回答中的过滤条件',
        field: 'filter_operator'
      },
      filter_property: {
        type: ctx.sequelize.CHAR(32),
        defaultValue: null,
        comment: '过滤对象',
        field: 'filter_property'
      },
      note: {
        type: ctx.sequelize.TEXT,
        comment: '问题描述'
      },
      deleted: {
        type: ctx.sequelize.TINYINT(2),
        allowNull: false,
        defaultValue: '0',
      },
      create_by: {
        type: ctx.sequelize.STRING(64),
        allowNull: false,
        defaultValue: 'system',
        field: 'create_by'
      },
      update_by: {
        type: ctx.sequelize.STRING(64),
        allowNull: false,
        defaultValue: 'system',
        field: 'update_by'
      },
      create_at: {
        type: ctx.sequelize.DATE,
        allowNull: false,
        defaultValue: ctx.sequelize.NOW,
        field: 'create_at'
      },
      update_at: {
        type: ctx.sequelize.DATE,
        allowNull: false,
        defaultValue: ctx.sequelize.NOW,
        field: 'update_at'
      }
    },
    ambassadorActions: {
      id: {
        type: ctx.sequelize.BIGINT(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        validate: {
          isInt: true
        }
      },
      count: {
        type: ctx.sequelize.BIGINT(20),
        allowNull: false,
        defaultValue: 0,
        validate: {
          isInt: true
        }
      },
      action_is_end: {
        type: ctx.sequelize.BIGINT(11),
        allowNull: false,
        defaultValue: 0,
        validate: {
          isInt: true
        }
      },
      winner_ranking: {
        type: ctx.sequelize.BIGINT(11),
        allowNull: false,
        defaultValue: 5,
        validate: {
          isInt: true
        }
      },
      ambassador_count: {
        type: ctx.sequelize.BIGINT(11),
        allowNull: false,
        defaultValue: 0,
        validate: {
          isInt: true
        }
      },
      goal_up_limit: {
        type: ctx.sequelize.BIGINT(20),
        allowNull: false,
        defaultValue: 1000,
        validate: {
          isInt: true
        }
      },
      top_up_limit: {
        type: ctx.sequelize.BIGINT(20),
        allowNull: false,
        defaultValue: 5,
        validate: {
          isInt: true
        }
      }
    },
    ambassadorUsers : {
      id: {
        type: ctx.sequelize.BIGINT(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        validate: {
          isInt: true
        }
      },
      wdbid: {
        type: ctx.sequelize.CHAR(30),
        comment: '推广大使id'
      },
      action_id: {
        type: ctx.sequelize.BIGINT(11),
        defaultValue: 1
      },
      nick_name: {
        type: ctx.sequelize.CHAR(30),
        comment: '推广大使昵称'
      },
      logo_url: {
        type: ctx.sequelize.CHAR(100),
        comment: '推广大使的头像'
      },
      invite_count: {
        type: ctx.sequelize.BIGINT(11),
        defaultValue: 0
      },
      openid: {
        type: ctx.sequelize.CHAR(50)
      },
      telphone: {
        type: ctx.sequelize.BIGINT(20),
        defaultValue: 0,
        validate: {
          isInt: true
        }
      }
    },
    ambassadorInviteeUsers : {
      id: {
        type: ctx.sequelize.BIGINT(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        validate: {
          isInt: true
        }
      },
      wdbid: {
        type: ctx.sequelize.CHAR(30)
      },
      nick_name: {
        type: ctx.sequelize.CHAR(30),
        comment: '推广大使昵称'
      },
      logo_url: {
        type: ctx.sequelize.CHAR(100),
        comment: '推广大使的头像'
      },
      inviter_wdbid: {
        type: ctx.sequelize.CHAR(30),
        comment: '推广大使id'
      },
      action_id: {
        type: ctx.sequelize.BIGINT(11),
        defaultValue: 1
      },
      attentioned: {
        type: ctx.sequelize.BIGINT(10),
        comment: '是否已经关注，只有关注后才记为邀请人列表中,1是关注了0是没关注',
        defaultValue: 0
      },
      openid: {
        type: ctx.sequelize.CHAR(50)
      }
    }
  }
  return TableInfoJson
}
export {
  TableInfo
}
