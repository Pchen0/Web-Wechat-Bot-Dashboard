<template>
    <div>
        <Header />
        <el-button type="primary" @click="open">清空数据</el-button>
        <el-table :data="tableData" style="width: 100%" table-layout="auto" stripe border>
            <el-table-column prop="time" label="时间" />
            <el-table-column prop="type" label="类型" />
            <el-table-column prop="roomname" label="群聊名称" />
            <el-table-column prop="name" label="发送人" />
            <el-table-column prop="recmsg" label="收到消息" />
            <el-table-column prop="senmsg" label="发送消息" />
        </el-table>
    </div>
</template>

<script>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import Header from './Header.vue'
import { ElMessage, ElMessageBox} from 'element-plus'

export default {
    components: {
        Header,
    },

    setup() {
        const tableData = ref([])

        const open = () => {
            ElMessageBox.confirm(
                '此操作会清除所有记录，是否继续？',
                '警告',
                {
                    confirmButtonText: '继续',
                    cancelButtonText: '取消',
                    type: 'warning',
                }
            )
                .then(clear)
                .catch(() => {
                    ElMessage({
                        type: 'info',
                        message: '操作已取消',
                    })
                })
        }

        const clear = async () => {
            try {
                const response = await axios.post('/clearmessage')
                const status = response.data.status
                const msg = response.data.msg
                if (status === 200) {
                    ElMessage.success(msg)
                    window.location.reload()
                } else {
                    ElMessage.error('清除失败！' + msg)
                }
            } catch (error) {
                ElMessage.error('清除失败！', error.message)
            }
        }

        onMounted(async () => {
            try {
                const response = await axios.post('/messagehistory')
                tableData.value = response.data.msg
            } catch (error) {
                ElMessage.error('获取数据失败！')
            }
        })

        return {
            tableData,
            clear,
            open,
           
        }
    },
}
</script>
