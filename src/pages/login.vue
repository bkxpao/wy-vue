<template>
    <el-main>
        <el-form
                :model="LoginForm"
                ref="LoginForm"
                :rules="rule"
                label-width="0"
                class="login-form">
            <h3>用户登录系统</h3>

            <el-form-item prop="username">
                <el-input
                        type="text"
                        v-model="LoginForm.username"
                        placeholder="请输入手机号" >
                </el-input>
            </el-form-item>

            <el-form-item prop="password">
                <el-input
                        type="password"
                        v-model="LoginForm.password"
                        placeholder="请输入密码"
                        @keyup.enter.native="submit">
                </el-input>
            </el-form-item>

            <el-form-item>
                <el-button
                        type="danger"
                        class="submitBtn"
                        round
                        @click.native.prevent="submit"
                        :loading="logining">
                    登录
                </el-button>
                <el-button
                        type="primary"
                        class="resetBtn"
                        round
                        @click.native.prevent="reset">
                    重置
                </el-button>
                <hr>
                <p>还没有账号，马上去<span class="to" @click="toregin">注册</span></p>
            </el-form-item>
        </el-form>
    </el-main>
</template>

<script>
    import axios from 'axios'
    export default {
        data () {
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
                LoginForm: {
                    username: '',
                    password: ''
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
                                this.$router.push('/')
                            }
                            console.log(this.$message)

                        })
                    } else {
                        console.log('submit err')
                    }
                })
            },
            reset () {
                this.$refs.LoginForm.resetFields()
            },
            toregin () {
                this.$router.push('/regin')
            }
        }
    }
</script>

<style scoped>
    .login-form {
        margin: 20px auto;
        width: 310px;
        background: #fff;
        box-shadow: 0 0 35px #B4BCCC;
        padding: 30px 30px 0 30px;
        border-radius: 25px;
    }
    .submitBtn {
        width: 65%;
    }
    .to {
        color: #67C23A;
        cursor: pointer;
    }
</style>
