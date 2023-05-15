<template>
  <el-scrollbar ref="scrollbar">

    <div class="container">
      <div class="center">
        <div class="card-container">
          <el-card class="box-card" style="white-space: pre-wrap;">
            <template #header>
              <el-icon>
                <Setting/>
              </el-icon>
              ai人设
              <el-tooltip content="ai人设,设置ai的对话人设,可以让ai扮演不同的角色,一个好的预设可以使ai的回答更专业">
                <el-icon>
                  <QuestionFilled/>
                </el-icon>
              </el-tooltip>

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
<!--              {{ item[0] }}-->
              <v-md-preview :text="item[0]"></v-md-preview>
            </el-card>
            <el-card class="box-card" style="white-space: pre-wrap;">
              <template #header v-if="store.userSetting.type === 1">
                <img src="/gpt4-img.png" alt="" class="gpt-img">
                GPT4
              </template>
              <template #header v-else-if="store.userSetting.type === 0">
                <img src="/gpt-img.png" alt="" class="gpt-img">
                ChatGPT
              </template>
              <v-md-preview :text="item[1]"></v-md-preview>
            </el-card>
          </div>
        </div>
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
  </el-scrollbar>
</template>

<script setup>
import {inject, onMounted, ref, watch} from 'vue'
import {User, ArrowDownBold, ArrowUpBold, Setting, QuestionFilled} from "@element-plus/icons-vue";
import {useStore} from "@/stores";
import axios from 'axios'
import {useRouter} from 'vue-router'
import {ElMessage} from "element-plus";

const store = useStore()
const router = useRouter()
const scrollbar = ref(null)
const state = inject('scrollToBottom');
const state1 = inject('scrollToBottom1');

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

// 滚动底部
function scrollToBottom1() {
  const container = scrollbar.value.$el.querySelector('.el-scrollbar__wrap');
  const distanceToBottom = container.scrollHeight - container.scrollTop - container.clientHeight;
  if (distanceToBottom < 400) {
    scrollbar.value.scrollTo({top: container.scrollHeight});
  }
}

// 其他组件调用 滚动底部 函数
onMounted(() => {
  state.scrollToBottom = scrollToBottom;
  state1.scrollToBottom1 = scrollToBottom1;
});

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
.preinstall-btn {
  float: right;
}

/*
头像*/
.gpt-img {
  width: 20px;
  height: 20px;
}

.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: rgb(235, 235, 235);
  height: 100%;
}


.right {
  position: fixed;
  flex-direction: column;
  justify-content: flex-end;
  margin-left: 10px;
  margin-right: 10px;
  display: flex;
  bottom: 80px;
  right: 20px;
}

.center {
  flex: 8;
}

.chat-btn-icon {
  font-size: 26px;
  margin-bottom: 10px;
}

.card-container {
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  flex: 1;
  margin-right: 35px;
}

.box-card .el-card__header img {
  margin-bottom: -4px;
}

.box-card {
  width: 98%;
  margin-bottom: 5px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 10px;
}
</style>
