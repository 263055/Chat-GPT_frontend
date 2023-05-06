<template>
  <span class="show">暂时不要用手机端支付,付款成功后等待1分钟,点查询看余额</span>
  <span class="test">可以充值一毛钱进行测试</span>
  <div class="pay-container">
    <el-input v-model="balance" placeholder="请输入充值余额，最低为1" @change="updateTimes"/>
    <span class="tip">增加 {{ Math.floor(times) }} 对话次数</span></div>
  <el-button type="primary" @click="recharge">生成二维码</el-button>
  <img :src="qrCodeUrl" alt="QR Code">
  <span class="show">充值若有问题,请联系邮箱 lhr@4gai.me</span>
  <span class="show">暂时不要用手机端支付</span>
</template>

<script setup>
import {computed, ref} from 'vue';
import {ElButton, ElInput, ElMessage} from 'element-plus';
import axios from "axios";
import Cookies from "js-cookie";

const qrCodeUrl = ref(''); // 二维码

const balance = ref(0.1);
const times = computed(() => balance.value * 75);

function updateTimes() {
  balance.value = parseFloat(balance.value.toFixed(2));
}

function recharge() { // 生成二维码的逻辑
  const regex = /(^[1-9](\d+)?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/;
  if (!regex.test(balance.value.toString())) {
    ElMessage.error("请输入正确的充值余额，如有小数请保留两位小数")
    return
  }
  if (balance.value < 2) {
    if(balance.value === 0.1){
      getQrCode()
      return;
    }
    ElMessage.error("充值余额最低为2")
    return
  }
  getQrCode()
}

function getQrCode() {
  axios.post('/balance/getQrCode', {
    price: balance.value,
    times: times.value,
    mail: Cookies.get('mail'),
  }, {
    headers: {
      "content-type": "application/json",
      "satoken": localStorage.getItem('tokenValue')
    }
  }).then(response => {
    const isOk = response.data.code;
    if (isOk === 0) {
      ElMessage.error(response.data.msg);
    } else {
      const res = JSON.parse(response.data.data);
      const qrCode = res.info.qr;
      qrCodeUrl.value = 'https://xorpay.com/qr?data=' + qrCode
    }
  }).catch(error => {
    console.error(error);
  });
}
</script>

<style scoped>
.pay-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  margin-bottom: 10px;
}

.tip {
  margin-left: 5px;
  white-space: nowrap;
}

.show {
  margin-top: 5px;
  color: red;
  font-size: 18px;
  text-align: center;
  display: block;
}

.test {
  margin-top: 5px;
  text-align: center;
  display: block;
}
</style>
