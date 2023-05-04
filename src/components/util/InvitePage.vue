<template>
  <el-scrollbar height="350" ref="scrollbar">
    <p style="color: red">每邀请一个新用户，都可以获得40次的对话</p>
    <p>1.在用户注册前,将自己的邮箱发给新用户</p>
    <p>2.让新用户，在指定位置填写自己的邮箱</p>
    <div>
      <img src="/invite.png" alt="" class="invite-img">
    </div>
    <p>3.新用户创建账号之后,等待一分钟,点击上方的查询按钮,即可看到对话次数增加</p>
  </el-scrollbar>
</template>

<script setup>
</script>

<style scoped>
.invite-img {
  width: 300px;
  height: 300px;
}
</style>
