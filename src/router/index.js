import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../components/layout'
import AutherManage from '../pages/menus/autherManage'
import RoleManage from '../pages/menus/roleManage'
import StaffApply from '../pages/menus/staffApply'
import StaffManage from '../pages/menus/staffManage'
import LoginPage from '../pages/login'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'index',
            component: Layout,
            children: [
                {
                    path: '/account/staff',
                    name: '员工管理',
                    component: StaffManage
                },
                {
                    path: '/account/apply',
                    name: '员工申请',
                    component: StaffApply
                },
                {
                    path: '/account/role',
                    name: '角色管理',
                    component: RoleManage
                },
                {
                    path: '/account/auther',
                    name: '权限管理',
                    component: AutherManage
                }
            ]
        },
        {
            path: '/login',
            name: '登陆界面',
            component: LoginPage
        }
    ]
})

router.beforeEach((to, from, next) => {
    let login = sessionStorage.getItem('token')
    let path = to.path
    if (path === '/login') {
        next()
        return
    }
    if (login) {
        next()
    } else {
        next({
            path: '/login'
        })
    }
})
export default router
