import {reactive} from 'vue'
import { defineStore } from 'pinia'

export const useStore = defineStore('store', () => {
  const auth = reactive({
    user: null
  })
  const arr = reactive([]) // 空数组
  return { auth, arr }
})
