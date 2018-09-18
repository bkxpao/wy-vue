import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../components/layout'
import Welcome from '../components/Welcome'

import AutherManage from '../pages/menus/account/autherManage'
import RoleManage from '../pages/menus/account/roleManage'
import StaffApply from '../pages/menus/account/staffApply'
import StaffManage from '../pages/menus/account/staffManage'
import PersonalAuth from '../pages/menus/auth/personal'
import CompanyAuth from '../pages/menus/auth/company'
import LoginPage from '../pages/login'
import ReginPage from '../pages/regin'
import IndexPage from '../pages/index'
import ContactPage from '../pages/article/contact'
import AboutPage from '../pages/article/about'
import NotFoundPage from '../pages/notfound'


Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: '/goldchain',
    routes: [
        {
            path: '/',
            name: 'index',
            redirect: '/index',
            component: Layout,
            children: [
                {
                  path:'/index',
                  name:'首页',
                  component: IndexPage
                },
                {
                    path: '/account/staff',
                    name: '员工管理',
                    index: '010102',
                    component: StaffManage
                },
                {
                    path: '/account/apply',
                    name: '员工申请',
                    index: '010101',
                    component: StaffApply
                },
                {
                    path: '/account/role',
                    name: '角色管理',
                    index: '010103',
                    component: RoleManage
                },
                {
                    path: '/account/auther',
                    name: '权限管理',
                    index: '010104',
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
                path: '/',
                name: 'Welcome',
                component: Welcome,
                children: [
                {
                    path: '/login',
                    name: '登陆界面',
                    component: LoginPage
                },
                {
                    path: '/regin',
                    name: '注册界面',
                    component: ReginPage
                },
                {
                    path: '/contact',
                    name: '联系我们',
                    component: ContactPage
                },
                {
                    path: '/about',
                    name: '关于金链',
                    component: AboutPage
                }
                ]
            },
            { path: '*', component: NotFoundPage }
        ]
})

router.beforeEach((to, from, next) => {
    let login = sessionStorage.getItem('token')
    let path = to.path
    let flag = path === '/account/staff'||path === '/account/apply'
    ||path === '/account/role'||path=== '/account/auther'
    ||path=== '/auth/company'||path==='/auth/personal'||path=== '/'
    ||path=== '/index'
    console.log(path)
    if (login||(!flag)) {
        next()
    } else {
        next({
            path: '/login'
        })
    }
})
export default router
