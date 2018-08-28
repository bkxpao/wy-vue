<template>
    <div>
        <div class="auth-manage-left">
            <el-form :inline="true" :model="query" class="query-form" size="mini">
                <el-form-item>
                    <el-button-group>
                        <el-button type="primary" @click.native="handleForm(null,null)">保存权限</el-button>
                    </el-button-group>
                </el-form-item>
            </el-form>
            <el-table
                    ref="singleTable"
                    :data="tableData"
                    highlight-current-row
                    @current-change="handleCurrentChange"
                    style="width: 300px">
                <el-table-column
                        type="index"
                        width="50">
                </el-table-column>
                <el-table-column
                        property="date"
                        label="员工名称"
                >
                </el-table-column>
                <el-table-column
                        property="name"
                        label="权限"
                >
                </el-table-column>
            </el-table>
        </div>
        <div class="auth-manage-right">
            <el-transfer v-model="value1" :data="data"></el-transfer>

        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                data2: [],
                defaultProps: {
                    children: 'nodes',
                    label: 'name'
                },
                tableData: [
                    {
                        date: '王小虎',
                        name: '超级管理员',
                    },
                    {
                        date: '王小虎',
                        name: '普通管理员',
                    }
                ]
            }
        },
        methods: {
            setCurrent(row) {
                this.$refs.singleTable.setCurrentRow(row);
            },
            handleCurrentChange(val) {
                this.currentRow = val;
            },
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            getMenuTree(data, parentid) {
                let itemArr = []
                for (let i = 0; i < data.length; i++) {
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
            }
        },
        mounted() {
            this.data2 = this.getMenuTree(require('../../../data/menu'), "0")
        }

    }
</script>

<style>
    .auth-manage-left{
        float: left;
        width: 300px;
        margin: 40px;
    }
    .auth-manage-right{
        float: left;
        width: 500px;
        height: 500px;
        margin-left: 60px;
        margin-top: 40px;
    }
</style>