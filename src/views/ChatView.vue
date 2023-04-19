<template>
  <div class="common-layout">
    <el-container style="height: 100%;">
      <!-- 左侧栏 -->
      <el-aside class="aside-all">
        <aside-page/>
      </el-aside>

      <el-container>
        <!-- 中间部分  <el-icon><User/></el-icon>-->
        <el-main style="height: 100vh">
          <div class="card-container">
            <el-card v-for="(item, index) in arrContext" :key="index" class="box-card">
              <template #header>
                <template v-if="item.type === 0">
                  <img class="gpt-img" :src="'gpt-img.png'" alt="">
                  ChatGPT
                </template>
                <template v-else>
                  <el-icon><User/></el-icon>
                  用户
                </template>
              </template>
              {{ item.context }}
            </el-card>
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
import {onMounted, reactive} from 'vue'
import {User} from "@element-plus/icons-vue";
import {useStore} from "@/stores";

const store = useStore()
const arrContext = reactive(store.arr)

onMounted(() => {
  ElNotification({
    title: '4.19更新',
    message: '<h5>1.加入了聊天框的基本展示</h5>' +
        '<h5></h5>',
    duration: 0,
    dangerouslyUseHTMLString: true,
    position: 'top-right',
  })
  store.arr.splice(0, store.arr.length);
  addData(0,  '1')
  addData(1,  '2')
  addData(0,  '145')
  addData(1,  '45378')
  addData(0,   '112312')
})

// 添加一组数据
function addData(type, context) {
  store.arr.push({ type, context })
}

</script>

<style scoped>
/*头像*/
.gpt-img{
  width: 25px;
  height: 25px;
}
.card-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.box-card .el-card__header img {
  margin-bottom: -4px;
}

.box-card {
  width: 800px;
  margin-bottom: 20px;
  margin-left: 300px;
  margin-right: 300px;
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
