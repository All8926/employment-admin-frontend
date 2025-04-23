<template>
	<el-container v-if="isLayout === false" class="layout-container-demo">

		<el-header class="flex justify-between items-center ">
			<div class=" text-[20px]">就业信息管理系统</div>
			<div>

				<el-dropdown>
					<div class="pr-[20px] flex items-center gap-[10px]"> 
						<el-avatar :size="26" :src="userinfo?.userAvatar"  >
							<el-icon>
								<UserFilled />
							</el-icon>
						</el-avatar>
						<span class="text-[16px]">{{userinfo?.userRole === 'enterprise' ? userinfo?.enterpriseName : userinfo?.userName}}</span>
					</div>
					<template #dropdown>
						<el-dropdown-menu>
							<el-dropdown-item @click="userStore.logout()">
								<el-icon>
									<SwitchButton />
								</el-icon>
								退出登录</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>

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
					<el-config-provider :locale="zhCn">
						<router-view />
						</el-config-provider>
				
				</el-scrollbar>
			</el-main>
		</el-container>

	</el-container>
	<div v-if="isLayout === true">
		<router-view></router-view>
	</div>
</template>

<script setup>
import { ref, computed, h, watchEffect } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { routes } from '@/router/routes.js'

import zhCn from 'element-plus/es/locale/lang/zh-cn';
import Breadcrumb from '@/components/Breadcrumb/index.vue'
import * as Icons from '@element-plus/icons-vue'
import { UserFilled, SwitchButton } from '@element-plus/icons-vue'

import { useUserStore } from '@/stores/modules/user'
const userStore = useUserStore()

const userinfo = computed(() => userStore?.userinfo)
const currentUserRole = computed(() => userinfo.value?.userRole)
console.log(userinfo, 'userinfo');

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

const renderTitle = (route) => {
	const iconName = route.meta?.icon
	const IconComponent = iconName ? Icons[iconName] : null

	return [
		IconComponent ? h(IconComponent, { style: 'width:18px;' }) : null,
		h('span', { style: 'margin-left: 6px;' }, route.name)
	]
}

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
			const iconName = route.meta?.icon
			const IconComponent = iconName ? Icons[iconName] : null

			if (route.children && route.children.length > 0) {
				return h(
					ElSubMenu,
					{ index: route.path },
					{
						title: () => renderTitle(route),
						default: () => generateMenu(route.children)
					}
				)
			} else {
				return h(
					ElMenuItem,
					{ index: route.path },
					{
						default: () => [
							IconComponent ? h(IconComponent, { style: 'width:18px;' }) : null,
							h('span', { style: 'margin-left: 5px;' }, route.name)
						]
					}
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

.el-tooltip__trigger:focus-visible {
	outline: unset;
}
:deep(.el-menu-item.is-active){
	background-color: var(--el-color-primary-light-8);
}
</style>
