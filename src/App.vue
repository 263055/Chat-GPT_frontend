<script setup>
import {useStore} from "@/stores";
import router from "@/router";
import axios from "axios";

const store = useStore()

if (localStorage.getItem('mail') == null) {
  const tokenValue = localStorage.getItem('tokenValue')
  axios.get('/user/login', {
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "satoken": tokenValue
    },
    withCredentials: true
  }).then(response => {
    if (response.data.code === 1) {
      localStorage.setItem('mail', response.data.data);
      router.push('/chat')
    } else {
      router.push('/login')
    }
  })
}
</script>

<template>
  <router-view/>
</template>

<style scoped>

</style>
