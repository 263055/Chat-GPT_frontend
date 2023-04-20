<template>
  <div class="card-container">
    <div v-for="item in curContext" :key="item.id">
      <el-card class="box-card">
        <template #header>
          <el-icon>
            <User/>
          </el-icon>
          用户
        </template>
        {{ item.usercomment  }}
      </el-card>
      <el-card class="box-card">
        <template #header>
          <img src="/gpt-img.png" alt="" class="gpt-img">
          ChatGPT
        </template>
        {{ item.gptcomment }}
      </el-card>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref, watch} from 'vue'
import {User} from "@element-plus/icons-vue";
import {useStore} from "@/stores";
import axios from 'axios'
import {useRouter} from 'vue-router'

const store = useStore()
const curContext = ref([])
const router = useRouter()

const isChatRoute = (path) => {
  const regex = /^\/chat\/\d{18}$/
  return regex.test(path)
}

const getComments = (id) => {
  axios.get('/comment/getCommentDetail', {
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "satoken": localStorage.getItem('tokenValue')
    },
    params: {id},
    withCredentials: true
  }).then(response => {
    if (response.data.code === 1) {
      curContext.value = response.data.data
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
})

// 添加一组数据
function addData(id, usercomment, gptcomment) {
  store.arr.push({id, usercomment, gptcomment})
}

</script>

<style scoped>
/*头像*/
.gpt-img {
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
  width: 650px;
  margin-bottom: 20px;
  margin-left: 300px;
  margin-right: 300px;
}
</style>
