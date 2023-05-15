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
        <el-link @click="router.push('/login/forget')">忘记密码？</el-link>
      </el-col>
    </el-row>
    <div style="margin-top: 40px">
      <el-button @click="login()" style="width: 270px" type="success" plain>立即登录</el-button>
    </div>
    <el-divider>
      <span style="color: grey;font-size: 13px">没有账号</span>
    </el-divider>
    <div>
      <el-button style="width: 270px" @click="router.push('/login/register')" type="warning" plain>注册账号</el-button>
    </div>
  </div>
</template>

<script setup>
import {Lock, User, View} from '@element-plus/icons-vue'
import {reactive} from "vue";
import axios from 'axios';
import {ElMessage} from "element-plus";
import router from "@/router";
import {useStore} from "@/stores";

const store = useStore()

const form = reactive({
  username: localStorage.getItem('remember') === 'true' ? localStorage.getItem('username') : '',
  password: localStorage.getItem('remember') === 'true' ? localStorage.getItem('password') : '',
  remember: localStorage.getItem('remember') === 'true',
  showPassword: false
})

const login = () => {
  if (!form.username || !form.password) {
    ElMessage.warning('请填写用户名和密码！');
  } else {
    axios.post('/user/login', {
      account: form.username,
      password: form.password,
    }, {
      headers: {
        "content-type": "application/json",
        "satoken": localStorage.getItem('tokenValue')
      }
    }).then(response => {
      const isOk = response.data.code;
      if (isOk === 500) {
        ElMessage.error(response.data.msg);
      } else {
        localStorage.setItem('tokenName',  response.data.data.data.tokenName);
        localStorage.setItem('tokenValue',  response.data.data.data.tokenValue);
        localStorage.setItem('satoken', response.data.data.data.tokenName);
        localStorage.setItem('mail', form.username);
        localStorage.setItem('username', form.username);
        localStorage.setItem('password', form.password);
        localStorage.setItem('remember', form.remember + '');
        ElMessage.success("登录成功");
        router.push('/chat/main');
        getSetting();
      }
    }).catch(error => {
      console.error(error);
    });
  }
}

const getSetting = () => {
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
      store.userSetting.type = response.data.data.type
    }
  })
}
</script>

<style scoped>

</style>
