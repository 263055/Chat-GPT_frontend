import {reactive} from 'vue'
import {defineStore} from 'pinia'

export const useStore = defineStore('store', () => {
    // const auth = reactive({
    //     user: null
    // })
    const curPage = reactive({
        page: null
    })
    const arr = reactive([]) // 空数组
    const isMinimize = reactive({
        isMinimize: false
    })
    const curButton = reactive({
        mail: null,
        region: null,
        name: null,
        id: null
    })
    const userSetting = reactive({
        maxContext: 0,
        temperature: 1.0,
        frequencyPenalty: 2.0,
        presencePenalty: 2.0,
        type: 0,
    })
    return {curPage, arr, curButton, isMinimize,userSetting}
})
