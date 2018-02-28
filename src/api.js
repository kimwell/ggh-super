
export const uploadApi = 'http://192.168.0.251:8080/fileUpload/images';
// export const uploadApi = '/fileUpload/images';
// export const uploadExcelApi = 'http://192.168.0.251/sys/qualiticationmodel/uplodeQualiticationModel';
export const uploadExcelApi = '/sys/qualiticationmodel/uplodeQualiticationModel';

export const excelBaseUrl = 'http://tbxoss.oss-cn-hangzhou.aliyuncs.com/';


// WebSocket链接
export let ws = '';
if (process.env.NODE_ENV == 'development') {
    ws = 'ws://192.168.0.251/websocket'
    // ws = 'ws://111.231.134.170:8080/websocket'
} else {
    ws = 'ws://192.168.0.251/websocket'
    // ws = 'ws://120.55.63.70:8080/websocket';
    // ws = 'ws://192.168.0.251/websocket'
    // ws = 'ws://111.231.134.170:8080/websocket'
    // ws = 'ws://192.168.0.251:8080/websocket'
}
/**
 * 登录
 * path: /login/userLogin
 * method: POST
 * params: {
 *      mobile: String
 *      password: String
 * }
 */
export const login = '/login/userLogin';

/**
 * 获取用户信息
 */
export const getUser = '/api/user/findCurrentUser';

/**
 * 地址选择省，市，区
 */
export const findAdress = ''

export const findProvince = '/api/query/findProvince'

export const findCity = '/api/query/findCity'

export const findArea = '/api/query/findArea'

// ---------------------------------数据字典-------------------------------

/**
 * 分页查询数据字典
 * 
 */

export const findDataDictionaryPage = '/sys/dataDictionary/findDataDictionaryPage'


/**
 * 分页查询数据字典
 * 
 */

export const deleteDataDictionary = '/sys/dataDictionary/deleteDataDictionary'


/**
 * 新增更新数据字典
 * 
 */

export const saveUpdateDataDictionary = '/sys/dataDictionary/saveUpdateDataDictionary'

// *********************************权限管理*********************************
/**
 * 查询权限列表
 * path: /sys/auth/role/findAll
 * method: POST
 * params: 
 */
export const getAllRoles = '/sys/auth/role/findAll'

/**
 * 添加角色
 * path: /sys/auth/role/save
 * method: POST
 * params: {
 *      name: 角色名称,
 *      id:  角色编号
 * }
 */
export const addRole = '/sys/auth/role/save'

/**
 * 编辑角色
 * path: /sys/auth/role/update
 * method: POST
 * params: {
 *      name: 角色名称,
 *      id:  角色编号
 * }
 */
export const editRole = '/sys/auth/role/update'

/**
 * 按角色编号查询子角色
 * path: /sys/auth/role/findById
 * method: POST
 * params: {
 *      roleId:   角色编号
 * }
 */
export const getRolesById = '/sys/auth/role/findById'

/**
 * 角色接口查询
 * path: /sys/auth/interface/findRoleInterfaceByid
 * method: POST
 * params: {
 *      roleId:   角色编号
 * }
 */
export const getInterfaceById = '/sys/auth/interface/findRoleInterfaceByid'

/**
 * 角色绑定接口
 * path: /sys/auth/interface/saveRoleInterface
 * method: POST
 * params: {
 *      jsonObject: 包含roleId:角色编号，interfaceGroupList:分组接口列表
 * }
 */
export const roleBlindInterface = '/sys/auth/interface/saveRoleInterface'


// *********************************接口管理*********************************
/**
 * 添加单个接口
 * path: /sys/auth/interface/save
 * method: POST
 * params: {
 *      name:  名称
 *      url:    接口地址
 *      methodType: 接口类型 0,1,2,3,4
 * }
 */
export const addInterface = '/sys/auth/interface/save'

/**
 * 删除单个接口
 * path: /sys/auth/interface/delInterface
 * method: POST
 * params: {
 *      id:  接口id
 * }
 */
export const delInterface = '/sys/auth/interface/delInterface'

/**
 * 获取接口列表
 * path: /sys/auth/interface/findGroupAll
 * method: POST
 * params: null
 */
export const getInterfaceList = '/sys/auth/interface/findGroupAll'

/**
 * 添加、修改接口分组信息
 * path: /sys/auth/group/save
 * method: POST
 * parmas: {
 *      name: 分组名
 *      id:   修改时传入
 * }
 */
export const addInterfaceGroup = '/sys/auth/group/save'

/**
 * 删除接口分组
 * path: 
 * method: POST
 * params: {
 *      groupId : 分组ID
 * }
 */
export const delInterfaceGroup = '/sys/auth/group/delGroup'

/**
 * 接口绑定分组
 * path: /sys/auth/interface/saveGroup
 * method: POST
 * params: {
 *      jsonObject :  分组列表字符串
 * }
 */
export const interfaceBlindGroup = '/sys/auth/interface/saveGroup'



// *******************************************************************

export const findByPage = '/sys/ironTimeConfig/findByPage'

export const saveConfigTime = '/sys/ironTimeConfig/saveTime'