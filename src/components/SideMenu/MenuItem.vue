<template>
    <el-menu-item :index="route.path">
        <el-icon v-if="route.meta?.icon">
            <component :is="route.meta.icon" />
        </el-icon>
        <span>{{ route.name }}</span>
    </el-menu-item>
</template>

<script setup>
defineProps({
    route: {
        type: Object,
        required: true
    }
})
</script>
