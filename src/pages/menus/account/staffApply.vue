<template>
    <div class="staff-apply">
        <el-table
                ref="singleTable"
                :data="tableData"
                highlight-current-row
                @current-change="handleCurrentChange"
                style="width: 100%">
            <el-table-column
                    type="index"
                    width="50">
            </el-table-column>
            <el-table-column
                    property="change_tm"
                    label="日期"
                    :formatter="dateFormat"
                    width="120">
            </el-table-column>
            <el-table-column
                    property="oper_nm"
                    label="姓名">
            </el-table-column>
             <el-table-column
                    property="mbl_no"
                    label="手机号">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">接收</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">拒绝</el-button>
                </template>
            </el-table-column>
        </el-table>
        
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData: [],
                currentRow: null,
                currentFuncNo: '010101'
            }
        },
        methods: {
            dateFormat(row, column) {
                var date = row[column.property];
                 if (date == undefined) {
                  return "";
                 }
                return (date).substring(0,date.length-6);
            },
            setCurrent(row) {
                this.$refs.singleTable.setCurrentRow(row);
            },
            handleCurrentChange(val) {
                this.currentRow = val;
            },
            handleEdit(index, row) {
                let params = {
                    status: '1',
                    mbl_no: row.mbl_no,
                    func_no: this.currentFuncNo
                }
               this.update(params)
            },
            handleDelete(index, row) {
                let params = {
                    status: '2',
                    mbl_no: row.mbl_no,
                    func_no: this.currentFuncNo
                }
               this.update(params)
            },
            update(params) {
                this.$axios.post('/mrbui/bmbucmm1/0010080.do',this.$qs.stringify(params)).then(res => { 
                    if (res.data.gda.msg_cd !== 'MBU00000') {
                        this.$message({
                            type: 'error',
                            message: res.data.gda.msg_cd
                        })
                    } else {
                        this.query()
                    }
                 })
            },
            query() {
                let params = {
                    status: '1',
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
    .staff-apply {
        width: 100%;
    }
</style>