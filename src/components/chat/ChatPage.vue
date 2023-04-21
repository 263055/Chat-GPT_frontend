<template>
  <div class="container">
    <div class="left"></div>
    <el-scrollbar height="725px" ref="scrollbar">
      <div class="center">
        <div class="card-container">
          <div v-for="item in store.arr" :key="item.id">
            <el-card class="box-card">
              <template #header>
                <el-icon>
                  <User/>
                </el-icon>
                用户
              </template>
              {{ item[0] }}
            </el-card>
            <el-card class="box-card">
              <template #header><img src="/gpt-img.png" alt="" class="gpt-img"> ChatGPT</template>
              {{ item[1] }}
            </el-card>
          </div>
        </div>
      </div>
    </el-scrollbar>
    <div class="right">
      <el-icon class="chat-btn-icon" @click="scrollToTop">
        <ArrowUpBold/>
      </el-icon>
      <el-icon class="chat-btn-icon" @click="scrollToBottom">
        <ArrowDownBold/>
      </el-icon>
    </div>
  </div>
</template>
<script setup> import {onMounted, ref, watch} from 'vue'
import {User, ArrowDownBold, ArrowUpBold, Edit} from "@element-plus/icons-vue";
import {useStore} from "@/stores";
import axios from 'axios'
import {useRouter} from 'vue-router'

const store = useStore()
const router = useRouter()
const scrollbar = ref(null)

function scrollToTop() {
  scrollbar.value.scrollTo({top: 0})
}

function scrollToBottom() {
  scrollbar.value.scrollTo({top: scrollbar.value.$el.scrollHeight})
}

const isChatRoute = (path) => {
  const regex = /^\/chat\/\d{18}$/
  return regex.test(path)
}
const getComments = (id) => {
  axios.get('/comment/getCommentDetail', {
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "satoken": localStorage.getItem('tokenValue')
    }, params: {id}, withCredentials: true
  }).then(response => {
    if (response.data.code === 1) {
      store.arr = []
      response.data.data.forEach(item => {
        store.arr.push([item.usercomment, item.gptcomment]);
      })
    } else {
      console.error("出现错误，请稍后再试")
    }
  })
}
onMounted(() => {
  const id = router.currentRoute.value.params.id
  if (isChatRoute(router.currentRoute.value.path)) {
    getComments(id)
  }
})
watch(() => router.currentRoute.value.params.id, (id) => {
  if (isChatRoute(router.currentRoute.value.path)) {
    getComments(id)
  }
}) </script>
<style scoped> /*头像*/
.gpt-img {
  width: 25px;
  height: 25px;
}

.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.left {
  flex: 1;
}

.right {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  flex: 1;
  margin-left: 40px;
}

.center {
  flex: 3;
}

.chat-btn-icon {
  font-size: 26px;
  margin-bottom: 10px;
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
  width: 700px;
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: auto;
} </style>
