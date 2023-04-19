<template>
  <div class="footer-input-wrapper">
    <!--消息发送框-->
    <div class="input-container">
      <el-input
          v-model="message"
          :autosize="{ minRows: 2, maxRows: 9 }"
          type="textarea"
          placeholder="输入你的问题"
          maxlength="1000"
          show-word-limit
      />
    </div>
    <!-- 底部按钮-->
    <div class="button-group">
      <el-button type="info" @click="sentMessage">发送</el-button>
      <el-button type="danger" @click="removeMessage">清空</el-button>
    </div>
    <!--右下角可伸缩的提示框-->
    <div class="chat-tabs" :class="{ minimized: isMinimized }">
      <div class="minimize-icon" @click="toggleMinimized">
        <el-icon class="minimize-icon-content">
          <Grid/>
        </el-icon>
      </div>
      <el-tabs tab-position="right" v-show="!isMinimized">
        <el-tab-pane label="User">User</el-tab-pane>
        <el-tab-pane label="Config">Config</el-tab-pane>
        <el-tab-pane label="Role">Role</el-tab-pane>
        <el-tab-pane label="Task">Task</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup>
import {ElInput, ElButton} from 'element-plus';
import {ref} from "vue";
import axios from "axios";
import {Grid} from "@element-plus/icons-vue";

const message = ref('');
const isMinimized = ref(false)

function toggleMinimized() {
  isMinimized.value = !isMinimized.value
}

const sentMessage = () => {
  const tokenValue = localStorage.getItem('tokenValue')
  axios.post('/comment/addCommentDetail',
      {userComment: message.value}, {
        headers: {
          "content-type": "application/json",
          "satoken": tokenValue
        },
      }).then(response => {
    console.log(response.data);
    // 处理请求成功的逻辑
  }).catch(error => {
    console.log(error);
    // 处理请求失败的逻辑
  });
}

const removeMessage = () => {
  message.value = '';
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
  position: fixed;
  bottom: 15px;
  right: 8px;
  width: 300px;
  height: 200px;
  border-top: 1px solid #ccc;
  box-shadow: -2px 2px 5px #ccc;
}

/*整体布局*/
.footer-input-wrapper {
  position: absolute;
  bottom: 0;
  width: 80%;
  margin-bottom: 15px;
  display: flex;
  align-items: flex-end;
}

/*输入框的布局*/
.input-container {
  width: 75%;
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
