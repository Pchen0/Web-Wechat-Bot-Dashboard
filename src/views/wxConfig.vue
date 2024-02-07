<template>
<div class="centered-card">
    <el-card class="box-card">
        <div class="text item">
            <el-form label-position="top" :model="apiForm" :size="formSize" label-width="auto" status-icon>
                <el-form-item label="选择模型">
                    <el-select v-model="wxForm.usemodel" placeholder="请选择使用模型" clearable>
                        <el-option label="讯飞星火" value="xunfei" />
                        <el-option label="ChatGPT" value="chatgpt" />
                        <el-option label="通义千问" value="tongyi" />
                    </el-select>
                </el-form-item>
                <el-form-item label="自动回复前缀">
                    <el-input v-model="wxForm.prefix" />
                </el-form-item>
                <el-form-item label="自动回复后缀(\n换行)">
                    <el-input v-model="wxForm.suffix" />
                </el-form-item>
                <el-divider />
                <el-form-item label="是否开启私聊自动回复">
                    <el-switch v-model="wxForm.autoReplySingle" />
                </el-form-item>
                <el-form-item label="私聊黑名单(用英文逗号分隔)">
                    <el-input v-model="wxForm.blackName" />
                </el-form-item>
                <el-divider />
                <el-form-item label="群聊关键字回复(用英文逗号分隔)">
                    <el-input v-model="wxForm.keyWords" />
                </el-form-item>
                <el-form-item label="群聊白名单(用英文逗号分隔,不填会在所有群聊回复)">
                    <el-input v-model="wxForm.whiteRoom" />
                </el-form-item>                               

                <el-form-item label="是否在被@时回复">
                    <el-switch v-model="wxForm.atReply" />
                </el-form-item>
                <el-form-item>
                    <el-divider />
                <el-button type="primary" @click="savewx">
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

        const wxForm = ref({
            usemodel:'',
            autoReplySingle: '',
            prefix: '',
            suffix: '',
            atReply: '',
            keyWords:'',
            whiteRoom:'',
            blackName:'',
        })

        const savewx = async () => {
            try {
                // 在上传之前将布尔值转换为字符串
                const dataToSend = { ...wxForm.value }

                // 遍历 wxForm 中的属性，将布尔值转换为字符串
                for (const key in dataToSend) {
                    if (typeof dataToSend[key] === 'boolean') {
                        dataToSend[key] = dataToSend[key].toString()
                    }
                }

                // 发送转换后的数据
                const response = await axios.post('/wxconfig', dataToSend)

                const status = response.data.status
                const msg = response.data.msg

                if (status === 200) {
                    ElMessage.success(msg);
                } else {
                    ElMessage.error('修改失败！' + msg)
                }
            } catch (error) {
                ElMessage.error('修改失败！', error.message)
            }
        }


        onMounted(async () => {
            try {
                const wxresponse = await axios.post('/getwxconfig')
                const wxconfigData = wxresponse.data.msg

                wxconfigData.forEach(item => {
                    // 判断是否是字符串形式的 "true" 或 "false"
                    if (item.value === "true" || item.value === "false") {
                        // 将字符串转为布尔值
                        wxForm.value[item.config] = JSON.parse(item.value)
                    } else {
                        // 如果不是布尔值字符串，直接赋值
                        wxForm.value[item.config] = item.value
                    }
                })
            } catch (error) {
                ElMessage.error('查询失败！', error.message)
            }
        })

        return {
            formSize,
            wxForm,
            activeName,
            savewx,
        };
    },
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