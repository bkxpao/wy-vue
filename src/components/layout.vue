<template>
    <div>
        <el-header style="text-align: right; font-size: 12px">
            <el-dropdown>
                <i class="el-icon-setting" style="margin-right: 15px"></i>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <span>王小虎</span>
        </el-header>
        <el-container style="height: 500px; border: 1px solid #eee">
            <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
                <el-menu router >
                   <nav-menu :nav-menus="user_menu"></nav-menu>
                </el-menu>
            </el-aside>

            <el-container>
                <keep-alive>
                 <router-view></router-view>
                </keep-alive>
            </el-container>
        </el-container>

    </div>
</template>

<script>
    import NavMenu from './menu/navmenu'
    export default {
        components: {
            NavMenu
        },
        data() {
            return {
                user_auther: [1,2,3,4,5,6,7,8],
                menu_all: require('../data/menu'),
                user_menu: []

            }
        },
        methods: {
            getMenuTree(data, parentid) {
                let itemArr = []
                for (let i=0; i < data.length; i++) {
                    let node = data[i]
                    if (node.parentid == parentid) {
                        console.log(parentid)
                        let newNode = {}
                        newNode.id = node.id
                        newNode.name = node.name
                        newNode.path = node.path
                        newNode.nodes = this.getMenuTree(data, node.id)
                        console.log(JSON.stringify(newNode.nodes))
                        itemArr.push(newNode)
                    }
                }
                JSON.stringify(itemArr)
                return itemArr
            }
        },
        mounted() {
            console.log(JSON.stringify(this.menu_all))
            this.user_menu = this.getMenuTree(this.menu_all, '0')
            console.log(JSON.stringify(this.user_menu))
        }
    }
</script>


<style>

</style>