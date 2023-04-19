<template>
  <div class="common-layout">
    <el-container style="height: 100%;">
      <!-- 左侧栏 -->
      <el-aside class="aside-all">
        <aside-page/>
      </el-aside>

      <el-container>
        <el-main style="height: 100vh">
          <div class="card-container">
            <h4 v-if="!selectedPage">hello</h4>
            <chat-page v-else :selected-page="selectedPage" />
          </div>
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
import {ElNotification, ElContainer, ElAside, ElMain, ElFooter} from 'element-plus';
import AsidePage from "@/components/chat/AsidePage.vue";
import ButtonPage from "@/components/chat/ButtonPage.vue";
import {onMounted, ref, watch} from 'vue'
import {useStore} from "@/stores";
import { useRouter } from 'vue-router'
import ChatPage from "@/components/chat/ChatPage.vue";

const store = useStore()
const router = useRouter()

const selectedPage = ref(store.curPage.page)

watch(() => store.curPage.page, (val) => {
  selectedPage.value = val
})

onMounted(() => {
  ElNotification({
    title: '4.19更新',
    message: '<h5>1.加入了聊天框的基本展示</h5>' +
        '<h5></h5>',
    duration: 0,
    dangerouslyUseHTMLString: true,
    position: 'top-right',
  })
})


</script>

<style scoped>
/*头像*/
.card-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.box-card .el-card__header img {
  margin-bottom: -4px;
}

.footer-all {
  height: 0;
  position: relative;
}

.aside-all {
  width: 250px;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
