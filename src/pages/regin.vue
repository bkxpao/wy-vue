<template>
  <div class="register-container w1200">
    <div class="fl">
    <el-form
            :model="ReginForm"
            ref="ReginForm"
            :rules="rule"
            class="regform"
            >
        <el-form-item prop="tel">
            <el-input
                    type="text"
                    v-model.number="ReginForm.tel"
                    placeholder="电话号码">
                <template slot="prepend">+86</template>
            </el-input>
        </el-form-item>
        <el-form-item prop="telcode">
            <el-input
                type="text"
                v-model.number="ReginForm.telcode"
                maxlength="6" 
                placeholder="手机验证码">
                <el-button type="primary" slot="append" @click.native="sendcode" :disabled="getCode">{{ btntxt }}</el-button>
            </el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input
                type="password"
                v-model="ReginForm.password"
                placeholder="密码">
            </el-input>
        </el-form-item>
        <el-form-item prop="confirmpassword">
            <el-input
                type="password"
                v-model="ReginForm.confirmpassword"
                placeholder="确认密码">
            </el-input>
        </el-form-item>
        <el-form-item prop="realname">
            <el-input
                type="text"
                v-model="ReginForm.realname"
                placeholder="请输入真实姓名">
            </el-input>
        </el-form-item>
        <el-form-item v-if="ReginForm.region_type==='1'"prop="regincode">
            <el-input
                maxlength="16" 
                type="text"
                v-model="ReginForm.regincode"
                placeholder="邀请码">
            </el-input>
        </el-form-item>
        <el-form-item>
            <el-radio v-model="ReginForm.region_type" label="1">企业首次注册</el-radio>
            <el-radio v-model="ReginForm.region_type" label="2">员工注册</el-radio>
        </el-form-item>
        <el-form-item >
            <el-button
                    type="primary"
                    class="submitBtn"
                    @click.native.prevent="submit"
                    :loading="regining">
                立即注册
            </el-button>
        </el-form-item>
    </el-form>
    <div class="bottom">
                            
        </div>
    </div>
    <div class="fr">
    <!-- <img src="/images/flag.png" alt=""> --> 
    <h1>快速<span class="yellow">30秒</span>注册你将享有</h1>
    <ul>
        <li><i>1.</i><span>放心服务——全程专业融资顾问指导</span></li>
        <li class="offset"><i>2.</i><span>安心交易——金链资金安全保障</span></li>
        <li><i>3.</i><span>凭证担保——云端存储，凭证放心管理</span></li>
        <li class="offset"><i>4.</i><span>在线转让——买卖双方参与，交易直联</span></li>
    </ul>
    <p>融资的问题，我知道：<span class="yellow">xxx-xxx-xxxx</span></p>
    </div>
    
  </div>
