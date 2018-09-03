<template>

    <div v-if="type === '0'" class="apply-board">
        <div>
            <el-input
                type="text"
                v-model="company_no"
                class="apply-input-area"
                placeholder="请输入公司编号" >
            </el-input>

             <el-button
                type="primary"
                class="apply-submit-btn"
                @click.native="submit"
                >
            申请加入
            </el-button>
        </div>
    还未加入公司，请先
    <a href="../auth/company">认证</a>一个公司，或申请<a href="#" @click="startDialog()">加入</a>一个公司
    </div>

    <div v-else-if="type === '1'" class="apply-board">
        正在审核加入中...请耐心等待...
        <a href="#" @click="cancel()">取消</a>
    </div>
     <div v-else-if="type === '4'" class="apply-board">
        对方拒绝了您的申请/或移除了您,
        <a href="#" @click="commit()">确认</a>
    </div>
</template>

<script>
    import MyDialog from '../components/base/dialog'
    export default {
        data() {
            return {
                type: sessionStorage.getItem('company_sts'),
                isShowDialog: false,
                company_no: sessionStorage.getItem('company_no')
            }
        },
        methods: {
            submit() {
                let ApplyParams = {
                            company_no: this.company_no+'',
                        }
                this.$axios.post('/mrbui/bmbucmm1/0010050.do',this.$qs.stringify(ApplyParams)).then(res => { 
                    if (res.data.gda.msg_cd !== 'MBU00000') {
                        this.$message({
                            type: 'error',
                            message: res.data.gda.msg_cd
                        })
                    } else {
                        this.type = res.data.company_sts
                        sessionStorage.setItem('company_sts', res.data.company_sts)
                    }
                 })
            },
            cancel() {
                this.$axios.post('/mrbui/bmbucmm1/0010060.do').then(res => { 
                    if (res.data.gda.msg_cd !== 'MBU00000') {
                        this.$message({
                            type: 'error',
                            message: res.data.gda.msg_cd
                        })
                    } else {
                        this.type = res.data.company_sts
                        sessionStorage.setItem('company_sts', res.data.company_sts)
                    }
                 })
            },
            commit() {
                this.$axios.post('/mrbui/bmbucmm1/0010060.do').then(res => { 
                    if (res.data.gda.msg_cd !== 'MBU00000') {
                        this.$message({
                            type: 'error',
                            message: res.data.gda.msg_cd
                        })
                    } else {
                        this.type = res.data.company_sts
                        sessionStorage.setItem('company_sts', res.data.company_sts)
                    }
                 })
            }
        }

    }
</script>


<style>

.index-form-dialog {
    width: 500px;
    height: 300px;
}
.apply-submit-btn {
    margin-top: 50px;
    margin-bottom: 50px;
}
.apply-input-area {
    width: 500px;
}
.apply-board {
   margin-left: 50px;

}
</style>