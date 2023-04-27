<template>
  <div style="width: 100vw;height: 100vh;overflow: hidden;display: flex">
    <div style="flex: 1">
      <el-image style="width: 100%;height: 100%" fit="cover"
                :src="'loginImg.jpg'"/>
    </div>
    <div class="welcome-title">
      <div style="font-size: 30px;font-weight: bold">欢迎来到我的GPT平台</div>
      <div style="margin-top: 10px">在这里你可以使用chatGPT,本网站主要用于个人学习。</div>
      <div style="margin-top: 5px">在这个网站中我在这里会尽情的发挥自己的所学。</div>
      <div style="margin-top: 5px">也欢迎您的到来发表自己对这个网站的意见。</div>
      <div style="margin-top: 5px" v-html="renderTextItBaiMa"></div>
      <div style="margin-top: 5px" v-html="renderTextBiBi"></div>
    </div>
    <div style="width: 400px;background-color: white;z-index: 1">
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
  ElNotification({
    title: '4.26更新',
    message: '<h5>1.网站上线啦~简单的使用以下吧</h5>' +
        '<h5>2.网站后续还会慢慢的更新，加入一些新的东西</h5>',
    duration: 0,
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
</style>
