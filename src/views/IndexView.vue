<template>
  <div>
      欢迎进入到学习平台
  </div>
  <div>
      <el-button @click="layout()" type="danger" plain>退出登录</el-button>
  </div>
</template>

<script setup>
import {ElMessage} from "element-plus";
import router from "@/router";
import axios from "axios";
import Cookies from "js-cookie";
import {useStore} from "@/stores";

const store = useStore()

const layout = () =>  {
  const mail = localStorage.getItem('mail');
  axios.get('/user/layout', {
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "satoken": localStorage.getItem('tokenValue'),
    },
    params: {
      mail: mail
    },
    withCredentials: true
  }).then(response => {
    console.log(response.data)
    if (response.data.code === 200) {
      ElMessage.success(response.data.data)
    } else {
      ElMessage.success(response.data.data)
    }
    store.auth.user = null
    router.push('/')
    Cookies.remove('tokenName');
    Cookies.remove('satoken');
    Cookies.remove('mail');
  })
}
</script>

<style scoped>

</style>
