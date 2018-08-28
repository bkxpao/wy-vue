<template>
    <div>

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
            <my-dialog class="personal-form-dialog" :is-show="isShowBaseInfoDialog" @on-close="closeDialog('isShowBaseInfoDialog')">
                <h3>资料填写</h3>
                <el-form-item label="姓名" prop="password">
                    <el-input
                            type="text"
                            v-model="AuthForm.password"
                            placeholder="密码">
                    </el-input>
                </el-form-item>
                <el-form-item label="身份证号" prop="password">
                    <el-input
                            type="text"
                            v-model="AuthForm.password"
                            placeholder="密码">
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
                                <img v-if="Pic1" :src="Pic1" class="avatar">
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
                                <img v-if="Pic2" :src="Pic2" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                    </el-col>
                </el-row>
                <l-form-item>
                    <el-button
                            type="primary"
                            class="nextBtn"
                            round
                            @click.native="closeDialog('isShowBaseInfoDialog')"
                    >
                        提交
                    </el-button>
                    <el-button
                            type="primary"
                            class="nextBtn"
                            round
                            @click.native="closeDialog('isShowBaseInfoDialog')"
                    >
                        返回
                    </el-button>
                </l-form-item>
            </my-dialog>
        </el-form>
    </div>
</template>

<script>
    import MyDialog from '../../../components/base/dialog'
    export default {
        data() {
            return {
                isShowBaseInfoDialog: false,
                Pic1: '',
                Pic2: '',
                AuthForm: {
                    tel: '',
                    hi: ''
                }
            }
        },
        methods: {
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
                        this.Pic1 = file.url
                        console.log(file)
                    });
            },
            changeUploadPic2(file) {
                this.$nextTick(
                    () => {
                        this.Pic2 = file.url
                        console.log(file)
                    });
            }
        },
        components: {
            MyDialog
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