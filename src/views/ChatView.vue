<template>
  <div class="common-layout">
    <el-container>
      <!-- 左侧栏 -->
      <template v-if="windowWidth >= 900">
        <el-aside class="aside-all" v-if="!store.isMinimize.isMinimize">
          <aside-page/>
        </el-aside>
      </template>
      <template v-else>
        <el-drawer v-model="store.isMinimize.isMinimize"
                   :size="'80%'"
                   :with-header="false"
                   :show-close="false"
                   style="left: 0; background-color: #202123; height: 100%;">
          <div slot="title" style="color: white; text-align: center; font-size: 18px;">
            点击空白区域即可关闭<br>
          </div>
          <aside-page/>
        </el-drawer>
      </template>

      <el-container>
        <!-- 头部栏 -->
        <el-header class="header-all">
          <header-page/>
        </el-header>
        <!-- 主体 -->
        <el-main class="main-all">
          <log-page v-if="!$route.params.id && $route.path === '/chat/log/'"/>
          <main-page v-else-if="!$route.params.id"/>
          <chat-page v-else :selected-page="$route.params.id"/>
        </el-main>
        <!-- 底部栏 -->
        <el-footer>
          <button-page/>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import {ElContainer, ElAside, ElMain, ElFooter, ElDrawer, ElNotification, ElMessage} from 'element-plus';
import AsidePage from "@/components/chat/AsidePage.vue";
import HeaderPage from "@/components/chat/HeaderPage.vue";
import ButtonPage from "@/components/chat/ButtonPage.vue";
import {onMounted, ref, watch} from 'vue'
import {useStore} from "@/stores";
import {useRouter} from 'vue-router'
import ChatPage from "@/components/chat/ChatPage.vue";
import MainPage from "@/components/other/MainPage.vue";
import LogPage from "@/components/other/LogPage.vue";
import {watchEffect} from "@vue/runtime-core";

const store = useStore()
const router = useRouter()
const selectedPage = ref(store.curPage.page)
const windowWidth = ref(window.innerWidth) // 监听窗口宽度

import {reactive, provide} from 'vue';
import axios from "axios";
import Cookies from "js-cookie";

const state = reactive({
  scrollToBottom: null,
});
const state1 = reactive({
  scrollToBottom1: null,
});

onMounted(() => {
  // 目标路由
  const targetRoute = '/chat/main'
  // 当前路由
  const currentRoute = router.currentRoute.value.path
  // 如果当前路由与目标路由不同，则进行路由跳转
  if (currentRoute !== targetRoute) {
    router.push(targetRoute)
  }

  axios.get('/user/login', {
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "satoken": localStorage.getItem('tokenValue')
    },
    withCredentials: true
  }).then(response => {
    if (response.data.code === 1) {
      getUserVersion();
    } else {
      router.push('/login')
      localStorage.removeItem('tokenName');
      localStorage.removeItem('satoken');
      localStorage.removeItem('mail');
      ElNotification({
        title: '提示',
        message: '登录已过期，请重新登录',
        type: 'warning',
        duration: 10000,
      });
    }
  })
})

function getUserVersion() {
  axios.get('/balance/getBalance', {
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "satoken": localStorage.getItem('tokenValue'),
    },
    params: {
      mail: localStorage.getItem('mail')
    },
    withCredentials: true
  }).then(response => {
    if (response.data.code === 1) {
      console.log(response.data.data)
      const charge = response.data.data.chargedAmount;
      store.userVersion.charge = charge;
      if(charge < 8){
        store.userVersion.version = 5;
      } else if(charge < 15){
        store.userVersion.version = 3;
      } else if(charge < 20){
        store.userVersion.version = 2;
      } else {
        store.userVersion.version = 1;
      }
      console.log(store.userVersion.version)
      console.log(store.userVersion.charge)
    }
  })
}

provide('scrollToBottom', state);
provide('scrollToBottom1', state1);

// 判断页面宽度,决定侧边栏是否显示
watchEffect(() => {
  windowWidth.value = window.innerWidth
})

watch(() => store.curPage.page, (val) => {
  selectedPage.value = val
})
</script>

<style scoped>
.box-card .el-card__header img {
  margin-bottom: -4px;
}

.header-all {
  background-color: #202123;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
  padding: 5px;
  box-sizing: border-box;
}

.aside-all {
  width: 230px;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-all {
  height: calc(100vh - 110px);
}

</style>
