<template>
  <div class="common-layout">
    <el-container style="height: 100%;">
      <!-- 左侧栏 -->
      <el-aside class="aside-all">
        <aside-page/>
      </el-aside>

      <el-container>
        <!-- 中间部分 -->
        <el-main>
          <div style="text-align: center; margin-bottom: 20px;">
            <h3>欢迎来到学习天堂</h3>
            <div style="display: flex;">
              <div style="flex: 1;">
                <h4>标题A</h4>
                <div>
                  <el-input v-model="inputA1" placeholder="文本框1"></el-input>
                </div>
                <div>
                  <el-input v-model="inputA2" placeholder="文本框2"></el-input>
                </div>
              </div>
              <div style="flex: 1;">
                <h4>标题B</h4>
                <div>
                  <el-input v-model="inputB1" placeholder="文本框1"></el-input>
                </div>
                <div>
                  <el-input v-model="inputB2" placeholder="文本框2"></el-input>
                </div>
              </div>
              <div style="flex: 1;">
                <h4>标题C</h4>
                <div>
                  <el-input v-model="inputC1" placeholder="文本框1"></el-input>
                </div>
                <div>
                  <el-input v-model="inputC2" placeholder="文本框2"></el-input>
                </div>
              </div>
            </div>
          </div>
        </el-main>

        <!-- 底部栏 -->
        <el-footer class="footer-all">
          <button-page/>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import {ElInput, ElContainer, ElAside, ElMain, ElFooter} from 'element-plus';
import AsidePage from "@/components/chat/AsidePage.vue";
import ButtonPage from "@/components/chat/ButtonPage.vue";

const inputA1 = ref('');
const inputA2 = ref('');
const inputB1 = ref('');
const inputB2 = ref('');
const inputC1 = ref('');
const inputC2 = ref('');
</script>

<style scoped>
.footer-all {
  height: 0;
  position: relative;
}

.aside-all {
  width: 250px;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
