<template>
    <div>
    <el-form
            :model="AuthForm"
            ref="AuthForm"
            class="authform"
            label-width="120px">
        <div class="company-board-verified">
        <el-button
            type="success"
            class="verifiedBtn"
            round
            @click.native="startDialog('isShowBaseInfoDialog')">
            <h1>开始认证</h1>
        </el-button>
        </div>
        <my-dialog class="company-form-dialog" :is-show="isShowBaseInfoDialog" @on-close="closeDialog('isShowBaseInfoDialog')">
        <el-steps :active="0" align-center>
            <el-step title="企业基本信息"></el-step>
            <el-step title="法人信息"></el-step>
            <el-step title="营业执照信息"></el-step>
            <el-step title="负责人信息"></el-step>
            <el-step title="结算信息"></el-step>
        </el-steps>
        <h3>企业基本信息</h3>

        <el-form-item label="企业名称" prop="password">
        <el-input
        type="text"
        v-model="AuthForm.password"
        placeholder="密码">
        </el-input>
        </el-form-item>
        <el-form-item label="企业简称" prop="password">
            <el-input
            type="text"
            v-model="AuthForm.password"
            placeholder="密码">
            </el-input>
        </el-form-item>
        <el-form-item label="企业类型" prop="password">
            <el-select v-model="value" placeholder="请选择">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="所在地区" prop="password">
        <el-cascader
        :options="area"
        @active-item-change="handleItemChange"
        :props="props"
        ></el-cascader>
        </el-form-item>
        <el-form-item label="营业地址" >
        <el-input
        type="textarea"
        v-model="AuthForm.password"
        placeholder="密码">
        </el-input>
        </el-form-item>
        <el-form-item>
            <el-button
                    type="primary"
                    class="nextBtn"
                    round
                    @click.native="nextDialog('isShowBaseInfoDialog','isShowLegalInfoDialog')"
            >
                下一步
            </el-button>
        </el-form-item>
    </my-dialog>
    <my-dialog class="company-form-dialog" :is-show="isShowLegalInfoDialog" @on-close="closeDialog('isShowLegalInfoDialog')">
        <el-steps :active="1" align-center>
            <el-step title="企业基本信息"></el-step>
            <el-step title="法人信息"></el-step>
            <el-step title="营业执照信息"></el-step>
            <el-step title="负责人信息"></el-step>
            <el-step title="结算信息"></el-step>
        </el-steps>
        <h3>法人信息</h3>

        <el-form-item label="法人名称" prop="password">
        <el-input
        type="text"
        v-model="AuthForm.password"
        placeholder="密码">
        </el-input>
        </el-form-item>
        <el-form-item label="法人身份证号" prop="password">
        <el-input
        type="text"
        v-model="AuthForm.password"
        placeholder="密码">
        </el-input>
        </el-form-item>
        <el-row>
            <el-col :span="10">
        <el-form-item>
            <p>法人身份证正面照</p>
        <el-upload
                action=""
                :auto-upload='false'
                :on-change='changeUploadLegalPic1'
                :show-file-list='false'
                >
            <img v-if="LegalPic1" :src="LegalPic1" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        </el-form-item>
            </el-col>
            <el-col :span="10">
        <el-form-item>
            <p>法人身份证反面照</p>
        <el-upload
                action=""
                :auto-upload='false'
                :on-change='changeUploadLegalPic2'
                :show-file-list='false'>
            <img v-if="LegalPic2" :src="LegalPic2" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        </el-form-item>
            </el-col>
        </el-row>

        <el-form-item>
            <el-button
                    type="primary"
                    class="nextBtn"
                    round
                    @click.native="nextDialog('isShowLegalInfoDialog','isShowLicenseInfoDialog')"
            >
                下一步
            </el-button>
            <el-button
                    type="primary"
                    class="nextBtn"
                    round
                    @click.native="nextDialog('isShowLegalInfoDialog','isShowBaseInfoDialog')"
            >
                上一步
            </el-button>
        </el-form-item>
    </my-dialog>
    <my-dialog class="company-form-dialog" :is-show="isShowLicenseInfoDialog" @on-close="closeDialog('isShowLicenseInfoDialog')">
        <el-steps :active="2" align-center>
            <el-step title="企业基本信息"></el-step>
            <el-step title="法人信息"></el-step>
            <el-step title="营业执照信息"></el-step>
            <el-step title="负责人信息"></el-step>
            <el-step title="结算信息"></el-step>
        </el-steps>
        <h3>营业执照信息</h3>

        <el-form-item label="营业执照名称" prop="password">
            <el-input
                    type="text"
                    v-model="AuthForm.password"
                    placeholder="密码">
            </el-input>
        </el-form-item>
        <el-form-item label="营业执照号码" prop="password">
            <el-input
                    type="text"
                    v-model="AuthForm.password"
                    placeholder="密码">
            </el-input>
        </el-form-item>
        <el-form-item label="营业执照地址" prop="password">
            <el-input
                    type="textarea"
                    v-model="AuthForm.password"
                    placeholder="密码">
            </el-input>
        </el-form-item>
        <el-form-item label="营业执照照片">
            <el-upload
                    action=""
                    :auto-upload='false'
                    :on-change='changeUploadCompanyPic'
                    :show-file-list='false'>
                <img v-if="CompanyPic" :src="CompanyPic" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-form-item>
        <el-form-item>
            <el-button
                    type="primary"
                    class="nextBtn"
                    round
                    @click.native="nextDialog('isShowLicenseInfoDialog','isShowMasterInfoDialog')"
            >
                下一步
            </el-button>
            <el-button
                    type="primary"
                    class="nextBtn"
                    round
                    @click.native="nextDialog('isShowLicenseInfoDialog','isShowLegalInfoDialog')"
            >
                上一步
            </el-button>
        </el-form-item>
    </my-dialog>
    <my-dialog class="company-form-dialog" :is-show="isShowMasterInfoDialog" @on-close="closeDialog('isShowMasterInfoDialog')">
        <el-steps :active="3" align-center>
            <el-step title="企业基本信息"></el-step>
            <el-step title="法人信息"></el-step>
            <el-step title="营业执照信息"></el-step>
            <el-step title="负责人信息"></el-step>
            <el-step title="结算信息"></el-step>
        </el-steps>
        <h3>负责人信息</h3>

        <el-form-item label="负责人名称" prop="password">
            <el-input
                    type="text"
                    v-model="AuthForm.password"
                    placeholder="密码">
            </el-input>
        </el-form-item>
        <el-form-item label="负责人身份证号" prop="password">
            <el-input
                    type="text"
                    v-model="AuthForm.password"
                    placeholder="密码">
            </el-input>
        </el-form-item>
        <el-row>
            <el-col :span="10">
                <el-form-item>
                    <p>负责人身份证正面照</p>
                    <el-upload
                            action=""
                            :auto-upload='false'
                            :on-change='changeUploadMasterPic1'
                            :show-file-list='false'
                    >
                        <img v-if="MasterPic1" :src="MasterPic1" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
            </el-col>
            <el-col :span="10">
                <el-form-item>
                    <p>负责人身份证反面照</p>
                    <el-upload
                            action=""
                            :auto-upload='false'
                            :on-change='changeUploadMasterPic2'
                            :show-file-list='false'>
                        <img v-if="MasterPic2" :src="MasterPic2" class="avatar">
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
                    @click.native="nextDialog('isShowMasterInfoDialog','isShowCardInfoDialog')"
            >
                下一步
            </el-button>
            <el-button
                    type="primary"
                    class="nextBtn"
                    round
                    @click.native="nextDialog('isShowMasterInfoDialog','isShowLicenseInfoDialog')"
            >
                上一步
            </el-button>
        </l-form-item>
    </my-dialog>
    <my-dialog class="company-form-dialog" :is-show="isShowCardInfoDialog" @on-close="closeDialog('isShowCardInfoDialog')">
        <el-steps :active="4" align-center>
            <el-step title="企业基本信息"></el-step>
            <el-step title="法人信息"></el-step>
            <el-step title="营业执照信息"></el-step>
            <el-step title="负责人信息"></el-step>
            <el-step title="结算信息"></el-step>
        </el-steps>
        <h3>结算信息</h3>

        <el-form-item label="结算卡号" prop="password">
            <el-input
                    type="text"
                    v-model="AuthForm.password"
                    placeholder="密码">
            </el-input>
        </el-form-item>
        <el-form-item label="所在银行" prop="password">
            <el-select v-model="value" placeholder="请选择">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="结算账户户名" prop="password">
            <el-input
                    type="text"
                    v-model="AuthForm.password"
                    placeholder="密码">
            </el-input>
        </el-form-item>

        <el-form-item>
            <el-button
                    type="primary"
                    class="nextBtn"
                    round
                    @click.native="closeDialog('isShowCardInfoDialog')"
            >
                完成
            </el-button>
            <el-button
                    type="primary"
                    class="nextBtn"
                    round
                    @click.native="nextDialog('isShowCardInfoDialog','isShowMasterInfoDialog')"
            >
                上一步
            </el-button>
        </el-form-item>
    </my-dialog>
    </el-form>
