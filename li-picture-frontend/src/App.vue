<script setup lang="ts">
import Main from './views/main/index.vue'
import { healthUsingGet } from '@/api/mainController.ts'

console.log(import.meta.env.VITE_BASE_URL)
healthUsingGet().then((res) => {
  console.log(res)
})
</script>

<template>
  <div class="app">
    <Main />
  </div>
</template>

<style lang="less" scoped></style>
