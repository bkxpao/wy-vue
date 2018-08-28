import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../components/layout'
import AutherManage from '../pages/menus/account/autherManage'
import RoleManage from '../pages/menus/account/roleManage'
import StaffApply from '../pages/menus/account/staffApply'
import StaffManage from '../pages/menus/account/staffManage'
import PersonalAuth from '../pages/menus/auth/personal'
import CompanyAuth from '../pages/menus/auth/company'
import LoginPage from '../pages/login'
import ReginPage from '../pages/regin'

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
                },
                {
                    path: '/auth/company',
                    name: '企业认证',
                    component: CompanyAuth
                },
                {
                    path: '/auth/personal',
                    name: '个人认证',
                    component: PersonalAuth
                }
            ]
        },
        {
            path: '/login',
            name: '登陆界面',
            component: LoginPage
        },
        {
            path: '/regin',
            name: '注册界面',
            component: ReginPage
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
    if (path === '/regin') {
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
