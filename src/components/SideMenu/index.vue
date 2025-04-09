<template>
    <el-menu
        :default-active="activeMenu"
        router
        @select="handleMenuSelect"
        class="el-menu-vertical-demo"
    >
        <template v-for="route in filteredRoutes">
            <!-- 递归渲染菜单 -->
            <el-sub-menu v-if="route.children && route.children.length > 0" :index="route.path" :key="route.path">
                <template #title>
                    <el-icon v-if="route.meta?.icon">
                        <component :is="route.meta.icon" />
                    </el-icon>
                    <span>{{ route.name }}</span>
                </template>
                <!-- 递归子菜单 -->
                <side-menu :routes="route.children" />
            </el-sub-menu>

            <!-- 渲染菜单项 -->
            <menu-item v-else :route="route" :key="route.path" />
        </template>
    </el-menu>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/modules/user'
import MenuItem from './MenuItem.vue'

const userStore = useUserStore()
const router = useRouter()
const route = useRoute()

// 获取当前用户信息
const userinfo = computed(() => userStore?.userInfo)
const currentUserRole = computed(() => userinfo.value?.userRole)

// 过滤路由，支持根据 meta 字段过滤菜单
const filteredRoutes = computed(() => {
    return router.options.routes
        .filter(route => {
            if (route.meta?.hideInMenu) return false // 不显示隐藏菜单
            const routeRole = route.meta?.userRole
            if (!routeRole) return true // 没有权限控制的菜单
            return Array.isArray(routeRole) ? routeRole.includes(currentUserRole.value) : routeRole === currentUserRole.value
        })
})

// 当前选中的菜单
const activeMenu = computed(() => route.path)

// 处理菜单项点击事件
const handleMenuSelect = (index) => {
    router.push(index) // 跳转到对应的路由
}
</script>
