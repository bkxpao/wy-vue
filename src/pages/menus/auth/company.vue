<template>
    <div>
        <div v-if="companyStatus=0">
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
            @click.native="start()">
            <h1>开始认证</h1>
        </el-button>
        </div>
        <el-dialog
          title="企业认证"
          :visible.sync="isShowDialog"
          width="70%"
          >
        <div v-if="isShowBaseInfoDialog">
            <el-steps :active="0" align-center>
                <el-step title="企业基本信息"></el-step>
                <el-step title="法人信息"></el-step>
                <el-step title="营业执照信息"></el-step>
                <el-step title="负责人信息"></el-step>
                <el-step title="结算信息"></el-step>
            </el-steps>
        <el-form-item label="企业名称" prop="companyName">
        <el-input
        type="text"
        v-model="AuthForm.companyName"
        placeholder="请输入企业名称">
        </el-input>
        </el-form-item>
        <el-form-item label="企业简称" prop="companyShortName">
            <el-input
            type="text"
            v-model="AuthForm.companyShortName"
            placeholder="请输入企业简称">
            </el-input>
        </el-form-item>
        <el-form-item label="企业类型" prop="companyType">
            <el-select v-model="AuthForm.companyType" placeholder="请选择">
            <el-option
            v-for="item in companyTypes"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="地区">
          <v-distpicker :province="AuthForm.province" :city="AuthForm.city" :area="AuthForm.dist" @province="onChangeProvince" @city="onChangeCity" @area="onChangeArea" >
          </v-distpicker>
        </el-form-item>
        <el-form-item label="营业地址" prop="companyAddress">
        <el-input
        type="textarea"
        v-model="AuthForm.companyAddress"
        placeholder="请输入营业地址">
        </el-input>
        </el-form-item>
        <span slot="footer" class="dialog-footer">
        <el-button
                type="primary"
                round
                @click.native="nextDialog('isShowBaseInfoDialog','isShowLegalInfoDialog')"
        >
            下一步
        </el-button>
    </span>
    </div>

    <div v-else-if="isShowLegalInfoDialog">
        <el-steps :active="1" align-center>
            <el-step title="企业基本信息"></el-step>
            <el-step title="法人信息"></el-step>
            <el-step title="营业执照信息"></el-step>
            <el-step title="负责人信息"></el-step>
            <el-step title="结算信息"></el-step>
        </el-steps>
        <el-form-item label="法人姓名" prop="legalName">
        <el-input
        type="text"
        v-model="AuthForm.legalName"
        placeholder="请输入法人姓名">
        </el-input>
        </el-form-item>
        <el-form-item label="法人身份证号" prop="legalCardNo">
        <el-input
        type="text"
        v-model="AuthForm.legalCardNo"
        placeholder="请输入法人身份证号">
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
            <img v-if="AuthForm.legalCardPicA" :src="AuthForm.legalCardPicA.url" class="avatar">
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
            <img v-if="AuthForm.legalCardPicB" :src="AuthForm.legalCardPicB.url" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        </el-form-item>
            </el-col>
        </el-row>
        <span slot="footer" class="dialog-footer">
            <el-button
                    type="primary"
                    round
                    @click.native="nextDialog('isShowLegalInfoDialog','isShowBaseInfoDialog')"
            >
                上一步
            </el-button>
            <el-button
                    type="primary"
                    round
                    @click.native="nextDialog('isShowLegalInfoDialog','isShowLicenseInfoDialog')"
            >
                下一步
            </el-button>
        </span>
   </div>
   <div v-else-if="isShowLicenseInfoDialog">
        <el-steps :active="2" align-center>
            <el-step title="企业基本信息"></el-step>
            <el-step title="法人信息"></el-step>
            <el-step title="营业执照信息"></el-step>
            <el-step title="负责人信息"></el-step>
            <el-step title="结算信息"></el-step>
        </el-steps>
        <el-form-item label="营业执照名称" prop="companyCertName">
            <el-input
                    type="text"
                    v-model="AuthForm.companyCertName"
                    placeholder="请输入营业执照名称">
            </el-input>
        </el-form-item>
        <el-form-item label="营业执照号码" prop="companyCertNo">
            <el-input
                    type="text"
                    v-model="AuthForm.companyCertNo"
                    placeholder="请输入营业执照号码">
            </el-input>
        </el-form-item>
        <el-form-item label="营业执照地址" prop="companyCertAddress">
            <el-input
                    type="textarea"
                    v-model="AuthForm.companyCertAddress"
                    placeholder="请输入营业执照地址">
            </el-input>
        </el-form-item>
        <el-form-item label="营业执照照片">
            <el-upload
                    action=""
                    :auto-upload='false'
                    :on-change='changeUploadCompanyPic'
                    :show-file-list='false'>
                <img v-if="AuthForm.companyCertPic" :src="AuthForm.companyCertPic.url" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-form-item>
        <span slot="footer" class="dialog-footer">
            <el-button
                    type="primary"
                    round
                    @click.native="nextDialog('isShowLicenseInfoDialog','isShowLegalInfoDialog')"
            >
                上一步
            </el-button>
            <el-button
                    type="primary"
                    round
                    @click.native="nextDialog('isShowLicenseInfoDialog','isShowMasterInfoDialog')"
            >
                下一步
            </el-button>
        </span>
    </div>
    <div v-else-if="isShowMasterInfoDialog">
        <el-steps :active="3" align-center>
            <el-step title="企业基本信息"></el-step>
            <el-step title="法人信息"></el-step>
            <el-step title="营业执照信息"></el-step>
            <el-step title="负责人信息"></el-step>
            <el-step title="结算信息"></el-step>
        </el-steps>
        <el-form-item label="负责人名称" prop="masterName">
            <el-input
                    type="text"
                    v-model="AuthForm.masterName"
                    placeholder="请输入负责人姓名">
            </el-input>
        </el-form-item>
        <el-form-item label="负责人手机号" prop="masterMobileNo">
            <el-input
                    type="text"
                    v-model="AuthForm.masterMobileNo"
                    placeholder="请输入负责人手机号">
            </el-input>
        </el-form-item>
        <el-form-item label="负责人身份证号" prop="masterCardNo">
            <el-input
                    type="text"
                    v-model="AuthForm.masterCardNo"
                    placeholder="请输入负责人身份照号码">
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
                        <img v-if="AuthForm.masterCardPicA" :src="AuthForm.masterCardPicA.url" class="avatar">
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
                        <img v-if="AuthForm.masterCardPicB" :src="AuthForm.masterCardPicB.url" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
            </el-col>
        </el-row>
        <span slot="footer" class="dialog-footer">
            <el-button
                    type="primary"
                    round
                    @click.native="nextDialog('isShowMasterInfoDialog','isShowLicenseInfoDialog')"
            >
                上一步
            </el-button>
            <el-button
                    type="primary"
                    round
                    @click.native="nextDialog('isShowMasterInfoDialog','isShowCardInfoDialog')"
            >
                下一步
            </el-button>
        </span>
    </div>
    <div v-else-if="isShowCardInfoDialog">
        <el-steps :active="4" align-center>
            <el-step title="企业基本信息"></el-step>
            <el-step title="法人信息"></el-step>
            <el-step title="营业执照信息"></el-step>
            <el-step title="负责人信息"></el-step>
            <el-step title="结算信息"></el-step>
        </el-steps>
        <el-form-item label="结算卡号" prop="bankCardNo">
            <el-input
                    type="text"
                    v-model="AuthForm.bankCardNo"
                    placeholder="请输入结算卡号">
            </el-input>
        </el-form-item>
        <el-form-item label="所在银行" prop="bank">
            <el-select v-model="AuthForm.bank" placeholder="请选择">
                <el-option
                        v-for="item in bankList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="结算账户户名" prop="bankCardName">
            <el-input
                    type="text"
                    v-model="AuthForm.bankCardName"
                    placeholder="请输入结算账户名称">
            </el-input>
        </el-form-item>
        <span slot="footer" class="dialog-footer">
            <el-button
                    type="primary"
                    round
                    @click.native="nextDialog('isShowCardInfoDialog','isShowMasterInfoDialog')"
            >
                上一步
            </el-button>
            <el-button
                    type="primary"
                    round
                    @click.native="submit()"
            >
                完成
            </el-button>
        </span>
    </div>
       
    </el-dialog>
 </el-form>
