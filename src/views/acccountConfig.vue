<template>
    <div class="centered-card">
        <el-card class="box-card">
            <div class="text item">
                <el-form label-position="top" :model="userForm" :size="formSize" label-width="auto" status-icon>
                    <el-form-item label="更改用户名">
                        <el-input v-model="userForm.newusername" />
                    </el-form-item>
                    <el-form-item label="旧密码">
                        <el-input type="password" v-model="userForm.oldpassword" />
                    </el-form-item>
                    <el-form-item label="新密码">
                        <el-input type="password" v-model="userForm.newpassword1" />
                    </el-form-item>
                    <el-form-item label="再次输入新密码">
                        <el-input type="password" v-model="userForm.newpassword2" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="saveuser">
                            保存
                        </el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>
<script>
import { onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import axios from 'axios'

export default {
setup() {
    const formSize = ref('default')
    const activeName = ref('first')

    const userForm = ref({
        newusername: '',
        oldpassword: '',
        newpassword1: '',
        newpassword2: '',
        newpassword: '',
    });

    const saveuser = async () => {
        if (userForm.value.newpassword1 === userForm.value.newpassword2) {
            userForm.value.newpassword = userForm.value.newpassword1
            try {
                const response = await axios.post('/changeaccount', userForm.value)
                const status = response.data.status
                const msg = response.data.msg
                if (status === 200) {
                    ElMessage.success(msg)
                } else {
                    ElMessage.error('修改失败！' + msg)
                }
            } catch (error) {
                ElMessage.error('修改失败！', error.message)
            }
        } else {
            ElMessage.error('两次输入的密码不匹配！')
        }
    }

    onMounted(async () => {
        try {
            const userresponse = await axios.post('/getusername')

            userForm.value.newusername = userresponse.data.msg

        } catch (error) {
            ElMessage.error('查询失败！', error.message)
        }
    })

    return {
        formSize,
        userForm,
        activeName,
        saveuser
    };
}
}

</script>
<style scoped>
.centered-card {
    flex: 1; 
    display: flex;
    justify-content: center;
    align-items: center;
}

.item {
    padding: 20px;
    text-align: center;
}

.box-card {
    width: 100%;
}

@media screen and (min-width: 768px) {
    .box-card {
        width: 30%;
    }
}
</style>