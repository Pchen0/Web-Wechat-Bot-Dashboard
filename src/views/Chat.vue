<template>
    <Header />
    <div id="chat-container">
        <div id="chat-messages" style="overflow-y: scroll;">
            <div v-for="(message, index) in messages" :key="index" :class="message.type + '-message-container'">
                <el-avatar v-if="message.type === 'bot' && isLogin == false">Bot</el-avatar>
                <el-avatar v-if="message.type === 'bot' && isLogin == true" src="/getavatar" />
                <el-card :class="message.type + '-message-card'">{{ message.content }}</el-card>
                <el-avatar v-if="message.type === 'you'">You</el-avatar>
            </div>
        </div>
        <div id="user-input"
            style="display: flex;justify-content: space-between;align-items: center;position: fixed;bottom: 0;width: 100%;padding: 10px;box-sizing: border-box;background-color:white">
            <el-input v-model="textarea" clear :autosize="{ minRows: 1, maxRows: 4 }" type="textarea"
                placeholder="在此输入消息..." style="flex-grow: 1;margin-right: 10px;" />
            <el-button type="primary" round class="loginbutton" @click="sendMessage()">发送</el-button>
        </div>
    </div>

</template>

<script>
import axios from 'axios'
import Header from './Header.vue'
import { ElMessage } from 'element-plus'
import { ref, onMounted } from 'vue'

export default {
    components: {
        Header,
    },
    setup() {
        const textarea = ref('')
        const messages = ref([])
        const isLogin = ref(false)

        onMounted(
            async function () {
                try {
                    const response = await axios.get('/getstatus')
                    if (response.data.status === 200) {
                        isLogin.value = true
                    } else if (response.data.status === 401) {
                        ElMessage.error('登录已过期，请重新登录！')
                    }
                } catch (error) {
                    ElMessage.error('获取登录状态失败！')
                }
            })

        const sendMessage = async () => {
            if (textarea.value === '') {
                ElMessage.error('不能发送空白消息！')
                return
            }

            try {
                messages.value.push({ content: textarea.value, type: 'you' })
                const response = await axios.post('/chat', { msg: textarea.value })
                textarea.value = ''
                if (response && response.data.msg) {
                    messages.value.push({ content: response.data.msg, type: 'bot' })
                } else {
                    ElMessage.error('无法从服务器获取消息！')
                }
            } catch (error) {
                ElMessage.error('发送消息时出错，请稍后重试！')
            }
        }

        return {
            textarea,
            messages,
            sendMessage,
            isLogin
        }
    },
}
</script>

<style scoped>
.bot-message-container {
    margin-left: 10px;
    display: flex;
    margin-top: 8px;
    margin-bottom: 7px;
}

.bot-message-card {
    margin-left: 10px;
    width: auto;
    max-width: 70%;
    height: auto;
    word-wrap: break-word;
    padding: 0px;
    border-radius: 10px;
}

.you-message-container {
    justify-content: flex-end;
    margin-right: 10px;
    display: flex;
    margin-bottom: 7px;
    margin-top: 8px;
}

.you-message-card {
    margin-right: 10px;
    width: auto;
    max-width: 80%;
    height: auto;
    word-wrap: break-word;
    padding: 0px;
    border-radius: 10px;
}
</style>