</template>
<script>
    import axios from 'axios'
    export default {
        data () {
            let confirmpasswordCheck = (rule, value, callback) => {
                if (value === '') {
                    return callback(new Error('密码是必须的'))
                } else if (value !== this.ReginForm.password) {
                    return callback(new Error('两次输入的密码不一致'))
                } else {
                    return callback()
                }
            }
            let telCheck = (rule, value, callback) => {
                let reg=11 && /^((13|14|15|17|18|19)[0-9]{1}\d{8})$/
                if (value === '') {
                    return callback(new Error('电话号码是必须的'))
                } else if (!reg.test(value)) {
                    return callback(new Error('手机格式不正确'))
                } else{
                    let Params = {
                            username: this.ReginForm.tel
                        }
                    this.$axios.post('/mrbui/bmbucmm1/0010030.do',this.$qs.stringify(Params)).then(res => {
                        if (res.data.gda.msg_cd !== 'MBU00000') {
                           return callback(new Error('手机号已被注册'))
                        }
                        return callback()
                    })
                }
            }
            let realnameCheck= (rule, value, callback) => {
                let reg= /^[\u4E00-\u9FA5]{1,4}$/;
                if (value === '') {
                    return callback(new Error('真实姓名是必须的'))
                } else if (!reg.test(value)) {
                    return callback(new Error('请输入正确真实姓名'))
                } else {
                    return callback()
                }
            }
            let telcodeCheck= (rule, value, callback) => {
                let reg= /^\d{6}\b/
                if (!reg.test(value)) {
                    return callback(new Error('手机验证码格式不正确'))
                } else{
                    return callback()
                }
            }
            return {
                getCode: false,
                btntxt: '获取验证码',
                ReginForm: {
                    tel: '',
                    password: '',
                    confirmpassword: '',
                    realname: '',
                    telcode: '',
                    regincode: '',
                    region_type: '1'
                },
                regining: false,
                rule: {
                    tel: [
                        {
                            required: true,
                            validator: telCheck,
                            trigger: 'blur'
                        }
                    ],
                    telcode: [
                        {
                            required: true,
                            validator: telcodeCheck,
                            trigger: 'blur'
                        }
                    ],
                    password: [
                        {
                            required: true,
                            message: '密码是必须的！',
                            trigger: 'blur'
                        }
                    ],
                    confirmpassword: [
                        {
                            required: true,
                            validator: confirmpasswordCheck,
                            trigger: 'blur'
                        }
                    ],
                    realname: [
                        {
                            required: true,
                            validator: realnameCheck,
                            trigger: 'blur'
                        }
                    ],
                    regincode: [
                        {
                            required: true,
                            max: 16,
                            min: 16,
                            message: '邀请码长度有误',
                            trigger: 'blur'
                        }
                    ]
                }
            }
        },
        methods: {
            // ...
            submit () {
                this.$refs.ReginForm.validate(valid => {
                    if (valid) {
                        this.regining = true
                         // 登录作为参数的用户信息
                        let ReginParams = {
                            username: this.ReginForm.tel,
                            password: this.$md5(this.ReginForm.password),
                            realname: this.ReginForm.realname
                        }
                        this.$axios.post('/mrbui/bmbucmm1/0010020.do',this.$qs.stringify(ReginParams)).then(res => {                        
                        if (res.data.gda.msg_cd !== 'MBU00000') {
                            this.regining = false
                            this.$message({
                                    type: 'error',
                                    message: res.data.gda.msg_dat
                                })
                        } else {
                            this.reset()
                            this.$message({
                                type: 'success',
                                message: '注册成功,请前往登陆页面登陆'
                            })
                        }
                    }).catch((err) => {
                          console.log(err.response);
                        })
                    } else {
                        console.log('submit err')
                    }
                    this.regining = false
                })
            },
            reset () {
                this.$refs.ReginForm.resetFields()
            },
            tologin () {
                this.$router.push('/mrbui/login')
            },
            //验证手机号码部分
            sendcode(){
                // 让手机号码验证的结果弹出来
                this.$refs.ReginForm.validateField('tel');
                // 再验证一遍，要是手机号码没问题，就发送验证码
                var reg=11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
                console.log(this.ReginForm.tel)
                if(!this.ReginForm.tel==''&&reg.test(this.ReginForm.tel)){
                    this.time=60;
                    this.getCode=true;
                    this.timer();
                } else {

                }
            },
            timer() {
                if (this.time > 0) {
                    this.time--;
                    this.btntxt=this.time+"s后重新获取";
                    setTimeout(this.timer, 1000);
                } else{
                    this.time=0;
                    this.btntxt="获取验证码";
                    this.getCode=false;
                }
            }

        }
    }
</script>

<style scoped>
    .regform {
       
        border-radius: 25px;
        text-align: right;
        display: block;
        margin-top: 0em;
        width: 360px;

    }
    .submitBtn {
        width: 100%;
    }
    .to {
        color: #FA5555;
        cursor: pointer;
    }
    .telcodeBtn {
        float:left;
        width: 50%;
        font-size: 8px;
    }
    .register-container {
      background: #fff;
      padding: 80px 15px 80px 60px;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      height: 600px;
    }
    .register-container > .fl {
      padding-right: 110px;
      border-right: 1.5px dashed #ccc;
    }
    .register-container i {
      font-size: 20px;
      font-weight: bold;
      color: #ff9c00;
      padding-right: 25px;
    }
    .register-container .fr {
      position: relative;
      padding-right: 90px;
    }
    .register-container .fr img {
      position: absolute;
      right: 0;
      top: -45px;
    }
    .register-container h1 {
      color: #2d2d2d;
      font-size: 20px;
    }
    .register-container ul {
      margin-top: 40px;
    }
    .register-container .yellow {
      color: #ff9c00;
    }
    .register-container li {
      margin-bottom: 35px;
    }
    .register-container li span {
      font-size: 16px;
      color: #666;
    }
    .register-container li.offset {
      margin-left: 70px;
    }
    .register-container p {
      font-weight: bold;
      color: #292927;
      font-size: 16px;
      margin-left: 40px;
    }
    .bottom {
        margin-left: 75px;
        text-align: left;
        color: #6b6b6b;
        font-size: 14px;
        margin-top: 20px;
    }
    .fl {
        float: left;
    }

</style>