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
            下方有注销等按钮
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
          <main-page v-if="!$route.params.id"/>
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
import {ElContainer, ElAside, ElMain, ElFooter, ElDrawer} from 'element-plus';
import AsidePage from "@/components/chat/AsidePage.vue";
import HeaderPage from "@/components/chat/HeaderPage.vue";
import ButtonPage from "@/components/chat/ButtonPage.vue";
import {ref, watch} from 'vue'
import {useStore} from "@/stores";
import {useRouter} from 'vue-router'
import ChatPage from "@/components/chat/ChatPage.vue";
import MainPage from "@/components/chat/MainPage.vue";
import {watchEffect} from "@vue/runtime-core";

const store = useStore()
const router = useRouter()
const selectedPage = ref(store.curPage.page)
const windowWidth = ref(window.innerWidth) // 监听窗口宽度

import {reactive, provide} from 'vue';

const state = reactive({
  scrollToBottom: null,
});
const state1 = reactive({
  scrollToBottom1: null,
});
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
