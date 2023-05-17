<template>
  <span class="show">付款成功后等待1分钟,点查询看余额</span>
  <span class="test">可以充值一毛钱进行测试</span>
  <div class="pay-container">
    <el-input v-model="balance" placeholder="请输入充值余额" @change="updateTimes"/>
    <span class="tip">增加 {{ Math.floor(times) }} 对话次数</span></div>
  <el-button type="primary" @click="recharge">生成二维码</el-button>
  <img :src="qrCodeUrl" alt="QR Code">
  <span class="show">充值若有问题,请联系邮箱 lhr@4gai.me</span>
</template>

<script setup>
import {computed, ref} from 'vue';
import {ElButton, ElInput, ElMessage} from 'element-plus';
import axios from "axios";

const qrCodeUrl = ref(''); // 二维码

const times = computed(() => {
  let value = balance.value;
  if (value < 0.1) {
    return 0;
  } else if(value == 0.1){
    return 5;
  } else if (value < 0.5) {
    return 0;
  } else if (value <= 1) {
    return Math.ceil(value * 50);
  } else if (value <= 3) {
    return 50 + Math.ceil((value - 1) * 60);
  } else if (value <= 10) {
    return 170 + Math.ceil((value - 3) * 85);
  } else {
    return 765 + Math.ceil((value - 10) * 100);
  }
});

const balance = ref('0.10');

function updateTimes() {
  balance.value = parseFloat(balance.value).toFixed(2);
}

function recharge() { // 生成二维码的逻辑
  const regex = /(^[1-9](\d+)?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/;
  if (!regex.test(balance.value.toString())) {
    ElMessage.error("请输入正确的充值余额，如有小数请保留两位小数")
    return
  }
  getQrCode()
}

function getQrCode() {
  axios.post('/balance/getQrCode', {
    price: balance.value,
    times: times.value,
    mail: localStorage.getItem('mail'),
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
