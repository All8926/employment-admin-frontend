import {defineStore} from 'pinia'
import {store} from '@/stores/index'

import router from "@/router/index"
import {userLogout} from "@/api/index.js";

// console.log("store", store);

export const useUserStore = defineStore("user", {

    state: () => ({
        userinfo: {
            name: 'admin',
        },

    }),
    actions: {
        // 退出登录
        async logout() {
            await userLogout()
            this.userinfo = null
            router.replace('/login')
        }


    },

    persist: {
        key: "user",
        paths: ["token", "userinfo",]
    }
})

