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
