<template>
  <div class="container">
    <div class="image-wrapper">
      <el-image class="image" :src="'loginImg.jpg'"/>
    </div>
    <div class="welcome-title">
      <div style="font-size: 30px;font-weight: bold">欢迎来到我的GPT平台</div>
      <div style="margin-top: 10px">在这里你可以使用chatGPT,本网站主要用于个人学习。</div>
      <div style="margin-top: 5px">在这个网站中我在这里会尽情的发挥自己的所学。</div>
      <div style="margin-top: 5px">也欢迎您的到来发表自己对这个网站的意见。</div>
      <div style="margin-top: 5px" v-html="renderTextItBaiMa"></div>
      <div style="margin-top: 5px" v-html="renderTextBiBi"></div>
    </div>
    <div class="content-wrapper">
      <router-view v-slot="{ Component }">
        <transition name="el-fade-in-linear" mode="out-in">
          <component :is="Component" style="height: 100%"/>
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script setup>
import {reactive, computed, onMounted} from 'vue'
import {ElNotification} from "element-plus";

const state = reactive({
  text1: '前端的登录页面参考了白马程序员,在此鸣谢每位it大佬的无私奉献',
  url1: 'https://itbaima.net',
  text2: '在此鸣谢itbaima以及每位it大佬的无私奉献。',
  url2: 'https://space.bilibili.com/37737161'
});

onMounted(() => {
  if (window.location.protocol !== 'https:') {
    window.location.href = `https://${window.location.host}${window.location.pathname}`
  } // aaaa

  document.title = '4gai'
  ElNotification({
    title: '公告',
    message: '<h5>gpt3.5 目前正常收费，同时降低a了3.5的价格</h5>' +
        '<h5>如有任何问题，可以加q群 821586785 联系我</h5>',
    duration: 8000,
    dangerouslyUseHTMLString: true,
    position: 'top-right',
  })
})
const renderTextItBaiMa = computed(() => {
  const reg = /白马程序员/g; // 匹配需要转换为超链接的文本
  return state.text1.replace(reg, `<a href="${state.url1}" target="_blank">白马程序员</a>`);
});

const renderTextBiBi = computed(() => {
  const reg = /itbaima/g; // 匹配需要转换为超链接的文本
  return state.text2.replace(reg, `<a href="${state.url2}" target="_blank">itbaima</a>`);
});
</script>


<style scoped>
.welcome-title {
  position: absolute;
  bottom: 30px;
  left: 30px;
  color: white;
  text-shadow: 0 0 10px black;
}

.container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
}

.image-wrapper {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.image {
  width: 100%;
  height: 100%;
}

.content-wrapper {
  width: 400px;
  background-color: white;
  z-index: 1;
}

@media only screen and (max-width: 768px) {
  .image-wrapper {
    display: none;
  }

  .content-wrapper {
    width: 100%;
  }
}
</style>
