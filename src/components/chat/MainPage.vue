<template>
  <el-scrollbar>

  <div class="card-container">
      <el-col :span="20">
        <el-card class="box-card">
          <h1 style="text-align: center;">欢迎来到我的网站</h1>
          <el-divider/>
          1.本项目是大二在校生从0-1完成的（前端登陆页面不是，引用自b站白马）<br>
          2.用到的技术包括但不限于：springBoot,mybatis-plus,vue,这三个是最主要的技术<br>
          3.其实我写这个网站也是为了工作，，，因为现在的Java就业形式太糟糕了<br>
          4.可通过邮箱
          <a href="mailto:lhr@4gai.me">lhr@4gai.me</a> 或者
          <a href="https://t.me/+k69LefIji-QwYmY1" target="_blank"> 电报连接 </a>
          与我进行交流<br>
          5.对该网站有任何bug,随时都可以联系我,每条消息我都会认真查看<br>
          6.如认为价格不合理(想要降价),也可以联系我<br>
          7.如果你在Java学习上遇到任何困难，可以通过邮箱联系我，和我进行学术交流<br>
          <el-divider/>
          <h3 style="text-align: center;color: red">警告</h3>
          1.底层调用的chatGpt的
          <span style=" color: red;font-size: 20px"> gpt-3.5-turbo </span>，
          他很聪明但不是万能的<br>
          2.我不会对gpt的回答负责，我只提供第三方的使用<br>
          3.不要用gpt生成有关政治,色情等敏感信息,这很糟糕<br>
          <el-divider/>
          <h3 style="text-align: center;color: red">扣费功能</h3>
          1.本站可以遵循白嫖原则，前提是你能够邀请新用户，邀请一位新用户增加30次对话次数，初始30次对话次数<br>
          2.询问ai前请设置好对话长度(上下文长度),默认为0,可以在左侧栏的最下方中,对话设置查看<br>
          3.<span style=" color: red;font-size: 20px"> 对话长度越大,扣费越多 </span>
          上下文长度为 0-2 --> 费用为1，长度为3-5 ---> 费用为2，以此类推，长度为 13-15 ---> 费用为5<br>
          <el-divider/>
          <h3 style="text-align: center;">5.6日更新</h3>
          1.服务器被攻击，数据库被篡改，导致5.5日九点到5.6日八点注册的用户全部流失，在此致歉┭┮﹏┭┮<br>
          2.加入了收费系统，但是依然可以通过邀请新用户（小号）白嫖，具体操作在左侧栏的充值按钮查看<br>
          3.如果认为价格不合理，可以联系邮箱 lhr@4gai.me 发表意见，我做的不好，那我就改<br>
          <el-divider/>
          <h3 style="text-align: center;">5.4日更新</h3>
          1.修改了发送消息的按钮，按回车能快速发消息，Shift+Enter快速换行<br>
          2.增加了扣费功能，扣费的情况参上<br>
          <el-divider/>
          <h3 style="text-align: center;">4.30日更新</h3>
          1.使回答更加流畅，加入了自动向下滚动，更人性化<br>
          2.修改了发送消息的按钮，使一次只能提问一个问题<br>
          <el-divider/>
          <h3 style="text-align: center;">4.28日更新</h3>
          1.引入了上下文,但在付费模式出来之前,我把上下文的长度最大设置为3<br>
          2.修改了手机样式,尽我最大的努力把界面做的更美观<br>
        </el-card>
      </el-col>
  </div>
  </el-scrollbar>

</template>

<script setup>
import {onMounted} from "vue";
import axios from "axios";
import {useStore} from "@/stores";
const store = useStore()

function getCommentSetting() {
  axios.get('/userSetting/getSetting', {
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "satoken": localStorage.getItem('tokenValue'),
    },
    withCredentials: true
  }).then(response => {
    if (response.data.code === 1) {
      store.userSetting.maxContext = response.data.data.maxContext
      store.userSetting.temperature = response.data.data.temperature
      store.userSetting.frequencyPenalty = response.data.data.frequencyPenalty + 2.0
      store.userSetting.presencePenalty = response.data.data.presencePenalty + 2.0
    }
  })
}
onMounted(() => {
  document.title = '4gai'
  getCommentSetting()
})
</script>

<style scoped>
.card-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
</style>
