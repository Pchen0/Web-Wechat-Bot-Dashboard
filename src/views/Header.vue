<template>
    <el-menu class="el-menu-demo" mode="horizontal" :ellipsis="false" @select="handleSelect" style="background-color: skyblue;">
        <div class="flex-grow" />
        <el-sub-menu index="1">
            <template #title><ChatLineRound style="width: 35px; margin-left: 8px" /></template>
                <el-menu-item index="1" @click="handleRouter('/')">
                    <el-icon><HomeFilled /></el-icon>
                    <span>首页</span>
                </el-menu-item>
                <el-menu-item index="2" @click="handleRouter('/aichat')">
                    <el-icon><Comment /></el-icon>
                    <span>对话测试</span>
                </el-menu-item>
                <el-menu-item index="3" @click="handleRouter('/wxlogin')">
                    <el-icon><CameraFilled /></el-icon>
                    <span>登录微信</span>
                 </el-menu-item>
                <el-menu-item index="4" @click="handleRouter('/history')">
                    <el-icon><Promotion /></el-icon>
                    <span>发送历史</span>
                </el-menu-item>
                <el-menu-item index="5" @click="handleRouter('/config')">
                   <el-icon><Tools /></el-icon>
                    <span>设置</span>
                </el-menu-item>
                <el-menu-item index="6" @click="logout">
                    <el-icon><CircleCloseFilled /></el-icon>
                    <span>退出登录</span>
                </el-menu-item>
        </el-sub-menu>
    </el-menu>
</template>

<script>
import { ElMessage, ElMessageBox } from 'element-plus'

export default {
    methods:{
        handleRouter(route) {
            this.$router.push(route);
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
                    window.localStorage.removeItem('token');
                    ElMessage.success('退出登录成功！');
                    this.$router.push('/login');
                })
                .catch(() => {
                    // 用户点击了取消按钮
                    ElMessage({
                        type: 'info',
                        message: '操作已取消',
                    });
                });
        },
    }
};
</script>
