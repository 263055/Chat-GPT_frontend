<template>
  <el-scrollbar>
    <div class="card-container">
      <el-col :span="20">
        <el-card class="box-card">
          <h1 style="text-align: center;">更新日志</h1>
          <el-divider/>
          1.本项目是大二在校生从0-1完成的（前端登陆页面不是，引用自b站白马）<br>
          2.用到的技术包括但不限于：springBoot,mybatis-plus,vue,这三个是最主要的技术<br>
          3.其实我写这个网站也是为了暑假找工作，，，想在郑州本地找一个Java实习，浅浅的期待一下哦<br>
          4.可通过邮箱
          <a href="mailto:lhr@4gai.me">lhr@4gai.me</a> 或者
          <a href="https://t.me/+k69LefIji-QwYmY1" target="_blank"> 电报连接 </a>
          与我进行交流<br>
          5.对该网站有任何bug,随时都可以联系我,每条消息我都会认真查看<br>
          6.如认为价格不合理(想要降价)或在Java学习上遇到任何困难,也可以联系我<br>
          7.如果你喜欢的话，可以为我充值1元钱吗?这个网站我目前投入一个月的时间去维护
            并且我为了这个网站,已经花费了300+,截止五月八日晚九点收益只有5r<br>
          8.我不指望我能赚太多的钱,但是我不希望这个网站会持续赔本（服务器和域名都是按月付钱的,每个月大概60）<br>
          9.男大学生本来就穷,每个月还要倒贴钱呜呜呜呜
          <el-divider/>
          <h3 style="text-align: center;">5.8日更新</h3>
          1.根据用户反映，再登录页面加入了 "记住我" 这个需求<br>
          2.根据用户要求，加入了 "缓存登录" 的功能，即使推出浏览器，再次打开后也会跳转到对话页面（不用登录），但可能存在bug<br>
          3.根据用户要求，加入了 "使用手册" ，再用户登录后跳转到主页面，就可以看到网站如何使用，对新用户更加友好<br>
          3.加入了 "判断登录" ，当后端更新的时候，用户的操作失效后会有对应的提示（注销并重新登陆）<br>
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
</script>

<style scoped>
.card-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
</style>
