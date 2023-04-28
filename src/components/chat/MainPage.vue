<template>
  <div class="card-container">
    <el-col :span="20">
      <el-card class="box-card">
        <h1 style="text-align: center;">欢迎来到我的网站</h1>
        <el-divider/>
        1.本项目是在校生从0-1完成的（前端登陆页面不是，引用自b站白马）<br>
        2.用到的技术包括但不限于：springBoot,mybatis-plus,vue,这三个是最主要的技术<br>
        3.这是一个简陋的网站，因为我是敲Java代码的，我讨厌前端<br>
        4.其实我写这个网站也是为了工作，，，因为现在的Java就业形式太糟糕了<br>
        5.在五一假期结束之前，我是不会考虑收费的<br>
        6.你们每问一个问题，都要扣我一次钱，所以付费是必须的，只是便宜与否<br>
        7.我会深思熟虑,以便宜的价格出售<br>
        <el-divider/>
        <h3 style="text-align: center;color: red">警告</h3>
        1.底层调用的chatGpt，他很聪明但不是万能的<br>
        2.我不会对gpt的回答负责，我只提供第三方的使用<br>
        3.不要用gpt生成有关政治,色情等敏感信息,这很糟糕<br>
        <el-divider/>
        <h3 style="text-align: center;">4.28日更新</h3>
        1.引入了上下文,但在付费模式出来之前,我把上下文的长度最大设置为3<br>
        2.修改了手机样式,尽我最大的努力把界面做的更美观<br>
      </el-card>
    </el-col>
  </div>
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
