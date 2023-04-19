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
          <img src="public/gpt-img.png" alt="">
          ChatGPT
        </template>
        {{ item.gptcomment }}
      </el-card>
    </div>
  </div>
</template>

<script setup>
import {ElMessage} from 'element-plus';
import {onMounted, reactive, watchEffect, ref} from 'vue'
import {User} from "@element-plus/icons-vue";
import {useStore} from "@/stores";
import axios from 'axios'

const store = useStore()
let curContext = reactive([]);

// 页面初始化执行的方法
onMounted(() => {
  getData();
})

import { onBeforeRouteUpdate } from 'vue-router'

onBeforeRouteUpdate((to, from) => {
  if (isChatRoute(to.path)) {
    getData()
  }
})

function isChatRoute(path) {
  const regex = /^\/chat\/\d{18}$/
  return regex.test(path)
}

function getData() {
  store.arr.splice(0, store.arr.length);
  axios.get('/comment/getCommentDetail', {
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "satoken": localStorage.getItem('tokenValue')
    },
    params: {
      id: store.curButton.id,
    },
    withCredentials: true
  }).then(response => {
    if (response.data.code === 1) {
      curContext = response.data.data
      console.log(curContext)
      ElMessage.success("~~~数据获取成功~~")
      curContext.map(item => {
        addData(item.id, item.usercomment, item.gptcomment)
      })
    } else {
      ElMessage.error("出现错误，请稍后再试")
    }
  })
}

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
