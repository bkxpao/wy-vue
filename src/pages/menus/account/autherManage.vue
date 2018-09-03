<template>
    <div>
        <div class="auth-manage-left">
            <el-form :inline="true"  class="query-form" size="mini">
                <el-form-item>
                    <el-button-group>
                        <el-button type="primary" @click.native="saveAuth()">保存权限</el-button>
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
                        property="oper_nm"
                        label="员工名称"
                >
                </el-table-column>
                <el-table-column
                        property="oper_role"
                        label="权限"
                >
                </el-table-column>
            </el-table>
        </div>
        <div class="auth-manage-right">
            <el-transfer v-model="roleValue" :props="{key: 'role_id',label: 'role_nm'}" :data="roleList"></el-transfer>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                roleValue: [],
                roleList: [],
                defaultProps: {
                    children: 'nodes',
                    label: 'name'
                },
                tableData: [],
                currentRow: null,
                currentFuncNo: '010104'
            }
        },
        methods: {
            setCurrent(row) {
                this.$refs.singleTable.setCurrentRow(row);
            },
            handleCurrentChange(val) {
                this.currentRow = val;
            },
            saveAuth() {
                let roles = this.roleValue
                let roles_str = ''
                 for ( var i = 0; i <roles.length; i++){
                    roles_str += roles[i]+'|'
                }
                let params = {
                    roles_lst: roles_str,
                    mbl_no: this.currentRow.mbl_no,
                    func_no: this.currentFuncNo
                }
                this.$axios.post('/mrbui/bmbucmm1/0010120.do',this.$qs.stringify(params)).then(res => { 
                    if (res.data.gda.msg_cd !== 'MBU00000') {
                        this.$message({
                            type: 'error',
                            message: res.data.gda.msg_cd
                        })
                    } else {
                        this.query()
                    }
                 })
                this.$message({
                    type: 'success',
                    message: '保存成功'
                })
            },
            query() {
                let params = {
                    status: '3',
                    func_no: this.currentFuncNo
                }
                this.$axios.post('/mrbui/bmbucmm1/0010070.do',this.$qs.stringify(params)).then(res => { 
                    if (res.data.gda.msg_cd !== 'MBU00000') {
                        this.$message({
                            type: 'error',
                            message: res.data.gda.msg_cd
                        })
                    } else {
                        this.tableData = res.data.staff_lst
                        console.log(this.tableData)
                    }
                 })
                this.$axios.post('/mrbui/bmbucmm1/0010090.do',this.$qs.stringify(params),).then(res => { 
                    if (res.data.gda.msg_cd !== 'MBU00000') {
                        this.$message({
                            type: 'error',
                            message: res.data.gda.msg_cd
                        })
                    } else {
                        console.log(res.data.role_lst)
                        this.roleList =  res.data.role_lst
                    }
                 })

            }
        },
        mounted() {
            this.query()
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