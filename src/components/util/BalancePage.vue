<template>
  <el-button type="primary" @click="checkBalance">查询余额</el-button>
  <div v-if="state.times !== null">剩余次数: {{ state.times }}</div>
  <div v-if="state.token !== null">剩余token: {{ state.token }}</div>
</template>

<script setup>
import { reactive } from 'vue';
import axios from 'axios';
import {ElMessage} from "element-plus";

const state = reactive({
  times: null,
  token: null,
});

const checkBalance = async () => {
  axios.get('/balance/getBalance', {
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "satoken": localStorage.getItem('tokenValue')
    },
    withCredentials: true
  }).then(response => {
    if (response.data.code === 1) {
      state.times = response.data.data.times
      state.token = response.data.data.token
      ElMessage.success("余额查询成功")
    } else {
      ElMessage.error("查询出错,请重新尝试")
    }
  })
};
</script>

<style scoped>

</style>
