export default [{
    name: '业务管理',
    icon: 'icon-yewu',
    children: [{
        name: '现货求购管理',
        router: {
          name: 'ironBuys'
        }
      },
      {
        name: '代客发布求购',
        router: {
          name: 'valetIron'
        }
      }
    ]
  }, {
    name: '订单管理',
    icon: 'icon-dingdan',
    children: [{
      name: '订单管理',
      router: {
        name: 'order'
      }
    }]
  },
  {
    name: '营销',
    icon: 'icon-weixinyingxiaohuodong',
    children: [{
      name: '网站首页广告位',
      router: {
        name: 'adManage'
      }
    }]
  },
  {
    name: '权限',
    icon: 'icon-moban',
    children: [{
      name: '角色配置',
      router: {
        name: 'jurisdiction'
      }
    }]
  },
  {
    name: '接口',
    icon: 'icon-jiekou',
    children: [{
      name: '接口管理',
      router: {
        name: 'interface'
      }
    }]
  },
  {
    name: '用户管理',
    icon: 'icon-yonhu',
    children: [{
      name: '角色绑定',
      router: {
        name: 'role'
      }
    }, {
      name: '商家求购等级',
      router: {
        name: 'grade'
      }
    }, {
      name: '商家用户管理',
      router: {
        name: 'businessUser'
      }
    }, {
      name: '平台专员管理',
      router: {
        name: 'salesMan'
      }
    }]
  },
  {
    name: '应用',
    icon: 'icon-app',
    children: [{
        name: '计量单位配置',
        router: {
          name: 'appUnit'
        }
      }, {
        name: '分类数据配置',
        router: {
          name: 'appData'
        }
      }, {
        name: '关联配置管理',
        router: {
          name: 'appRelation'
        }
      },
      {
        name: '卖家基础信息管理',
        router: {
          name: 'appSellerInfo'
        }
      }
    ]
  }, {
    name: '新闻管理',
    icon: 'icon-xinwen',
    children: [{
      name: '新建新闻内容',
      router: {
        name: 'nadd',
        params: {
          id: 0,
          type: 'add'
        }
      }
    }, {
      name: '新闻内容管理',
      router: {
        name: 'nlist'
      }
    }, {
      name: '新闻中心配置',
      router: {
        name: 'nconfig'
      }
    }]
  }, {
    name: '数据统计',
    icon: 'icon-iconset0358',
    children: [{
      name: '交易数据汇总',
      router: {
        name: 'countTransaction'
      }
    }, {
      name: '买方排行分析',
      router: {
        name: 'countBuyer'
      }
    }, {
      name: '卖方排行分析',
      router: {
        name: 'countSeller'
      }
    }, {
      name: '热门地区分析',
      router: {
        name: 'countArea'
      }
    }, {
      name: '货品数据分析',
      router: {
        name: 'countGoods'
      }
    },
    // {
    //   name: '订单数据统计分析',
    //   router: {
    //     name: 'countOrder'
    //   }
    // }
  ]
  },
  {
    name: '系统配置',
    icon: 'icon-xitong',
    children: [{
      name: '求购报价配置',
      router: {
        name: 'buyOffer'
      }
    }, {
      name: '数据字典',
      router: {
        name: 'dictionary'
      }
    }, {
      name: '商家保证金配置',
      router: {
        name: 'deposit'
      }
    }]
  }
]
