<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item
      v-for="(item, index) in breadcrumbList"
      :key="item.path"
      :to="index !== breadcrumbList.length - 1 ? item.path : undefined"
      :replace="true"
    >
      {{ item.name }}
    </el-breadcrumb-item>
  </el-breadcrumb>
  <div class="h-[20px]"></div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import {routes} from "@/router/routes.js";

const route = useRoute()
const router = useRouter()


/**
 * 递归查找面包屑路径
 */
function findMatchedRoutes(path, routes, parentPath = []) {
  for (const r of routes) {
    const fullPath = r.path
    if (fullPath === path) {
      return [...parentPath, r]
    }

    if (r.children) {
      const result = findMatchedRoutes(path, r.children, [...parentPath, r])
      if (result.length) return result
    }
  }
  return []
}

const breadcrumbList = computed(() => {
  const matched = findMatchedRoutes(route.path, routes)

  return matched
    .filter(item => !item.meta?.hideInBreadcrumb) // 可配置隐藏
    .map(item => ({
      name: item.name,
      path: item.path
    }))
})
</script>
