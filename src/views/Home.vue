<template>
     <div class="common-layout">
        <el-container>
        <el-aside width="80px">
            <el-row class="tac" style="height: 100vh;">
                <el-menu  class="el-menu" style="background-color: skyblue" collapse>
                    <el-menu-item index="1" @click="handleRouter('/aichat')">
                        <el-icon><Comment /></el-icon>
                    </el-menu-item>
                    <el-menu-item index="2" @click="handleRouter('/wxlogin')">
                        <el-icon><CameraFilled /></el-icon>
                    </el-menu-item>
                    <el-menu-item index="3" @click="handleRouter('/history')">
                        <el-icon><Promotion /></el-icon>
                    </el-menu-item>
                    <el-menu-item index="4" @click="handleRouter('/config')">
                        <el-icon><Tools /></el-icon>
                    </el-menu-item>
                    <el-menu-item index="5" @click="logout">
                        <el-icon><CircleCloseFilled /></el-icon>
                    </el-menu-item>
                </el-menu>      
            </el-row>
          </el-aside>
     <el-main class="main-container">
            <div class="centered-content" v-if="!isLogin">
              <h1>尚未登录微信o(╥﹏╥)o</h1>
              <el-button type="primary" round class="loginbutton" @click="handleRouter('/wxlogin')">点我登录</el-button>
              <el-button type="primary" round class="loginbutton" @click="handleRouter('/config')">系统设置</el-button>
            </div>
            <div class="centered-content" v-else>
                  <h1>{{wxname}}，欢迎你！(*^▽^*)</h1>
                  <el-avatar shape="square" :size="100" :fit="fit" src="/getavatar" /><br><br>
                  <el-button type="primary" round class="loginbutton" @click="handleRouter('/history')">发送历史</el-button>
                  <el-button type="primary" round class="loginbutton" @click="handleRouter('/config')">系统设置</el-button><br><br>
                  <el-button type="primary" round class="loginbutton" @click="handleRouter('/aichat')">对话测试</el-button>
                  <el-button type="primary" round class="loginbutton" @click="wxlogout">退出微信</el-button>
            </div>
          </el-main>
        </el-container>
      </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import axios from 'axios'

export default {
    setup() {
        const isLogin = ref(false)
        const wxname = ref('')

        onMounted(
            async function () {
            try {
                const response = await axios.get('/getstatus')
                if (response.data.status === 200) {
                isLogin.value = true
                const response = await axios.get('/getwxname')
                wxname.value = response.data.wxname
                }  else if (response.data.status === 401) {
                    ElMessage.error('登录已过期，请重新登录！')
                }
            } catch (error) {
                ElMessage.error('获取登录状态失败！')
            }
    })

        return {
            isLogin,
            wxname
        }

},
    methods: {
        wxlogout() {
            ElMessageBox.confirm(
                '是否退出微信登录？',
                '警告',
                {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'warning',
                }
            )
                .then(async () => {
                    try {
                        const response = await axios.get('/stop');
                        const statusCode = response.status;
                        if (statusCode === 200) {
                            ElMessage.success('退出微信成功！')
                            window.location.reload();
                        } else {
                            ElMessage.error('退出微信失败！');
                        }
                    } catch (error) {
                        ElMessage.error('退出微信失败！' + error.message);
                    }
                })
                .catch(() => {
                    // 用户点击了取消按钮
                    ElMessage({
                        type: 'info',
                        message: '操作已取消',
                    });
                });
        },
        
        logout() {
            ElMessageBox.confirm(
                '是否退出登录？',
                '警告',
                {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'warning',
                }
            )
                .then(() => {
                    // 清除本地存储的 token
                    window.localStorage.removeItem('token')
                    ElMessage.success('退出登录成功！')
                    this.$router.push('/login')
                })
                .catch(() => {
                    // 用户点击了取消按钮
                    ElMessage({
                        type: 'info',
                        message: '操作已取消',
                    });
                });
        },


        handleRouter(route) {
            this.$router.push(route);
        },
    },
}
</script>

<style scoped>
.main-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.centered-content {
  text-align: center;
}
</style>