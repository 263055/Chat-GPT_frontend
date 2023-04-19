import {reactive} from 'vue'
import { defineStore } from 'pinia'

export const useStore = defineStore('store', () => {
  const auth = reactive({
    user: null
  })
  const curPage = reactive({
    page: null
  })
  const arr = reactive([]) // 空数组
  const curButton = reactive({
    mail: null,
    region: null,
    name: null,
    id: null
  })
  return { auth, curPage, arr, curButton}
})
