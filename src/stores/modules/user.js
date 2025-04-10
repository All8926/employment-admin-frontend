import { defineStore } from 'pinia'
import { store } from '@/stores/index'

import router from "@/router/index"
import { userLogout, getCurrentUser } from "@/api/index.js";

// console.log("store", store);

export const useUserStore = defineStore("user", {

    state: () => ({
        userinfo: {},
        departmentDate: [],
    }),
    actions: {
        // 退出登录
        async logout() {
            await userLogout()
            this.userinfo = null
            router.replace('/login')
        },

        // 获取当前用户详情
        async getUserInfo() {
            const res = await getCurrentUser()
            this.userinfo = res.data
            return res.data
        },


    },

    persist: {
        key: "user",
        paths: ["treeData", "userinfo",]
    }
})

