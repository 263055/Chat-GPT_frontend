<script setup>
import {useStore} from "@/stores";
import router from "@/router";
import axios from "axios";

const store = useStore()

if (store.auth.user == null) {
  const tokenValue = localStorage.getItem('tokenValue')
  axios.get('/user/login', {
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "satoken": tokenValue
    },
    withCredentials: true
  }).then(response => {
    console.log(response.data)
    if (response.data.code === 1) {
      store.auth.user = response.data.data
      router.push('/login')
    } else {
      console.log(response.data.msg)
      store.auth.user = null
      router.push('/')
    }
  })
}
</script>

<template>
  <router-view/>
</template>

<style scoped>

</style>
