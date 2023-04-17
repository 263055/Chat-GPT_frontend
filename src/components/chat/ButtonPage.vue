<template>
  <div class="footer-input-wrapper">
    <el-input
        v-model="message"
        :autosize="{ minRows: 2, maxRows: 9 }"
        type="textarea"
        placeholder="输入你的问题"
        maxlength="1000"
        show-word-limit
    />
  </div>
</template>

<script setup>
import {ElInput} from 'element-plus';
import {ref} from "vue";

const message = ref('');
</script>

<style scoped>
.footer-input-wrapper {
  position: absolute;
  bottom: 0;
  width: 80%;
  margin-bottom: 15px;
  margin-right: 15px;
}
</style>
