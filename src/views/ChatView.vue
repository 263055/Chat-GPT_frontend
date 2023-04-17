<template>
  <div class="common-layout">
    <el-container style="height: 100%;">
      <!-- 左侧栏 -->
      <el-aside class="aside-all">
        <aside-page/>
      </el-aside>

      <el-container>
        <!-- 中间部分 -->
        <el-main>
          <div style="text-align: center; margin-bottom: 20px;">
            <h3>欢迎来到学习天堂</h3>
            <div style="display: flex;">
              <div style="flex: 1;">
                <h4>标题A</h4>
                <div>
                  <el-input v-model="inputA1" placeholder="文本框1"></el-input>
                </div>
                <div>
                  <el-input v-model="inputA2" placeholder="文本框2"></el-input>
                </div>
              </div>
              <div style="flex: 1;">
                <h4>标题B</h4>
                <div>
                  <el-input v-model="inputB1" placeholder="文本框1"></el-input>
                </div>
                <div>
                  <el-input v-model="inputB2" placeholder="文本框2"></el-input>
                </div>
              </div>
              <div style="flex: 1;">
                <h4>标题C</h4>
                <div>
                  <el-input v-model="inputC1" placeholder="文本框1"></el-input>
                </div>
                <div>
                  <el-input v-model="inputC2" placeholder="文本框2"></el-input>
                </div>
              </div>
            </div>
          </div>
        </el-main>

        <!-- 底部栏 -->
        <el-footer class="footer-container">
          <div class="footer-input-wrapper">
            <el-input
                v-model="message"
                :autosize="{ minRows: 2, maxRows: 9 }"
                type="textarea"
                placeholder="Please input"
                clearable
                class="el-textarea__inner"
            />
          </div>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import axios from 'vue-axios';
import {useRoute, useRouter} from 'vue-router';
import Cookies from 'js-cookie';
import {ElInput, ElContainer, ElAside, ElMain, ElFooter} from 'element-plus';
import AsidePage from "@/components/chat/AsidePage.vue";

const inputA1 = ref('');
const inputA2 = ref('');
const inputB1 = ref('');
const inputB2 = ref('');
const inputC1 = ref('');
const inputC2 = ref('');

const message = ref('');
const input = ref('');

async function sendMessage() {
  const route = useRoute();
  const router = useRouter();
  const token = Cookies.get('token');
  const response = await axios.post(`/sentMessage?token=${token}`, {message: message.value});
  if (response.data.success) {
    router.push({name: 'MessageSent', params: {message: message.value}});
  }
}

</script>

<style scoped>
.footer-container {
  height: 0;
  position: relative;
}

.footer-input-wrapper {
  position: absolute;
  bottom: 0;
  width: 80%;
}

.aside-all {
  width: 250px;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
