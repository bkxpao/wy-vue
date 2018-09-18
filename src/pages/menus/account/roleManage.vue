<template>
    <div>
        <div class="role-manage-left">
        <el-form :inline="true"  class="query-form" size="mini">
            <el-form-item>
                <el-button-group>
                    <el-button type="primary" icon="edit" @click.native="editRole()">修改</el-button>
                    <el-button type="primary" @click="dialogAddFormVisible = true">添加</el-button>
                    <el-button type="primary" @click.native="deleteRole()">删除</el-button>
                    <el-button type="primary" @click.native="saveAuth()">保存权限</el-button>
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
                    property="role_nm"
                    label="角色名称"
                    >
            </el-table-column>
            <el-table-column
                    property="role_desc"
                    label="备注"
                   >
            </el-table-column>
        </el-table>
        </div>
        <div class="role-manage-right">
        <el-tree
                :data="authList"
                show-checkbox
                default-expand-all
                :default-checked-keys="currentAuthList"
                node-key="id"
                ref="tree"
                highlight-current
                :props="defaultProps">
        </el-tree>
        </div>
        <el-dialog title="增加角色" :visible.sync="dialogAddFormVisible">
          <el-form :model="addRoleForm">
            <el-form-item label="角色名称" :label-width="formLabelWidth">
              <el-input v-model="addRoleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="备注" :label-width="formLabelWidth">
              <el-input v-model="addRoleForm.desc" type="textarea"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogAddFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addRoleSubmit()">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="修改角色" :visible.sync="dialogEditFormVisible">
          <el-form :model="editRoleForm">
            <el-form-item label="角色名称" :label-width="formLabelWidth">
              <el-input v-model="editRoleForm.name" value="this.currentRow.role_nm"></el-input>
            </el-form-item>
            <el-form-item label="备注" :label-width="formLabelWidth">
              <el-input v-model="editRoleForm.desc" type="textarea"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogEditFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="editRoleSubmit()">确 定</el-button>
          </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                dialogAddFormVisible: false,
                dialogEditFormVisible: false,
                authList: [],
                currentAuthList: [],
                defaultProps: {
                    children: 'nodes',
                    label: 'name'
                },
                tableData: [],
                currentRow: null,
                addRoleForm: {
                    name: '',
                    desc: ''
                },
                editRoleForm:  {
                    id: '',
                    name: '',
                    desc: ''
                },
                formLabelWidth: '120px',
                current_auths: [],
                currentFuncNo: '010103'
            }
        },
        methods: {
            setCurrent(row) {
                this.$refs.singleTable.setCurrentRow(row)
                this.currentRow = row
            },
            getCurrent() {
                return this.$refs.singleTable.row;
            },
            handleCurrentChange(val) {
                this.currentRow = val
                if (val) {
                    if (val.funcs) {
                    this.$refs.tree.setCheckedKeys(val.funcs.split(','));
                    } else {
                        this.$refs.tree.setCheckedKeys([]);
                    }
                } else {
                    this.$refs.tree.setCheckedKeys([]);
                }
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
            },
            editRole() {
                if (this.currentRow) {
                    this.dialogEditFormVisible = true
                    this.editRoleForm.id = this.currentRow.role_id
                    this.editRoleForm.name = this.currentRow.role_nm
                    this.editRoleForm.desc = this.currentRow.role_desc
                } else {
                    this.$message({
                            type: 'error',
                            message: '当前没有选中行'
                        })
                }
            },
            deleteRole() {
                if (this.currentRow) {
                     this.$confirm('是否移除当前角色?', '提示', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning'
                    }).then(() => {
                      let params = {
                        method: 3,
                        role_id: this.currentRow.role_id,
                        func_no: this.currentFuncNo
                     }
                    this.update(params)
                    }).catch(() => {
                      this.$message({
                        type: 'info',
                        message: '已取消删除'
                      });          
                    });
                }else {
                    this.$message({
                        type: 'error',
                        message: '当前没有选中行'
                    })
                }
            },
            addRoleSubmit() {
                let params = {
                    method: 1,
                    role_nm: this.addRoleForm.name,
                    role_desc: this.addRoleForm.desc,
                    func_no: this.currentFuncNo
                }
               this.update(params)
               this.addRoleForm = []
               this.dialogAddFormVisible= false
            },
            editRoleSubmit() {
                let params = {
                    method: 2,
                    role_id: this.editRoleForm.id,
                    role_nm: this.editRoleForm.name,
                    role_desc: this.editRoleForm.desc,
                    func_no: this.currentFuncNo
                }
               this.update(params)
               this.dialogEditFormVisible= false
            },
            saveAuth() {
                let auths = this.$refs.tree.getCheckedKeys()
                let auths_str = ''
                for ( var i = 0; i <auths.length; i++){
                    auths_str += auths[i]+'|'
                }
                let half_auths = this.$refs.tree.getHalfCheckedKeys()
                let half_auths_str = ''
                for ( var i = 0; i <half_auths.length; i++){
                    half_auths_str += half_auths[i]+'|'
                }
                let params = {
                    role_id: this.currentRow.role_id,
                    auth_lst: auths_str,
                    half_auth_lst: half_auths_str,
                    func_no: this.currentFuncNo
                }

                this.$axios.post('/mrbui/bmbucmm1/0010110.do',this.$qs.stringify(params)).then(res => { 
                        if (res.data.gda.msg_cd !== 'MBU00000') {
                            this.$message({
                                type: 'error',
                                message: res.data.gda.msg_dat
                            })
                        } else {
                            this.$message({
                                type: 'success',
                                message: '保存成功'
                            })
                            this.query()
                        }
                    })     
            },
            update(params) {
                this.$axios.post('/mrbui/bmbucmm1/0010100.do',this.$qs.stringify(params)).then(res => { 
                        if (res.data.gda.msg_cd !== 'MBU00000') {
                            this.$message({
                                type: 'error',
                                message: res.data.gda.msg_dat
                            })
                        } else {
                            this.$message({
                                type: 'success',
                                message: '保存成功'
                            })
                            this.query()
                        }
                    })
            },
            query() {
                let params = {
                    func_no: this.currentFuncNo
                }
                this.$axios.post('/mrbui/bmbucmm1/0010090.do',this.$qs.stringify(params)).then(res => { 
                    if (res.data.gda.msg_cd !== 'MBU00000') {
                        this.$message({
                            type: 'error',
                            message: res.data.gda.msg_dat
                        })  
                    } else {
                        this.tableData = res.data.role_lst
                    }
                 })
            }
        },
        mounted() {
            this.authList = this.getMenuTree(require('../../../data/menu'), "0")
            this.query()
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