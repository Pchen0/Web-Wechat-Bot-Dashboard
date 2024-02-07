<template>
    <div class="app-container">
        <Header />
        <el-tabs v-model="activeName" type="card" style="margin-top: 15px;">
            <el-tab-pane label="API接口设置" name="first">
                <apiConfig />
            </el-tab-pane>

            <el-tab-pane label="WechatBot设置" name="second">
               <wxConfig />
            </el-tab-pane>

            <el-tab-pane label="账号设置" name="third">
              <accountConfig />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import Header from './Header.vue'
import wxConfig from './wxConfig.vue'
import apiConfig from './apiConfig.vue'
import accountConfig from './acccountConfig.vue'
import { ref } from 'vue'

export default{
    setup() {
        const activeName = ref('first')

        return{
            activeName
        }
    },

    components: {
        Header, wxConfig, apiConfig, accountConfig
    },
}

</script>

<style>
.app-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    /* 让容器占据整个视窗高度 */
}

.Header {
    flex: none;
    /* 不随内容扩展而扩展 */
}
</style>

