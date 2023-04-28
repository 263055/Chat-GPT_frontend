<template>
  <div class="header-all">
    <el-col :span="4" class="header-left">
      <el-icon class="collapse-icon" @click="store.isMinimize.isMinimize = !store.isMinimize.isMinimize">
        <template v-if="store.isMinimize.isMinimize">
          <TurnOff/>
        </template>
        <template v-else>
          <Open/>
        </template>
      </el-icon>
    </el-col>
    <el-col :span="16" class="header-title">
      ChatGPT
    </el-col>
    <el-col :span="4" class="header-right">
      <el-tooltip content="注销">
        <el-icon class="switch-icon" @click="layout()">
          <SwitchButton/>
        </el-icon>
      </el-tooltip>
    </el-col>
  </div>
</template>

<script setup>
import {Open, SwitchButton, TurnOff} from "@element-plus/icons-vue";
import {ElCol, ElIcon, ElMessage} from 'element-plus';
import axios from "axios";
import router from "@/router";
import Cookies from "js-cookie";
import {useStore} from "@/stores";

const store = useStore()

// 注销操作
const layout = () => {
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
    router.push('/login')
    console.log('layout')
    Cookies.remove('tokenName');
    Cookies.remove('satoken');
    Cookies.remove('mail');
    Cookies.removeAll()
  })
}

</script>

<style scoped>
.collapse-icon {
  width: 25px;
  height: 25px;
  margin-left: 10px;
  transform: scale(1.7);
}

.switch-icon {
  width: 25px;
  height: 25px;
  transform: scale(1.7);
  margin-right: 10px;
}


.header-right {
  text-align: right;
}

.header-title {
  text-align: center;
  font-size: 24px;
}
</style>
