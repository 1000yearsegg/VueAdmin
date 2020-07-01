import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'

Vue.use(Router)

export const constantRoutes = [
    {
        path: '/redirect',
        component: Layout,
        hidden: true,
        children: [
            {
                path: '/redirect/:path*',
                component: () => import('@/views/redirect/index')
            }
        ]
    },
    {
        path: '/login',
        component: () => import('@/views/login/index'),
        hidden: true
    },
    {
        path: '/auth-redirect',
        component: () => import('@/views/login/auth-redirect'),
        hidden: true
    },
    {
        path: '/404',
        component: () => import('@/views/error-page/404'),
        hidden: true
    },
    {
        path: '/401',
        component: () => import('@/views/error-page/401'),
        hidden: true
    },
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [
            {
                path: 'dashboard',
                component: () => import('@/views/dashboard/index'),
                name: 'Dashboard',
                meta: { title: '首页', icon: 'dashboard', affix: true }
            }
        ]
    }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
    {
        path: '/person',
        component: Layout,
        // redirect: '/person/user/list',
        name: 'Person',
        meta: {
            title: '人员管理',
            icon: 'documentation'
        },
        children: [
            {
                path: 'role/list',
                component: () => import('@/views/error-page/404'),
                name: 'RoleList',
                meta: { title: '角色管理', icon: 'list', noCache: true }
            },
            {
                path: 'user/list',
                component: () => import('@/views/user/list'),
                name: 'UserList',
                meta: { title: '用户管理', icon: 'list', noCache: true },
                children: [
                    {
                        path: 'user/list',
                        component: () => import('@/views/user/list'),
                        name: 'UserList',
                        meta: { title: '用户列表', icon: 'list', noCache: true }
                    },
                    {
                        path: 'user/list/form',
                        component: () => import('@/views/user/form'),
                        name: 'UserForm',
                        meta: { title: '新增用户', icon: 'edit', noCache: true },

                    }
                ]
            }

        ]
    },
    // {
    //     path: '/book',
    //     component: Layout,
    //     redirect: '/book/list',
    //     name: 'Book',
    //     meta: {
    //         title: '图书管理',
    //         icon: 'documentation'
    //     },
    //     children: [
    //         {
    //             path: 'list',
    //             component: () => import('@/views/book/list'),
    //             name: 'BookList',
    //             meta: { title: '图书列表', icon: 'list', noCache: true }
    //         },
    //         {
    //             path: 'create',
    //             component: () => import('@/views/book/create'),
    //             name: 'CreateBook',
    //             meta: { title: '添加图书', icon: 'edit', noCache: true }
    //         },
    //         {
    //             path: 'edit/:fileName(\\w+)',
    //             component: () => import('@/views/book/edit'),
    //             name: 'EditBook',
    //             meta: { title: '编辑图书', noCache: true, activeMenu: '/book/list' },
    //             hidden: true
    //         }
    //     ]
    // },
    // 404 page must be placed at the end !!!
    { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router
