<template>
    <div>
        <el-header style="text-align: right; font-size: 12px">
            <el-dropdown>
                <i class="el-icon-setting" style="margin-right: 15px"></i>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="logout" >退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <span>{{ username }}</span>
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
                username: sessionStorage.getItem("username"),
                menu_all: require('../data/menu'),
                user_menu: []
            }
        },
        methods: {
            initMenu() {
                let tmp = [];
                let menu_all = this.menu_all;
                let menu_tmp = JSON.parse(sessionStorage.getItem('functions'));
                for (let i=0; i< menu_all.length; i++) {
                    for (let j=0;j< menu_tmp.length; j++) {
                        if (this.menu_all[i].id == menu_tmp[j].func_no) {
                            tmp.push(this.menu_all[i]);
                        }
                    }
                }
                return this.getMenuTree(tmp, 0)
            },
            getMenuTree(data, parentid) {
                let itemArr = []
                for (let i=0; i < data.length; i++) {
                    let node = data[i]
                    if (node.parentid == parentid) {
                        let newNode = {}
                        newNode.id = node.id
                        newNode.name = node.name
                        newNode.path = node.path
                        newNode.nodes = this.getMenuTree(data, node.id)
                        itemArr.push(newNode)
                    }
                }
                JSON.stringify(itemArr)
                return itemArr
            },
            logout() {
                sessionStorage.clear()
                this.$router.push('/login')
            }
        },
        mounted() {
            let usermenu = sessionStorage.getItem('usermenu');
            if (usermenu === null||usermenu.trim().length === 0) {
                this.user_menu = this.initMenu();
                sessionStorage.setItem('usermenu',JSON.stringify(this.user_menu))

            } else {
                this.user_menu = JSON.parse(usermenu)
            }

        }
    }
</script>


<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 320px;
    height: 200px;
    border: 1px dashed #d9d9d9;
    border-radius:10px;

    line-height: 178px;
    text-align: center;
}
.el-icon-plus avatar-uploader-icon{
    height: 10px;
}
.avatar {
    width: 322px;
    height: 202px;
    border-radius: 6px;
    display: block;
}
</style>