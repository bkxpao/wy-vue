<template>
    <div>
        <div class="role-manage-left">
        <el-form :inline="true" :model="query" class="query-form" size="mini">
            <el-form-item>
                <el-button-group>
                    <el-button type="primary" icon="edit" @click="onSubmit">修改</el-button>
                    <el-button type="primary" @click.native="handleForm(null,null)">添加</el-button>
                    <el-button type="primary" @click.native="handleForm(null,null)">删除</el-button>
                    <el-button type="primary" @click.native="handleForm(null,null)">保存权限</el-button>
                </el-button-group>
            </el-form-item>
        </el-form>
        <el-table
                ref="singleTable"
                :data="tableData"
                highlight-current-row
                @current-change="handleCurrentChange"
                style="width: 500px">
            <el-table-column
                    type="index"
                    width="50">
            </el-table-column>
            <el-table-column
                    property="date"
                    label="角色名称"
                    >
            </el-table-column>
            <el-table-column
                    property="name"
                    label="备注"
                   >
            </el-table-column>
        </el-table>
        </div>
        <div class="role-manage-right">
        <el-tree
                :data="data2"
                show-checkbox
                default-expand-all
                node-key="id"
                ref="tree"
                highlight-current
                :props="defaultProps">
        </el-tree>
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
                    date: '超级管理员',
                    name: '超级管理员',
                    },
                    {
                    date: '普通管理员',
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
.role-manage-left{
    float: left;
    margin: 40px;
}
.role-manage-right{
    float: left;
    border: 1px solid #d9d9d9;
    border-radius:10px;
    width: 200px;
    height: 500px;
}
</style>