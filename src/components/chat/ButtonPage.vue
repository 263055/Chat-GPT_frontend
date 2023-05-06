<template>
  <div class="footer-input-wrapper">
    <!--消息发送框-->
    <div class="input-container">
      <el-input
          v-model="message"
          :autosize="{ minRows: 2, maxRows: 9 }"
          type="textarea"
          placeholder="输入你的问题,按Enter快捷发送,Shift+Enter换行"
          maxlength="2000"
          show-word-limit
          @keydown.enter.prevent="onEnter"
      ></el-input>
    </div>
    <!-- 底部按钮-->
    <div class="button-group">
      <el-button type="info" @click="sentMessage" :disabled="isDisabled">发送</el-button>
      <el-button type="danger" @click="removeMessage">清空</el-button>
    </div>
    <!--    &lt;!&ndash;右下角可伸缩的提示框&ndash;&gt;-->
    <!--    <div class="chat-tabs" :class="{ minimized: isMinimized }">-->
    <!--      <div class="minimize-icon" @click="toggleMinimized">-->
    <!--        <el-icon class="minimize-icon-content">-->
    <!--          <Grid/>-->
    <!--        </el-icon>-->
    <!--      </div>-->
    <!--      <el-tabs tab-position="right" v-show="!isMinimized">-->
    <!--        <el-tab-pane label="查询余额">-->
    <!--          <balance-page/>-->
    <!--        </el-tab-pane>-->
    <!--        <el-tab-pane label="Config">Config</el-tab-pane>-->
    <!--        <el-tab-pane label="Role">Role</el-tab-pane>-->
    <!--        <el-tab-pane label="Task">Task</el-tab-pane>-->
    <!--      </el-tabs>-->
    <!--    </div>-->
  </div>
</template>

<script setup>
import {ElInput, ElButton, ElMessage} from 'element-plus';
import {inject, ref} from "vue";
import {Grid} from "@element-plus/icons-vue";
import {useStore} from "@/stores";
import BalancePage from "@/components/util/BalancePage.vue";
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
  newCommentArray.push(''); // 为新增的空数组添加第一个值
  newCommentArray[0] = message.value;
  newCommentArray.push(''); // 为新增的空数组添加第2个值
  const headers = {
    "content-type": "application/json",
    "satoken": localStorage.getItem('tokenValue')
  }
  scrollToBottom() // 滚动到底部
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
  }).toString()
  // source = new EventSource(`http://localhost:8080/comment/addCommentDetail/?${params}`, {headers})
  source = new EventSource(`/api/comment/addCommentDetail/?${params}`, {headers}) // aaaa 2
  source.onmessage = (event) => {
    if (event.data !== '[DONE]') {
      newCommentArray[1] += event.data;
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
}

// 右下角标签最小化
function toggleMinimized() {
  isMinimized.value = !isMinimized.value
}
</script>

<style scoped>
/*右下角的显示框*/
.minimize-icon {
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
}

.chat-tabs.minimized {
  height: 40px;
  width: 40px;
}

.minimize-icon-content {
  font-size: 40px;
}

.chat-tabs {
  bottom: 15px;
  right: 8px;
  width: 19%;
  height: 27%;
  margin-right: 5px;
  border-top: 1px solid #ccc;
  box-shadow: -2px 2px 5px #ccc;
}

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
