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
        <el-footer>
          <div style="display: flex; align-items: center;">
            <el-input v-model="message" placeholder="请输入消息" @focus="expandInputBox()"
                      :style="{height: inputBoxHeight + 'px'}"></el-input>
            <el-button @click="sendMessage()">发送</el-button>
          </div>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import {ref, reactive} from 'vue';
import axios from 'vue-axios';
import {useRoute, useRouter} from 'vue-router';
import Cookies from 'js-cookie';
import {ElInput, ElButton, ElContainer, ElAside, ElMain, ElFooter} from 'element-plus';
import {ChatSquare, Plus, Tools, Shop, Moon, Help, Setting} from "@element-plus/icons-vue";
import AsidePage from "@/components/chat/AsidePage.vue";

const buttons = ref([]);
const inputBoxHeight = ref(50);

const inputA1 = ref('');
const inputA2 = ref('');
const inputB1 = ref('');
const inputB2 = ref('');
const inputC1 = ref('');
const inputC2 = ref('');

const message = ref('');

function addNewButton(buttonName) {
  const newButtonName = `${buttonName}${buttons.value.length + 1}`;
  buttons.value.push(newButtonName);
}

function expandInputBox() {
  inputBoxHeight.value = 250;
}

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
.aside-all {
  width: 250px;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
