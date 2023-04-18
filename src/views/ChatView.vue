<template>
  <div class="common-layout">
    <el-container style="height: 100%;">
      <!-- 左侧栏 -->
      <el-aside class="aside-all">
        <aside-page/>
      </el-aside>

      <el-container>
        <!-- 中间部分 -->
        <el-main style="height: 100vh">
          <el-radio-group v-model="tabPosition" style="margin-bottom: 30px">
            <el-radio-button label="top">top</el-radio-button>
            <el-radio-button label="right">right</el-radio-button>
            <el-radio-button label="bottom">bottom</el-radio-button>
            <el-radio-button label="left">left</el-radio-button>
          </el-radio-group>

          <el-tabs tab-position="top">
            <el-tab-pane label="User">User</el-tab-pane>
            <el-tab-pane label="Config">Config</el-tab-pane>
            <el-tab-pane label="Role">Role</el-tab-pane>
            <el-tab-pane label="Task">Task</el-tab-pane>
          </el-tabs>
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
import {onMounted, ref} from 'vue'
const tabPosition = ref('left')

onMounted(() => {
  ElNotification({
    title: 'Prompt',
    message: '<h5>1.This is a message that does not automatically close</h5>' +
        '<h4>1.This is a message that does not automatically close</h4>',
    duration: 0,
    dangerouslyUseHTMLString: true,
    position: 'top-right',
  })
})

</script>

<style scoped>

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
