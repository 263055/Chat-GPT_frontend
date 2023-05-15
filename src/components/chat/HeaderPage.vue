<template>
  <div class="header-all">
    <el-col :span="4" class="header-left">
      <el-icon class="collapse-icon" @click="store.isMinimize.isMinimize = !store.isMinimize.isMinimize">
        <template v-if="store.isMinimize.isMinimize">
          <TurnOff/>
        </template>
        <template v-else>
          <Open/>
        </template>
      </el-icon>
    </el-col>
    <el-col :span="16" class="header-title">
      ChatGPT
    </el-col>
    <el-col :span="4" class="header-right">

      <el-tooltip content="充值">
        <el-icon class="switch-icon" @click="payment()">
          <Shop/>
        </el-icon>
      </el-tooltip>

      <el-tooltip content="注销">
        <el-icon class="switch-icon" @click="layout()">
          <SwitchButton/>
        </el-icon>
      </el-tooltip>
    </el-col>

    <!--充值设置框-->
    <el-dialog v-model="dialogFormVisible3" title="充值" width="400px">
      <div class="slider-demo-block">
        <span>充值方式：</span>
        <el-button type="info" @click="showShop = 1">白嫖</el-button>
        <el-button type="info" @click="showShop = 2">充值</el-button>
        <span> 查看余额：</span>
        <el-button type="info" @click="checkBalance">查询</el-button>
      </div>
      <div v-show="showShop === 1">
        <invite-page/>
      </div>
      <div v-show="showShop === 2">
        <pay-page/>
      </div>
      <div v-show="showShop === 3">
        <p> 剩余对话次数 ：{{ times === -100 ? '获取失败,请重新查询' : times }}</p>
        <p> 累计充值 ：{{ charge === -100 ? '获取失败,请重新查询' : charge }}</p>
      </div>
      <!--其他按钮-->
      <template #footer>
      <span class="dialog-footer">
          <el-button type="primary" @click="dialogFormVisible3 = false">退出</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import {Open, SwitchButton, TurnOff, Shop} from "@element-plus/icons-vue";
import {ElCol, ElIcon, ElMessage, ElButton} from 'element-plus';
import axios from "axios";
import router from "@/router";
import Cookies from "js-cookie";
import {useStore} from "@/stores";
import InvitePage from "@/components/util/InvitePage.vue";
import PayPage from "@/components/util/PayPage.vue";
import {ref} from "vue";

const store = useStore()
let dialogFormVisible3 = ref(false); // 充值弹出框
const showShop = ref(0)
const times = ref(-100)
const charge = ref(-100)

// 支付按钮
const payment = () => {
  dialogFormVisible3.value = !dialogFormVisible3.value
}

// 注销操作
const layout = () => {
  const mail = localStorage.getItem('mail');
  axios.get('/user/layout', {
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "satoken": localStorage.getItem('tokenValue'),
    },
    params: {
      mail: mail
    },
    withCredentials: true
  }).then(response => {
    if (response.data.code === 200) {
      ElMessage.success(response.data.data)
    } else {
      ElMessage.success(response.data.data)
    }
    router.push('/login')
    console.log('layout')
    Cookies.remove('tokenName');
    Cookies.remove('satoken');
    Cookies.remove('mail');
    localStorage.removeItem('tokenName');
    localStorage.removeItem('satoken');
    localStorage.removeItem('mail');
  })
}

// 查询余额
const checkBalance = () => {
  showShop.value = 3
  const mail = localStorage.getItem('mail');
  axios.get('/balance/getBalance?mail=' + mail, {
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "satoken": localStorage.getItem('tokenValue')
    },
    withCredentials: true
  }).then(response => {
    console.log(response.data.data)
    if (response.data.code === 1) {
      times.value = response.data.data.times
      charge.value = response.data.data.chargedAmount
      ElMessage.success("余额查询成功")
    } else {
      ElMessage.error("查询出错,请重新尝试")
    }
  })
};
</script>

<style scoped>
.collapse-icon {
  width: 25px;
  height: 25px;
  margin-left: 10px;
  transform: scale(1.7);
}

.switch-icon {
  width: 25px;
  height: 25px;
  transform: scale(1.7);
  margin-left: 20px;
  margin-right: 5px;
}

@media (max-width: 768px) {
  .header-right {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }

  .switch-icon {
    margin: 0 10px;
    transform: scale(1.2);
  }
}


.header-right {
  text-align: right;
}

.header-title {
  text-align: center;
  font-size: 24px;
}
</style>

