<template>
    <el-main>
        <el-form
                :model="ReginForm"
                ref="ReginForm"
                :rules="rule"
                class="regform"
                label-width="0">

            <h3>用户注册</h3>

            <el-form-item prop="tel">
                <el-input
                        type="text"
                        v-model.number="ReginForm.tel"
                        placeholder="电话号码">
                    <template slot="prepend">+86</template>
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-input
                        type="text"
                        v-model.number="ReginForm.telcode"
                        placeholder="手机验证码"
                        style="float:left;width:50%;">
                </el-input>
                <el-button type="primary"
                           @click="sendcode"
                           class="telcodeBtn"
                           :disabled="getCode">{{ btntxt }}
                </el-button>
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
            <el-form-item prop="name">
                <el-input
                        type="text"
                        v-model="ReginForm.realname"
                        placeholder="请输入姓名">
                </el-input>
            </el-form-item>
            <el-form-item prop="regincode">
                <el-input
                        type="text"
                        v-model="ReginForm.regincode"
                        placeholder="邀请码">
                </el-input>
            </el-form-item>

            <el-form-item >
                <el-button
                        type="success"
                        class="submitBtn"
                        round
                        @click.native.prevent="submit"
                        :loading="regining">
                    注册
                </el-button>
                <el-button
                        type="primary"
                        class="resetBtn"
                        round
                        @click.native.prevent="reset">
                    重置
                </el-button>
                <hr>
                <p>已经有账号，马上去<span class="to" @click="tologin">登录</span></p>
            </el-form-item>
        </el-form>
    </el-main>
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
                    this.$axios.get('/mrbui/bmbucmm1/0010030.do',{params:{tel:this.ReginForm.tel}}).then(res => {
                        if (res.data.gda.msg_cd !== 'MBU00000') {
                           return callback(new Error('手机号已被注册'))
                        }
                        return callback()
                    })
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
                    regincode: ''
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
                            message: '真实姓名必输',
                            trigger: 'blur'
                        }
                    ],
                    regioncode: [
                        {
                            required: true,
                            max: 12,
                            min: 2,
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
                            tel: this.ReginForm.tel,
                            password: this.$md5(this.ReginForm.password),
                            name: this.ReginForm.realname
                        }
                        this.$axios.post('/mrbui/bmbucmm1/0010020.do',this.$qs.stringify(ReginParams)).then(res => {                        
                            let {msg_cd,msg_dat} = res.data.gda
                            console.log(res.data)
                            console.log(msg_cd,msg_dat)
                        if (msg_cd !== 'MBU00000') {
                            this.logining = false
                            this.$message({
                                    type: 'error',
                                    message: msg_dat
                                })
                        } else {
                            this.reset()
                            this.$message({
                                type: 'success',
                                message: '注册成功,请前往登陆页面登陆'
                            })
                        }

 
                    })
                    } else {
                        console.log('submit err')
                    }
                })
            },
            reset () {
                this.$refs.ReginForm.resetFields()
            },
            tologin () {
                this.$router.push('/login')
            },
            //验证手机号码部分
            sendcode(){
                var reg=11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
                console.log(this.ReginForm.tel)
                //var url="/nptOfficialWebsite/apply/sendSms?mobile="+this.ruleForm.phone;
                if(this.ReginForm.tel==''||!reg.test(this.ReginForm.tel)){
                }else{
                    this.time=60;
                    this.getCode=true;
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
        margin: 20px auto;
        width: 310px;
        background: #fff;
        box-shadow: 0 0 10px #B4BCCC;
        padding: 30px 30px 0 30px;
        border-radius: 25px;
    }
    .submitBtn {
        width: 65%;
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
</style>