<template>
    <div class="login-container">
        <el-card class="box-card">
          <div class="item">
            <h2>用户登录</h2>
            <el-input v-model="usernameinput" placeholder="用户名" class="usernameinput" />
            <el-input v-model="passwordinput" class="passwordinput" type="password" placeholder="密码" show-password />
            <el-checkbox v-model="remember" label="记住我" class="remember" /></div><div class="item">
            <el-button type="primary" round @click="userlogin" >登录</el-button>
          </div>
          
        </el-card>
    </div>

</template>

<script>
import { ElMessage } from 'element-plus'
import {ref} from 'vue'
import axios from 'axios'

export default {
    setup() {
        const passwordinput = ref('')
        const usernameinput = ref('')
        const remember = ref(false)
    
        return { usernameinput , passwordinput, remember }
    },

    methods:{
        async userlogin() {
            try {
                // 获取输入框内容
                const username = this.usernameinput
                const password = this.passwordinput
                const remember = this.remember

                if(username.length===0||password.length===0){
                  ElMessage.error('用户名和密码不能为空！')
                  return
                }

                // 发送登录请求
                const response = await axios.post('/userlogin', {
                    username: username,
                    password: password,
                    remember: remember
                })

                if (response) {
                  const status = response.data.status
                  const msg = response.data.msg
                  if (status === 500) {
                    ElMessage.error('登录失败！'+ msg)
                  } else if (status ===200){
                    const token = response.data.token
                    localStorage.setItem('token', token)
                    ElMessage.success('登录成功！')
                    this.$router.push('/')
                  } else {
                      ElMessage.error('登录失败！请稍后再试')
                  }
                } else {
                  ElMessage.error('登录失败！服务器无响应')
                }

            } catch (err) {
                ElMessage.error('登录失败！请稍后再试')
            }
        },
    }
};
</script>

<style scoped>
h2 {
  color: #409eff;
  text-align: center;
}

.usernameinput {
  margin-bottom: 25px;

}

.remember {
  float: right;
}

.item {
  padding: 20px;
  text-align: center;
}

.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh; 
}

.box-card {
  width: 80%;
}

@media screen and (min-width: 768px) {
  .box-card {
    width: 30%;
  }
}
</style>