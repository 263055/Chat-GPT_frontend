<template>
  <div class="container">
    <div class="left"></div>
    <div class="center">
      <el-scrollbar height="650" ref="scrollbar">
        <div class="card-container">
          <el-card class="box-card" style="white-space: pre-wrap;">
            <template #header>
              <el-icon>
                <Setting/>
              </el-icon>
              系统预设
              <el-button class="preinstall-btn" type="primary" @click="saveNewButton">保存</el-button>
            </template>
            <el-input
                v-model="store.curButton.region"
                :autosize="{ minRows: 2, maxRows: 9 }"
                type="textarea"
                maxlength="300"
                show-word-limit
            />
          </el-card>
          <div v-for="item in store.arr" :key="item.id">
            <el-card class="box-card" style="white-space: pre-wrap;">
              <template #header>
                <el-icon>
                  <User/>
                </el-icon>
                用户
              </template>
              {{ item[0] }}
            </el-card>
            <el-card class="box-card" style="white-space: pre-wrap;">
              <template #header><img src="/gpt-img.png" alt="" class="gpt-img"> ChatGPT</template>
              <div v-html="item[1]"></div>
            </el-card>
          </div>
        </div>
      </el-scrollbar>
    </div>
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
<script setup>
import {onMounted, ref, watch} from 'vue'
import {User, ArrowDownBold, ArrowUpBold, Setting} from "@element-plus/icons-vue";
import {useStore} from "@/stores";
import axios from 'axios'
import {useRouter} from 'vue-router'
import {ElMessage} from "element-plus";

const store = useStore()
const router = useRouter()
const scrollbar = ref(null)

// 修改预设
const saveNewButton = () => {
  const newButtonName = store.curButton.name.trim()
  const newButtonRegion = store.curButton.region.trim()
  if (newButtonName && newButtonRegion) {
    axios.post('/comment/updateCommentPreInstall',
        {
          name: newButtonName,
          preinstall: newButtonRegion,
          id: store.curButton.id
        }, {
          headers: {
            "content-type": "application/json",
            "satoken": localStorage.getItem('tokenValue')
          }
        }).then(function (response) {
      if (response.data.code === 1) {
        ElMessage.success('保存成功')
        dialogFormVisible1.value = false
      } else {
        ElMessage.warning('保存失败')
      }
    })
  } else {
    ElMessage.warning('请补全对话框信息')
  }
}

// 滚动顶部
function scrollToTop() {
  scrollbar.value.scrollTo({top: 0, behavior: 'smooth'})
}

// 滚动底部
function scrollToBottom() {
  const container = scrollbar.value.$el.querySelector('.el-scrollbar__wrap');
  scrollbar.value.scrollTo({top: container.scrollHeight, behavior: 'smooth'})
}

// 路由是否合法
const isChatRoute = (path) => {
  const regex = /^\/chat\/\d{18}$/
  return regex.test(path)
}
// 获取对话
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
  scrollToBottom()
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
})
</script>

<style scoped>
/*按钮预设*/
.preinstall-btn{
  float: right;
}
/*
头像*/
.gpt-img {
  width: 3%;
  height: 3%;
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
  bottom: 24%;
  right: 10%;
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
  width: 98%;
  margin-bottom: 5px;
  margin-left: auto;
  margin-right: auto;
} </style>
