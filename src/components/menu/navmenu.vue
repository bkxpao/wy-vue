
<template>
    <div class="navMenu">

        <label v-for="navMenu in navMenus">
            <el-menu-item v-if="navMenu.nodes.length === 0"
                          :key="navMenu.id" :index="navMenu.id" :route="navMenu.path"
                          >
                <span slot="title">{{navMenu.name}}</span>
            </el-menu-item>

            <el-submenu v-if="navMenu.nodes.length !== 0"
                        :key="navMenu.id" :index="navMenu.id">
                <template slot="title">
                    <span> {{navMenu.name}}</span>
                </template>
                <NavMenu :navMenus="navMenu.nodes"></NavMenu>
            </el-submenu>
        </label>

    </div>
</template>

<script>
    export default {
        name: 'NavMenu',
        props: ['navMenus'],
        data() {
            return {}
        },
        methods: {}
    }
</script>

<style scoped>
</style>