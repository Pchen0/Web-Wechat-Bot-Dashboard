<template>
  <div class="app-container">
    <Header />
    <div class="login-container">
      <el-card class="box-card">
        <div class="text item">
          <h2 v-if="!scanSuccessNotified">请扫描二维码登录微信</h2>
          <h2 v-else-if="!loginSuccessNotified ||scanSuccessNotified">请在手机上确认登录</h2>
          <h2 v-else-if="loginSuccessNotified">微信登录成功</h2>
          <img :src="qrcodeUrl" class="image" v-if="!scanSuccessNotified" />
          <el-icon v-else class="image" style="height: 100px;"><CircleCheckFilled /></el-icon>
          <div class="bottom">
            <el-button type="primary" round class="loginbutton" @click="refresh">刷新二维码</el-button><br>
            <el-button type="primary" round class="loginbutton" @click="handleRouter('/')">返回首页</el-button>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
import Header from './Header.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref, onMounted } from 'vue'
import axios from 'axios'

export default {
    setup() {
      const qrcodeUrl = ref("")
      const scanSuccessNotified = ref(false)
      const loginSuccessNotified = ref(false)


      onMounted(
        async () =>{
        ElMessageBox.confirm(
          '若已有微信登录，继续获取二维码会使当前登录微信下线，是否继续？',
          '警告',
          {
            confirmButtonText: '继续',
            cancelButtonText: '取消',
            type: 'warning',
          }
        )
          .then(getqrcode)
          .catch(() => {
            ElMessage({
              type: 'info',
              message: '操作已取消',
            })
          })
        }
      )

    const getqrcode = async () => {
      try {
        getStatus()
        const response = await axios.get('/getqrcode');
        qrcodeUrl.value = response.data.qrcode
      } catch (error) {
        ElMessage.error('获取二维码失败！')
      }

      //对扫描状态进行轮询
      getStatus()

      setInterval(() => {
        getStatus()
      }, 500)
    }

    const refresh = async () => {
      try {
        const response = await axios.get('/stop')
        const statusCode = response.data.Status
        if(statusCode === 200) {
          window.location.reload()
        } else {
          ElMessage.error('刷新二维码失败！')
        }
      } catch (error) {
        ElMessage.error('刷新二维码失败！' + error.message)
      }
    }

    const getStatus = async () => {
      try {
        const response = await axios.get('/getstatus')
        const statusCode = response.data.status
        if (statusCode === 3) {
          // 扫描成功提醒
          if (!scanSuccessNotified.value) {
            ElMessage.success('扫描成功，请在手机上确认登录')
            // 提醒后将变量设为 true
            scanSuccessNotified.value = true
          }
          return;
        }
        if (statusCode === 200) {
          // 登录成功提醒
          if (!loginSuccessNotified.value) {
            ElMessage.success('微信登录成功！')
            loginSuccessNotified.value = true
          }
          return
         }      
         } catch (error) {
          return
      }
    }

    return {
      qrcodeUrl,
      scanSuccessNotified,
      loginSuccessNotified,
      refresh
    }
  },

    methods:{
      handleRouter(route) {
      this.$router.push(route);
    },
    },

    components: {
        Header
    }

}
</script>
<style scoped>
h2 {
  color: #409eff;
  text-align: center;
}

.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh; 
}

.item {
  padding: 20px;
  text-align: center;
}

.login-container {
  flex: 1; 
  display: flex;
  justify-content: center;
  align-items: center;
}

.box-card {
  width: 60%;

}

.loginbutton {
  margin-top: 10px;
}

@media screen and (min-width: 768px) {
  .box-card {
    width: 20%;
  }
}
</style>