</div>
<div v-else-if="companyStatus=1">
   <span style="padding: 50px;"> 您的企业正在审核中..请耐心等待..</span>
</div>
<div v-else-if="companyStatus=2">
    <span style="padding: 50px;"> 认证成功</span>
</div>

</div>
</template>
<script>
import img2base64 from '../../../utils/img2base64'
import VDistpicker from 'v-distpicker'
export default {
    components: { VDistpicker },
    data () {
        return {
            companyStatus: '',
            fileList: [],
            isShowDialog: false,
            isShowBaseInfoDialog : false,
            isShowLegalInfoDialog : false,
            isShowLicenseInfoDialog : false,
            isShowMasterInfoDialog : false,
            isShowCardInfoDialog: false,
            AuthForm: {
                companyName: '',
                companyShortName: '',
                companyArea: '',
                companyAddress: '',
                companyType: '',
                legalName: '',
                legalCardNo: '',
                legalCardPicA: '',
                legalCardPicB: '',
                companyCertName: '',
                companyCertNo: '',
                companyCertPic: '',
                companyCertAddress: '',
                masterName: '',
                masterCardNo: '',
                masterMobileNo: '',
                masterCardPicA: '',
                masterCardPicB: '',
                bankCardNo: '',
                bank: '',
                bankCardName: '',
                province: '',
                city: '',
                dist: ''
            },
            companyTypes: [{
                value: '1',
                label: '核心企业'
            }, {
                value: '2',
                label: '供应商'
            }, {
                value: '3',
                label: '银行'
            }],
            bankList: [{
                value: '1',
                label: '招商银行'
            },{
                value: '2',
                label: '交通银行'
            }],
            value: ''
        }
    },
    methods: {
        onChangeProvince(data) {
          this.AuthForm.province = data.value
        },
        onChangeCity(data) {
          this.AuthForm.city = data.value
        },
        onChangeArea(data) {
          this.AuthForm.area = data.value
        },
        start() {
            this.isShowDialog = true,
            this.isShowBaseInfoDialog = true
        },
        handleClose() {
            this.isShowBaseInfoDialog = false
        },
        // ...
       submit() {
                // 登录作为参数的用户信息
                let AuthParams = {
                    company_nm: this.AuthForm.companyName,
                    company_snm: this.AuthForm.companyShortName,
                    company_area: this.AuthForm.area,
                    company_province: this.AuthForm.province,
                    company_city: this.AuthForm.city,
                    company_addr: this.AuthForm.companyAddress,
                    company_typ: this.AuthForm.companyType,
                    legal_nm: this.AuthForm.legalName,
                    legal_cd: this.AuthForm.legalCardNo,
                    legal_card_pic_a: img2base64(this.AuthForm.legalCardPicA.url),
                    legal_card_pic_b: img2base64(this.AuthForm.legalCardPicB.url),
                    business_name: this.AuthForm.companyCertName,
                    business_license: this.AuthForm.companyCertNo,
                    company_cert_pic: img2base64(this.AuthForm.companyCertPic.url),
                    business_address: this.AuthForm.companyCertAddress,
                    connect_nm: this.AuthForm.masterName,
                    connect_cd: this.AuthForm.masterCardNo,
                    connect_mbl: this.AuthForm.masterMobileNo,
                    connect_card_pic_a: img2base64(this.AuthForm.masterCardPicA.url),
                    connect_card_pic_b: img2base64(this.AuthForm.masterCardPicB.url),
                    card_no: this.AuthForm.bankCardNo,
                    bank: this.AuthForm.bank,
                    card_nm: this.AuthForm.bankCardName
                }
                console.log(AuthParams)
                // // 调用axios登录接口
                this.$axios.post('/mrbui/bmbucmm1/0010150.do',this.$qs.stringify(AuthParams)).then(res => {
                    if (res.data.gda.msg_cd !== 'MBU00000') {
                        this.$message({
                            type: 'error',
                            message: res.data.gda.msg_cd
                        })
                    }
                })
            },
        reset() {
            this.$refs.AuthForm.resetFields()
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
                    this.AuthForm.legalCardPicA = file
                });
        },
        changeUploadLegalPic2(file) {
            this.$nextTick(
                () => {
                    this.AuthForm.legalCardPicB = file
                });
        },
        changeUploadCompanyPic(file) {
            this.$nextTick(
                () => {
                    this.AuthForm.companyCertPic = file
                });
        },
        changeUploadMasterPic1(file) {
            this.$nextTick(
                () => {
                    this.AuthForm.masterCardPicA = file
                });
        },
        changeUploadMasterPic2(file) {
            this.$nextTick(
                () => {
                    this.AuthForm.masterCardPicB = file
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
                        this.companyStatus = res.data.company_sts
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

.verifiedBtn {
    width: 300px;
    height: 100px;
    border-radius: 6px;
    position: absolute;top:25%;left: 50%;margin-left: -150px;

}
</style>