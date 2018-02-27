export default [{
        name: '业务管理',
        icon: 'icon-yewu',
        children: [{
                name: '现货求购管理',
                router: { name: 'ironBuys' }
            },
            {
                name: '代客发布求购',
                router: { name: 'valetIron' }
            }
        ]
    },{
        name: '订单管理',
        icon: 'icon-dingdan',
        children: [{
            name: '订单管理',
            router: {name: 'order'}
        }]
    },{
        name: '物流管理',
        icon: 'icon-wuliu',
        children:[{
            name: '物流需求管理',
            router: {name: 'logGoods'}
        },{
            name: '物流数据配置',
            router: {name: 'logData'}
        },{
            name: '物流货品维护',
            router: {name: 'logDemand'}
        }]
    },
    {
        name: '营销',
        icon: 'icon-weixinyingxiaohuodong',
        children: [{
            name: '网站首页广告位',
            router: { name: 'adManage' }
        }]
    },
    {
        name: '权限',
        icon: 'icon-moban',
        children: [{
            name: '角色配置',
            router: { name: 'jurisdiction' }
        }]
    },
    {
        name: '接口',
        icon: 'icon-jiekou',
        children: [{
            name: '接口管理',
            router: { name: 'interface' }
        }]
    },
    {
        name: '用户管理',
        icon: 'icon-yonhu',
        children: [{
            name: '角色绑定',
            router: { name: 'userManagement' }
        },{
            name: '商家求购等级',
            router: {name: 'businessGrade'}
        },{
            name: '商家用户管理',
            router: { name: 'businessManagement' }
        },{
            name: '平台专员管理',
            router: {name: 'commissioner'}
        }]
    },
    {
        name: '应用',
        icon: 'icon-app',
        children: [{
                name: '计量单位配置',
                router: { name: 'unitManagement' }
            }, {
                name: '分类数据配置',
                router: { name: 'dataManagement' }
            }, {
                name: '关联配置管理',
                router: { name: 'relationManagement' }
            },
            {
                name: '卖家基础信息管理',
                router: { name: 'sellerBaseManagement' }
            }
        ]
    },{
        name: '新闻管理',
        icon: 'icon-xinwen',
        children: [{
            name: '新建新闻内容',
            router: {name:'nadd', params: { id: 0,type: 'add' }}
        },{
            name:'新闻内容管理',
            router: {name: 'nlist'}
        },{
            name:'新闻中心配置',
            router: {name: 'nconfig'}
        }]
    },{
        name: '数据统计',
        icon: 'icon-iconset0358',
        children: [{
            name: '交易数据汇总',
            router: { name: 'dataAggregation' }
        }, {
            name: '买方排行分析',
            router: { name: 'buyerRank' }
        }, {
            name: '卖方排行分析',
            router: { name: 'sellerRank' }
        }, {
            name: '热门地区分析',
            router: { name: 'regionalRank' }
        }, {
            name: '货品数据分析',
            router: { name: 'ironsRank' }
        },{
            name: '订单数据统计分析',
            router: {name: 'orderCountManagement'}
        }]
    },
    {
        name: '系统配置',
        icon: 'icon-xitong',
        children:[{
            name: '买家求购等级',
            router: {name: 'grade'}
        },{
            name: '参数配置',
            router: {name: 'parameter'}
        },{
            name: '数据字典',
            router: {name: 'dictionary'}
        }]
    }
]