<template>
  <div class="common-layout">
    <el-container style="height: 100%;">
      <!-- 左侧栏 -->
      <el-aside class="aside-all">

        <div class="aside-content">
          <!--新增按钮-->
          <div class="new-btn-container">
            <el-button class="new-chat-btn" @click="addNewButton('A')">
              <div class="new-btn-content">
                <el-icon>
                  <Plus/>
                </el-icon>
                <span class="new-btn-text">New chat</span>
              </div>
            </el-button>
          </div>
          <!--对话框的标题-->
          <div class="chat-btn-container">
            <el-button class="chat-new-chat-btn" v-for="button in buttons" :key="button">
              <el-icon>
                <ChatSquare/>
              </el-icon>
              <span class="chat-btn-text">{{ button }}</span>
            </el-button>
          </div>
        </div>


        <div class="aside-footer">
          <el-button>设置</el-button>
          <el-button>帮助</el-button>
          <el-button>注销</el-button>
        </div>
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
import {ChatSquare, Plus} from "@element-plus/icons-vue";

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

.aside-footer {
  border-top: 1px solid #ccc;
  height: 40%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}






.new-btn-container {
  width: 100%;
  display: flex;
  justify-content: center;
}

.new-chat-btn {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-radius: 10px;
}

.new-btn-content {
  display: flex;
  align-items: center;
}

.new-btn-text {
  margin-left: 5px;
}

.new-btn-container {
  width: 100%;
  display: flex;
  justify-content: center;
}

.chat-btn-text {
  margin-left: 5px;
}

.chat-btn-container {
  width: 235px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 0;
}

.chat-new-chat-btn {
  width: 100%;
  height: 45px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-radius: 5px;
  box-sizing: border-box;
  margin: 5px;
  padding: 10px 20px;
}

.aside-content {
  height: 60%;
  display: flex;
  flex-direction: column;
  overflow: auto;
}

.aside-all {
  width: 250px;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
