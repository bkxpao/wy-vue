  <template>
<div>
    <div class="dialog-container">
      <div class="mian-container w1200">
        <div class="form-container">
          <div class="title-container hidden">
            <h2 class="fl">登录</h2>
          </div>
          <div class="content-container">
            <el-form
              :model="LoginForm"
              ref="LoginForm"
              :rules="rule"
              label-width="0"
              class="login-form">
              <el-form-item prop="username" style="margin-bottom: 20px">
                <el-input
                  type="text"
                  v-model="LoginForm.username"
                  placeholder="请输入手机号" >
                </el-input>
              </el-form-item>
              <el-form-item prop="password" style="margin-bottom: 20px">
                <el-input
                  type="password"
                  v-model="LoginForm.password"
                  placeholder="请输入密码"
                  @keyup.enter.native="submit">
                </el-input>
              </el-form-item>
              <el-form-item>    
                <div class="identifybox">
                  <el-form-item prop="verifycode" style="margin-bottom: 20px;width: 60%;">
                    <el-input v-model="LoginForm.verifycode" placeholder="请输入验证码" class="identifyinput"></el-input>
                 </el-form-item>
                  <div @click="refreshCode" style="width: 39%">
                    <s-identify :identifyCode="identifyCode"></s-identify>
                  </div>
                </div>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  class="submitBtn"
                  @click.native.prevent="submit"
                  :loading="logining">
                  登录
                </el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>      
    </div>
</div>
</template>

<script>
    import axios from 'axios'
    import SIdentify from '../components/base/sIdentify.vue'
    export default {
        mounted() {
          // 验证码初始化
          this.identifyCode = ''
          this.makeCode(this.identifyCodes, 4)
        },
        components: {
            sIdentify: SIdentify
        },
        data () {
            // 验证码自定义验证规则
            const validateVerifycode = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入验证码'))
                } else if (value !== this.identifyCode) {
                    console.log('validateVerifycode:', value)
                    callback(new Error('验证码不正确!'))
                } else {
                    callback()
                }
            }
            let telCheck = (rule, value, callback) => {
                let reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/
                if (value === '') {
                    return callback(new Error('手机号不能为空'))
                } else if (!reg.test(value)) {
                    return callback(new Error('手机格式不正确'))
                } else {
                    callback()
                }
            }
            return {
              identifyCodes: '1234567890',
              identifyCode: '',
                LoginForm: {
                    username: '',
                    password: '',
                    verifycode: ''
                },
                logining: false,
                rule: {
                    username: [
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
                    verifycode: [
                        { 
                            required: true, 
                            trigger: 'blur', 
                            validator: validateVerifycode 
                        }
                    ]
                }
            }
        },
        methods: {
            submit () {
                this.$refs.LoginForm.validate(valid => {
                    if (valid) {
                        this.logining = true
                        console.log('开始请求后台数据，验证返回之类的操作！')
                        // 登录作为参数的用户信息
                        let LoginParams = {
                            username: this.LoginForm.username,
                            password: this.$md5(this.LoginForm.password)
                        }
                        // 调用axios登录接口
                        this.$axios.post('/mrbui/bmbucmm1/0010010.do',this.$qs.stringify(LoginParams)).then(res => {
                            this.logining = false
                            // 根据返回的code判断是否成功
                            console.log(res.data)
                            let {gda, username, token_id, func, personal_sts, company_sts,company_no} = res.data
                            console.log(res.data.gda.msg_cd)
                            if (res.data.gda.msg_cd !== 'MBU00000') {
                                this.$message({
                                    type: 'error',
                                    message: res.data.gda.msg_cd
                                })
                            } else {
                                this.$message({
                                    type: 'success',
                                    message: '登陆成功'
                                })
                                // 将返回的数据注入sessionStorage
                                console.log(JSON.stringify(username))
                                sessionStorage.setItem('username', username)
                                sessionStorage.setItem('token', token_id)
                                sessionStorage.setItem('functions', JSON.stringify(func))
                                sessionStorage.setItem('personal_sts',personal_sts)
                                sessionStorage.setItem('company_sts',company_sts)
                                sessionStorage.setItem('company_no',company_no)
                                
                                // 跳转到我的信息的页面
                                this.$router.push('/index')
                            }
                            console.log(this.$message)

                        })
                    } else {
                        console.log('submit err')
                    }
                })
            },
            toregin () {
                this.$router.push('/regin')
            },
             makeCode(o, l) {
              for (let i = 0; i < l; i++) {
              this.identifyCode += this.identifyCodes[
               this.randomNum(0, this.identifyCodes.length)
              ]
              }
              console.log(this.identifyCode)
             },
             // 生成随机数
             randomNum(min, max) {
              return Math.floor(Math.random() * (max - min) + min)
             },
              // 切换验证码
            refreshCode() {
              this.identifyCode = ''
              this.makeCode(this.identifyCodes, 4)
            }
        }
    }
</script>

<style scoped>
    .dialog-container * {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    }
    .form-container {
    width: 360px;
    height: 350px;
    padding: 30px;
    background: #f8fafe;
    float: right;
    margin-right: 10px;
    margin-top: 60px;
    -webkit-border-radius: 4px;
    -webkit-background-clip: padding-box;
    -moz-border-radius: 4px;
    -moz-background-clip: padding;
    border-radius: 4px;
    background-clip: padding-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    }
    .dialog-container {
        padding-top: 0;
        height: 490px;
        background: url(../assets/murong_login_banner.png) center center no-repeat;
    }
    .fr {
    float: right;
    }
    .login-form {
        margin-bottom: 15px;
        width: 100%;
        border-radius: 25px;
    }

    .submitBtn {
        width: 100%;
    }
    .to {
        color: #67C23A;
        cursor: pointer;
    }
    .identifybox{
        display: flex;
        justify-content: space-between;
        margin-top:0px;
    }
    .title-container {
        margin-bottom: 20px;
    }
</style>
