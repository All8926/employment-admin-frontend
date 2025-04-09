<template>
	<el-container v-if="isLayout === false" class="layout-container-demo">

		<el-header style="text-align: right; font-size: 12px">
			<div class="toolbar">
				<el-dropdown>
					<el-icon style="margin-right: 8px; margin-top: 1px">
						<setting />
					</el-icon>
					<template #dropdown>
						<el-dropdown-menu>
							<el-dropdown-item @click="userStore.logout()">退出登录</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
				<span>Tom</span>
			</div>
		</el-header>

		<el-container>
			<el-aside width="200px" style="height: calc(100vh - 60px);">
				<el-scrollbar>
					<el-menu router :default-active="activeMenu">
						<component :is="menuContent" />
					</el-menu>
				</el-scrollbar>
			</el-aside>
			<el-main style="height: calc(100vh - 60px);">
				<el-scrollbar>
					<Breadcrumb />
					<!-- 添加 router-view 来处理嵌套路由 -->
					<router-view />
				</el-scrollbar>
			</el-main>
		</el-container>

	</el-container>
	<div v-if="isLayout === true">
		<router-view></router-view>
	</div>
</template>

<script setup>
import { ref, computed, h,watchEffect  } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {routes} from '@/router/routes.js'

import Breadcrumb from '@/components/Breadcrumb/index.vue'
import { Setting } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/modules/user'
const userStore = useUserStore()

const userinfo = computed(() => userStore?.userInfo)
const currentUserRole = computed(() => userinfo.value?.userRole)

const router = useRouter()
const route = useRoute()

const isLayout = ref(null)

watchEffect(() => {
	if (route.meta.hideInLayout === undefined) {
		isLayout.value = false
	} else {
		isLayout.value = route.meta.hideInLayout
	}
})

/**
 * 递归生成菜单项
 */
const generateMenu = (routes) => {
	return routes
			.filter(route => {
				if (route.meta?.hideInLayout || route.meta?.hideInMenu) return false
				const routeRole = route.meta?.userRole
				if (!routeRole) return true
				if (Array.isArray(routeRole)) return routeRole.includes(currentUserRole.value)
				return routeRole === currentUserRole.value
			})
			.map(route => {
				if (route.children && route.children.length > 0) {
					return h(
							ElSubMenu,
							{ index: route.path },
							{
								title: () =>
										h(
												'div',
												{
													style: 'width: 100%; display: flex; align-items: center; cursor: pointer;',
													onClick: (e) => {
														e.stopPropagation() // 防止影响展开
														router.push(route.path)
													}
												},
												route.name
										),
								default: () => generateMenu(route.children)
							}
					)
				} else {
					return h(
							ElMenuItem,
							{ index: route.path },
							() => route.name
					)
				}
			})
}

const menuContent = computed(() => {
	return {
		render: () => generateMenu(routes)
	}
})

const activeMenu = computed(() => {
	const matched = route.matched
	return matched[matched.length - 1]?.path || route.path
})

</script>


<style scoped>
.layout-container-demo .el-header {
	position: relative;
	background-color: var(--el-color-primary-light-7);
	color: var(--el-text-color-primary);
}
.layout-container-demo .el-aside {
	color: var(--el-text-color-primary);
	/* background: var(--el-color-primary-light-8); */
}
.layout-container-demo .el-menu {
	border-right: none;
}

.layout-container-demo .toolbar {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	right: 20px;
}


</style>
