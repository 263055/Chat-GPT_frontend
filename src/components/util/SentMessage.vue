<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <div class="left">邮箱：</div>
        <el-input v-model="mail" class="input" style="width: 220px; margin-left: 5px;" />
        <el-button class="button" type="primary" @click="sentMessage" :disabled="isDisabled">发送邮件</el-button>
      </div>
    </template>
    <el-input
        v-model="message"
        :autosize="{ minRows: 2, maxRows: 9 }"
        type="textarea"
        placeholder="在这个地方你的对这个网站的意见"
    ></el-input>
  </el-card>
</template>

<script setup>
import {ref} from "vue";
import {ElMessage} from "element-plus";
import axios from "axios";

const mail = ref(localStorage.getItem('mail'))
const message = ref('');
const isDisabled = ref(false);
const emailRegex = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

// 发送消息
const sentMessage = () => {
  if (!emailRegex.test(mail.value)) {
    ElMessage.error("请检查邮箱格式");
    return;
  }
  if (!message.value) {
    ElMessage.error("请输入完整的对话内容");
    return;
  }
  axios.post('/user/sentMail', {
        mail : mail.value,
        message : message.value,
      }, {
        headers: {
          "content-type": "application/json",
          "satoken": localStorage.getItem('tokenValue')
        }
      }).then(function (response) {
    if (response.data.code === 1) {
      ElMessage.success("邮件已发送哦,若想再次发邮件,需刷新后再发送")
      isDisabled.value = true
    } else {
      ElMessage.warning()
    }
  }).catch(function () {
    ElMessage.warning('消息发送失败,请你检查网络问题或联系管理员')
  });
}
</script>

<style scoped>
.card-header {
  display: flex;
  align-items: center;
}
.button{
  display: flex;
  justify-content: flex-end;
  margin-left: auto;
}
.box-card {
  width: 100%;
}

</style>
