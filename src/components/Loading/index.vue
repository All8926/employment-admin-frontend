<template>
  <div v-if="msg.show" class="loading-mask">
    <div class="content flex h-[100px] w-[120px] flex-col items-center justify-center rounded-[10px]">
      <loading-icon></loading-icon>
      <div class="text-[14px]">{{ msg.title }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'
import loadingIcon from '@/components/Loading/loadingIcon.vue'

const props = defineProps({
  msg: {
    type: Object,
    default: () => {
      return {
        msg: {
          show: false,
          title: '',
        },
      }
    },
  },
})
</script>

<style scoped>
.loading-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99999999;
}
.content {
  background-color: rgba(0, 0, 0, 0.6);
}
</style>
