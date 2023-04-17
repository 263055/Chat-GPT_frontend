<template>
  <div class="footer-input-wrapper">
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
    <div class="button-group">
      <el-button type="info" @click="sentMessage">发送</el-button>
      <el-button type="danger" @click="removeMessage">清空</el-button>
    </div>
  </div>
</template>

<script setup>
import {ElInput, ElButton} from 'element-plus';
import {ref} from "vue";
import axios from "axios";

const message = ref('');

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
.footer-input-wrapper {
  position: absolute;
  bottom: 0;
  width: 80%;
  margin-bottom: 15px;
  display: flex;
  align-items: flex-end;
}

.input-container {
  width: 95%;
  margin-right: 15px;
  display: flex;
  justify-content: center;
}

.button-group {
  /*flex-direction: column;*/
  position: relative;
  display: flex;
  justify-content: flex-end;
  margin-top: 5px;
}
</style>
