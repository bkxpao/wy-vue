<template>
    <div>
    <div v-if="personalStatus==='0'">
            <div class="personal-board-verified">
                <el-button
                        type="primary"
                        class="verifiedBtn"
                        round
                        @click.native="startDialog('isShowBaseInfoDialog')">
                    <h1>开始认证</h1>
                </el-button>
            </div>

        <el-form
                :model="AuthForm"
                ref="AuthForm"
                class="authform"
                label-width="120px">
        <el-dialog
          title="资料填写"
          :visible.sync="isShowBaseInfoDialog"
          width="70%"
          >
            <el-form-item label="姓名" prop="name">
                <el-input
                        type="text"
                        v-model="AuthForm.name"
                        placeholder="请输入姓名">
                </el-input>
            </el-form-item>
            <el-form-item label="身份证号" prop="user_no">
                <el-input
                        type="text"
                        v-model="AuthForm.user_no"
                        placeholder="请输入身份证号">
                </el-input>
            </el-form-item>
            <el-row>
                <el-col :span="10">
                    <el-form-item>
                        <p>身份证正面照</p>
                        <el-upload
                                action=""
                                :auto-upload='false'
                                :on-change='changeUploadPic1'
                                :show-file-list='false'
                        >
                            <img v-if="AuthForm.Pic1.url" :src="AuthForm.Pic1.url" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item>
                        <p>身份证反面照</p>
                        <el-upload
                                action=""
                                :auto-upload='false'
                                :on-change='changeUploadPic2'
                                :show-file-list='false'>
                            <img v-if="AuthForm.Pic2.url" :src="AuthForm.Pic2.url" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                </el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
                <el-button
                        type="primary"
                        round
                        @click.native="closeDialog('isShowBaseInfoDialog')"
                >
                    返回
                </el-button>
                <el-button
                        type="primary"
                        round
                        @click.native="submit()"
                >
                    提交
                </el-button>
            </span>
        </el-dialog>
        </el-form>
    </div>

    <div v-else-if="personalStatus==='1'">
       <span style="padding: 50px;"> 您的信息正在审核中..请耐心等待..</span>
    </div>
    <div v-else-if="personalStatus==='2'">
        <span style="padding: 50px;"> 认证成功</span>
    </div>
</div>
</template>

<script>
    import img2base64 from '../../../utils/img2base64'
    export default {
        data() {
            return {
                isShowBaseInfoDialog: false,
                personalStatus: '',
                AuthForm: {
                    name: '',
                    user_no: '',
                    Pic1: '',
                    Pic2: '',
                }
            }
        },
        methods: {
            submit() {
                // 登录作为参数的用户信息
                let AuthParams = {
                    name: this.AuthForm.name,
                    card_no: this.AuthForm.user_no,
                    card_pic_a: img2base64(this.AuthForm.Pic1.url),
                    card_pic_b: img2base64(this.AuthForm.Pic2.url)
                }
                console.log(AuthParams.card_pic_a)
                // 调用axios登录接口
                        this.$axios.post('/mrbui/bmbucmm1/0010040.do',this.$qs.stringify(AuthParams)).then(res => {})
            },
            nextDialog(now, next) {
                this[now] = false
                this[next] = true
            },
            closeDialog(attr) {
                this[attr] = false
            },
            startDialog(attr) {
                this[attr] = true
            },
            changeUploadPic1(file) {
                this.$nextTick(
                    () => {
                        this.AuthForm.Pic1 = file
                    });
            },
            changeUploadPic2(file) {
                this.$nextTick(
                    () => {
                        this.AuthForm.Pic2 = file
                    });
            },
            query() {
            this.$axios.get('/mrbui/bmbucmm1/0010160.do').then(res => {
                    if (res.data.gda.msg_cd !== 'MBU00000') {
                        this.$message({
                            type: 'error',
                            message: res.data.gda.msg_cd
                        })
                    } else {
                        this.personalStatus = res.data.personal_sts
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
    .personal-board-verified {
        border: 1px dashed #d9d9d9;
        height: 200px;
        width: 500px;
        position: absolute;top:25%;left: 50%;margin-top: -100px;margin-left: -250px;

    }
    .verifiedBtn {
        width: 300px;
        height: 100px;
        border-radius: 6px;
        position: absolute;top:25%;left: 50%;margin-left: -150px;

    }
</style>