<template>
      <el-tabs v-model="activeName" class="demo-tabs" style="margin-left: 20px;margin-right: 20px">
        <el-tab-pane label="讯飞星火" name="xunfei">
            <div class="centered-card">
            <el-card class="box-card">
                                <div class="text item">
                                    <el-form label-position="top" :model="gptForm" :size="formSize"
                                        label-width="auto" status-icon>
                                        <el-form-item label="API接口地址">
                                            <el-input v-model="xfForm.APIUrl" placeholder="如ws://spark-api.xf-yun.com/v3.1/chat"/>
                                        </el-form-item>
                                        <el-form-item label="APIKey">
                                            <el-input v-model="xfForm.APIKey" placeholder="在控制台获取"/>
                                        </el-form-item>
                                        <el-form-item label="APISecret">
                                            <el-input v-model="xfForm.APISecret" placeholder="在控制台获取"/>
                                        </el-form-item>
                                        <el-form-item label="APPID">
                                            <el-input v-model="xfForm.app_id" placeholder="在控制台获取"/>
                                        </el-form-item>
                                        <el-form-item label="模型版本(请与接口地址保持一致)">
                                            <el-input v-model="xfForm.domain" placeholder="如generalv2,generalv3,generalv3.5"/>
                                        </el-form-item>
                                        <el-form-item label="最大token">
                                                <el-input v-model="xfForm.max_tokens" placeholder="模型回答的tokens的最大长度"/>
                                        </el-form-item>
                                        <el-form-item label="温度(决定结果随机性)">
                                            <el-input v-model="xfForm.temperature" placeholder="取值范围 (0,1] ,默认值0.5"/>
                                        </el-form-item>
                                        <el-form-item>
                                            <el-button type="primary" @click="savexf">
                                                保存
                                            </el-button>
                                        </el-form-item>
                                    </el-form>
                                </div>
                            </el-card></div>
                        
        </el-tab-pane>
        <el-tab-pane label="ChatGPT" name="chatgpt">
            <div class="centered-card">
                <el-card class="box-card">
                    <div class="text item">
                                <el-form label-position="top" :model="gptForm" :size="formSize"
                                    label-width="auto" status-icon>
                                    <el-form-item label="API接口地址">
                                        <el-input v-model="gptForm.apiUrl" placeholder="如https://api.openai.com/v1/chat/completions"/>
                                    </el-form-item>
                                    <el-form-item label="APIKey">
                                        <el-input v-model="gptForm.apiKey" placeholder="在控制台获取"/>
                                    </el-form-item>
                                    <el-form-item label="app_code">
                                        <el-input v-model="gptForm.app_code" placeholder="为部分中转平台设置,可不填"/>
                                    </el-form-item>
                                    <el-form-item label="模型名称">
                                        <el-input v-model="gptForm.model" placeholder="如gpt-3.5-turbo"/>
                                    </el-form-item>
                                    <el-form-item label="最大token">
                                        <el-input v-model="gptForm.max_tokens" placeholder="模型回答的tokens的最大长度"/>
                                    </el-form-item>
                                    <el-form-item label="温度(决定结果随机性)">
                                        <el-input v-model="gptForm.temperature" placeholder="取值范围 (0,1] "/>
                                    </el-form-item>
                                    <el-form-item label="预设内容">
                                        <el-input v-model="gptForm.presets" type="textarea" :rows="4" placeholder="请填写你对机器人的设定和要求"/>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button type="primary" @click="savegpt">
                                            保存
                                        </el-button>
                                    </el-form-item>
                                </el-form>
                            </div>
                        </el-card>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="通义千问" name="tongyi">
                    <div class="centered-card">
                        <el-card class="box-card">
                            <div class="text item">
                                    <el-form label-position="top" :model="tyForm" :size="formSize"
                                        label-width="auto" status-icon>
                                        <el-form-item label="API接口地址">
                                            <el-input v-model="tyForm.apiUrl" placeholder="如https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation"/>
                                        </el-form-item>
                                        <el-form-item label="APIKey">
                                            <el-input v-model="tyForm.apiKey" placeholder="在阿里云开通DashScope并创建API-KEY"/>
                                        </el-form-item>
                                        <el-form-item label="温度">
                                            <el-input v-model="tyForm.temperature" placeholder="取值范围：[0, 2),用于控制随机性和多样性的程度"/>
                                        </el-form-item>
                                        <el-form-item label="模型名称">
                                            <el-input v-model="tyForm.model" placeholder="如qwen-turbo"/>
                                        </el-form-item>
                                        <el-form-item label="最大token">
                                            <el-input v-model="tyForm.max_tokens" placeholder="模型回答的tokens的最大长度"/>
                                        </el-form-item>
                                        <el-form-item label="预设内容">
                                            <el-input v-model="tyForm.presets" type="textarea" :rows="4" placeholder="请填写你对机器人的设定和要求"/>
                                        </el-form-item>
                                        <el-form-item>
                                            <el-button type="primary" @click="savety">
                                                保存
                                            </el-button>
                                        </el-form-item>
                                    </el-form>
                                </div>
                            </el-card>
                        </div>
                </el-tab-pane>
      </el-tabs>

</template>
<script>
import { onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import axios from 'axios'

export default {
    setup() {
        const formSize = ref('default')
        const activeName = ref('xunfei')

        const xfForm = ref({
            APIUrl: '',
            APIKey: '',
            app_id: '',
            model: '',
            APISecret: '',
            max_tokens: '',
            temperature: ''
        })
        
        const gptForm = ref({
            apiUrl: '',
            apiKey: '',
            app_code: '',
            model: '',
            max_tokens: '',
            temperature: '',
            presets: ''
        })

        const tyForm = ref({
            apiUrl: '',
            apiKey: '',
            temperature: '',
            model: '',
            max_tokens: '',
            presets: '',
        })

        const savexf = async () => {
            try {
                const response = await axios.post('/xfconfig', xfForm.value)
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
        }

        const savegpt = async () => {
            try {
                const response = await axios.post('/gptconfig', gptForm.value)
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
        }

        const savety = async () => {
            try {
                const response = await axios.post('/tyconfig', tyForm.value)
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
        }

        onMounted(async () => {
            try {
                const xfresponse = await axios.post('/getxfconfig')
                const xfconfigData = xfresponse.data.msg
                // 更新 Form 的值
                xfconfigData.forEach(item => {
                    xfForm.value[item.config] = item.value
                })

                const gptresponse = await axios.post('/getgptconfig')
                const gptconfigData = gptresponse.data.msg
                gptconfigData.forEach(item => {
                    gptForm.value[item.config] = item.value
                })
                
                const tyresponse = await axios.post('/gettyconfig')
                const tyconfigData = tyresponse.data.msg
                tyconfigData.forEach(item => {
                    tyForm.value[item.config] = item.value
                })

            } catch (error) {
                ElMessage.error('查询失败！', error.message)
            }
        })

        return {
            formSize,
            gptForm,
            activeName,
            savegpt,
            xfForm,
            savexf,
            savety,
            tyForm
        }
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