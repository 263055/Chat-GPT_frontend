<template>
  <div class="common-layout">
    <el-container style="height: 100%;">
      <!-- 左侧栏 -->
      <el-aside class="aside-all">
        <aside-page/>
      </el-aside>
      <el-container>

        <el-main style="height: 100vh">
          <main-page v-if="!$route.params.id" />
          <chat-page v-else :selected-page="$route.params.id" />
        </el-main>

        <!-- 底部栏 -->
        <el-footer class="footer-all">
          <button-page/>
        </el-footer>
        
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import {ElContainer, ElAside, ElMain, ElFooter} from 'element-plus';
import AsidePage from "@/components/chat/AsidePage.vue";
import ButtonPage from "@/components/chat/ButtonPage.vue";
import {ref, watch} from 'vue'
import {useStore} from "@/stores";
import {useRouter} from 'vue-router'
import ChatPage from "@/components/chat/ChatPage.vue";
import MainPage from "@/components/chat/MainPage.vue";

const store = useStore()
const router = useRouter()

const selectedPage = ref(store.curPage.page)

watch(() => store.curPage.page, (val) => {
  selectedPage.value = val
})

</script>

<style scoped>
.box-card .el-card__header img {
  margin-bottom: -4px;
}

.footer-all {
  height: 0;
  position: relative;
}

.aside-all {
  width: 260px;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
