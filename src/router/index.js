import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../components/layout'
import VueResource from 'vue-resource'

Vue.use(Router)
Vue.use(VueResource)


export default new Router({
    routes: [
        {
            path: '/',
            name: 'manage',
            component: Layout
        }
    ]
})
