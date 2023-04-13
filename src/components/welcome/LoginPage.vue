<template>
  <div style="text-align: center;margin: 0 20px">
    <!--登录标题-->
    <div style="margin-top: 125px">
      <div style="font-size: 25px;font-weight: bold;margin-top: 10px">登录</div>
      <div style="font-size: 18px;color: grey;margin-top: 10px">在进入系统之前请先进行登录</div>
    </div>
    <div style="margin-top: 30px">
      <el-input v-model="form.username" type="text" placeholder="邮箱">
        <template #prefix>
          <el-icon>
            <User/>
          </el-icon>
        </template>
      </el-input>
      <el-input v-model="form.password"
                :type="form.showPassword ? 'text' : 'password'"
                style="margin-top: 10px"
                placeholder="密码">
        <template #prefix>
          <el-icon>
            <Lock/>
          </el-icon>
        </template>
        <template #suffix>
          <el-icon @click="form.showPassword = !form.showPassword">
            <View/>
          </el-icon>
        </template>
      </el-input>
    </div>
    <el-row style="margin-top: 5px">
      <el-col :span="12" style="text-align: left">
        <el-checkbox v-model="form.remember" label="记住我"/>
      </el-col>
      <el-col :span="12" style="text-align: right">
        <el-link @click="router.push('/forget')">忘记密码？</el-link>
      </el-col>
    </el-row>
    <div style="margin-top: 40px">
      <el-button @click="login()" style="width: 270px" type="success" plain>立即登录</el-button>
    </div>
    <el-divider>
      <span style="color: grey;font-size: 13px">没有账号</span>
    </el-divider>
    <div>
      <el-button style="width: 270px" @click="router.push('/register')" type="warning" plain>注册账号</el-button>
    </div>
  </div>
</template>

<script setup>
import {Lock, User, View} from '@element-plus/icons-vue'
import {reactive} from "vue";
import axios from 'axios';
// import {get, post} from "@/net";
import {ElMessage} from "element-plus";
import router from "@/router";

const form = reactive({
  username: '',
  password: '',
  remember: false,
  showPassword: false
})

const login = () => {
  if (!form.username || !form.password) {
    ElMessage.warning('请填写用户名和密码！');
  } else {
    axios.post('/user/login', {
      account: form.username,
      password: form.password,
    }).then(response => {
      const isOk = response.data.code;
      if(isOk === 0){
        ElMessage.error("登录失败，请重试");
      } else {
        const message = response.data.data;
        ElMessage.success(message);
        router.push('/forget');
      }
    }).catch(error => {
      console.error(error);
    });
  }
}
</script>

<style scoped>

</style>
