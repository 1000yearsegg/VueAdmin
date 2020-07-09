import request from '@/utils/request'

export function login(data) {
    return request({
        url: '/user/login',
        method: 'post',
        data
    })
}

export function getInfo(token) {
    return request({
        url: '/user/info',
        method: 'get'
    })
}

export function logout() {
    return request({
        url: '/user/logout',
        method: 'post'
    })
}

/**
 * 获取用户列表
 * @param {[object]} params 请求参数
 */
export function listUser(params) {
    return request({
        url: '/user/list',
        method: 'get',
        params
    })
}

/**
 * 新增用户
 * @param {[object]} params 请求参数
 */
export function addUser(params) {
    return request({
        url: '/user/add',
        method: 'post',
        data: params
    })
}

/**
 * 编辑用户
 * @param {[object]} params 请求参数
 */
export function editUser(params) {
    return request({
        url: '/user/edit',
        method: 'put',
        data: params
    })
}

/**
 * 根据用户名获取用户信息
 * @param {[string]} userName 
 */
export function getUser(userName) {
    return request({
        url: '/user/get',
        method: 'get',
        params: { userName }
    })
}

/**
 * 根据用户名删除用户
 * @param {[string]} userName 
 */
export function deleteUser(userName) {
    return request({
        url: '/user/delete',
        method: 'get',
        params: { userName }
    })
}
