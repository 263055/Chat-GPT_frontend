<template>
  <div class="footer-input-wrapper">
    <!--消息发送框-->
    <div class="input-container">
      <el-input
          v-model="message"
          :autosize="{ minRows: 2, maxRows: 9 }"
          type="textarea"
          placeholder="输入你的问题,按Enter快捷发送,Shift+Enter换行"
          maxlength="1024"
          show-word-limit
          @keydown.enter.prevent="onEnter"
      ></el-input>
    </div>
    <!-- 底部按钮-->
    <div class="button-group">
      <el-button type="primary" @click="sentMessage" :disabled="isDisabled">发送</el-button>
      <el-button type="danger" @click="removeMessage">重置</el-button>
    </div>
  </div>
</template>

<script setup>
import {ElInput, ElButton, ElMessage} from 'element-plus';
import {inject, ref} from "vue";
import {useStore} from "@/stores";
import axios from "axios";

let url = ref('');
let isDisabled = ref(false);
let source = null
const message = ref('');
const isMinimized = ref(true)
const store = useStore()
const state = inject('scrollToBottom'); // 调用滚动底部的方法
const state1 = inject('scrollToBottom1'); // 调用滚动底部的方法
const lastSentTime = ref(0);

const onEnter = (e) => {
  if (e.shiftKey) {
    // 如果按下的是shift+enter，则执行换行
    message.value += '\n';
  } else {
    // 否则执行sentMessage方法
    sentMessage();
  }
};

// 发送消息
const sentMessage = () => {
  const pattern = /\/chat\/\d{18}/;
  url = window.location.href;
  if (!pattern.test(url)) {
    ElMessage.error("请点击左上角的按钮,新建并选择一个对话后在开始发消息");
    return;
  }
  if (!message.value) {
    ElMessage.error("请在对话框中输入完整的消息,再点击发送按钮");
    return;
  }
  const currentTime = Date.now();
  const timeDifference = currentTime - lastSentTime.value;
  if (timeDifference < 1000) {
    ElMessage.error('请等待一秒钟再发送请求');
    return;
  }
  lastSentTime.value = currentTime;

  axios.post('/balance/getBalanceIsOk',
      {
        mail : localStorage.getItem('mail'),
        type : store.userSetting.type,
      }, {
        headers: {
          "content-type": "application/json",
          "satoken": localStorage.getItem('tokenValue')
        }
      }).then(function (response) {
    if (response.data.code === 1) {
      addComment()
    } else {
      ElMessage.warning(response.data.msg)
    }
  }).catch(function () {
    ElMessage.warning('消息发送失败,请你检查网络问题或联系管理员')
  });
}

// 进行对话
function addComment() {
  if (!message.value) {
    ElMessage.error("请在对话框中输入完整的消息,再点击发送按钮");
    return;
  }
  store.arr.push([]); // 添加新的空数组
  const newCommentArray = store.arr[store.arr.length - 1]; // 获取新增的空数组
  scrollToBottom() // 滚动到底部
  newCommentArray.push(''); // 为新增的空数组添加第一个值
  newCommentArray[0] = message.value;
  newCommentArray.push(''); // 为新增的空数组添加第2个值
  const headers = {
    "content-type": "application/json",
    "satoken": localStorage.getItem('tokenValue')
  }
  isDisabled = true // 按钮是否可以使用
  const params = new URLSearchParams({
    userComment: message.value,
    buttonId: store.curButton.id,
    mail : localStorage.getItem('mail'),
    region: store.curButton.region,
    maxContext: store.userSetting.maxContext,
    temperature: store.userSetting.temperature,
    frequencyPenalty: store.userSetting.frequencyPenalty - 2.0,
    presencePenalty: store.userSetting.presencePenalty - 2.0,
    type: store.userSetting.type,
  }).toString()
  source = new EventSource(`/api/comment/addCommentDetail/?${params}`, {headers}) // aaaa 2
  // source = new EventSource(`http://localhost:8080/comment/addCommentDetail/?${params}`, {headers})
  source.onmessage = (event) => {
    if (event.data !== '[DONE]') {
      const eventData = JSON.parse(event.data); // 将JSON字符串解析为JavaScript对象
      const content = eventData.content; // 从JavaScript对象中访问 "content" 属性
      newCommentArray[1] += content;
      // newCommentArray[1] += event.data.replace(/<br>*/g, "\n").replace(/&#32;/g, " ");
      scrollToBottom1() // 判断与底部的距离决定是否滚动到底部
    } else {
      isDisabled = false
      source.close()
    }
  }
  message.value = ''
  source.addEventListener('error', () => {
    source.close()
  })
  source.addEventListener('complete', () => {
    source.close()
  })
}

// 调用其他组件的滚动底部的方法
function scrollToBottom() {
  if (state.scrollToBottom) {
    state.scrollToBottom();
  }
}

function scrollToBottom1() {
  if (state1.scrollToBottom1) {
    state1.scrollToBottom1();
  }
}

// 清空消息
const removeMessage = () => {
  message.value = ''
  isDisabled = false
}
</script>

<style scoped>
/*整体布局*/
.footer-input-wrapper {
  position: fixed;
  bottom: 0;
  width: 80%;
  margin-bottom: 7px;
  display: flex;
  align-items: flex-end;
}

/*输入框的布局*/
.input-container {
  width: 85%;
  margin-right: 15px;
  display: flex;
  justify-content: center;
}

/*按钮的布局*/
.button-group {
  position: relative;
  display: flex;
  justify-content: flex-end;
  margin-top: 5px;
}
</style>
