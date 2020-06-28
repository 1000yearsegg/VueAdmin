import request from '@/utils/request'

/**
 * 获取图书列表
 * @param {[object]} params 请求参数
 */
export function listBook(params) {
    return request({
        url: '/book/list',
        method: 'get',
        params
    })
}

/**
 * 获取图书分类
 */
export function getCategory() {
    return request({
        url: '/book/category',
        method: 'get'
    })
}

/**
 * 新增图书
 * @param {[object]} book
 */
export function createBook(book) {
    return request({
        url: '/book/create',
        method: 'post',
        data: book
    })
}

/**
 * 编辑图书
 * @param {[object]} book
 */
export function updateBook(book) {
    return request({
        url: '/book/update',
        method: 'post',
        data: book
    })
}

/**
 * 根据书名获取图书信息
 * @param {{string}} fileName
 */
export function getBook(fileName) {
    return request({
        url: '/book/get',
        method: 'get',
        params: { fileName }
    })
}

/**
 * 删除图书
 * @param {[string]} fileName
 */
export function deleteBook(fileName) {
    return request({
        url: '/book/delete',
        method: 'get',
        params: { fileName }
    })
}