</div>
</template>
<script>
import axios from 'axios'
import MyDialog from '../../../components/base/dialog'
export default {
    components: {
        MyDialog
    },
    data () {
        return {
            LegalPic1: '',
            LegalPic2: '',
            CompanyPic: '',
            MasterPic1: '',
            MasterPic2: '',
            fileList: [],
            isShowBaseInfoDialog : false,
            isShowLegalInfoDialog : false,
            isShowLicenseInfoDialog : false,
            isShowMasterInfoDialog : false,
            isShowCardInfoDialog: false,
            Imgthing: {}, //子组件上传的信息
            AuthForm: {
                tel: '',
                password: '',
                confirmpassword: '',
                telcode: '',
                regincode: '',
                identityCard_Z: '',
                identityCard_F: '',
                identityCard_S: ''
            },
            area: [{
                label: '江苏',
                cities: []
            }, {
                label: '浙江',
                cities: []
            }],
            props: {
                value: 'label',
                children: 'cities'
            },
            options: [{
                value: '选项1',
                label: '黄金糕'
            }, {
                value: '选项2',
                label: '双皮奶'
            }, {
                value: '选项3',
                label: '蚵仔煎'
            }, {
                value: '选项4',
                label: '龙须面'
            }, {
                value: '选项5',
                label: '北京烤鸭'
            }],
            value: '',
            imageUrl: ''
        }
    },
    methods: {
        // ...
        submit() {
            this.$refs.AuthForm.validate(valid => {
                if (valid) {
                    this.logining = true
                    console.log('开始写入后台数据！')
                    console.log(this.$refs.AuthForm)
                } else {
                    console.log('submit err')
                }
            })
        },
        reset() {
            this.$refs.AuthForm.resetFields()
        },
        tologin() {
            this.$router.push('/login')
        },
        //验证手机号码部分
        sendcode() {
            var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
            console.log(this.AuthForm.tel)
            //var url="/nptOfficialWebsite/apply/sendSms?mobile="+this.AuthForm.phone;
            if (this.AuthForm.tel == '' || !reg.test(this.AuthForm.tel)) {
            } else {
                this.time = 60;
                this.getCode = true;
                this.timer();
                /*axios.post(url).then(
                    res=>{
                    this.phonedata=res.data;
                })*/
            }
        },
        timer() {
            if (this.time > 0) {
                this.time--;
                this.btntxt = this.time + "s后重新获取";
                setTimeout(this.timer, 1000);
            } else {
                this.time = 0;
                this.btntxt = "获取验证码";
                this.getCode = false;
            }
        },
        handleItemChange(val) {
            console.log('active item:', val);
            setTimeout(_ => {
                if (val.indexOf('江苏') > -1 && !this.options2[0].cities.length) {
                    this.options2[0].cities = [{
                        label: '南京'
                    }];
                } else if (val.indexOf('浙江') > -1 && !this.options2[1].cities.length) {
                    this.options2[1].cities = [{
                        label: '杭州'
                    }];
                }
            }, 300);
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
        changeUploadLegalPic1(file) {
            this.$nextTick(
                () => {
                    this.LegalPic1 = file.url
                    console.log(file)
                });
        },
        changeUploadLegalPic2(file) {
            this.$nextTick(
                () => {
                    this.LegalPic2 = file.url
                    console.log(file)
                });
        },
        changeUploadCompanyPic(file) {
            this.$nextTick(
                () => {
                    this.CompanyPic = file.url
                    console.log(file)
                });
        },
        changeUploadMasterPic1(file) {
            this.$nextTick(
                () => {
                    this.MasterPic1 = file.url
                    console.log(file)
                });
        },
        changeUploadMasterPic2(file) {
            this.$nextTick(
                () => {
                    this.MasterPic2 = file.url
                    console.log(file)
                });
        }
    }
}
</script>

<style>
h3{
    text-align:center
}

.authform {
    margin: 20px auto;
    width: 350px;
    height: 450px;
    background: #fff;
    border-radius: 25px;
}
.company-board-verified {
    border: 1px dashed #d9d9d9;
    height: 200px;
    width: 500px;
    position: absolute;top:25%;left: 50%;margin-top: -100px;margin-left: -250px;

}

.nextBtn {
    width: 100px;
    float: right;
    margin-left: 10px;
}
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
.verifiedBtn {
    width: 300px;
    height: 100px;
    border-radius: 6px;
    position: absolute;top:25%;left: 50%;margin-left: -150px;

}


</style>