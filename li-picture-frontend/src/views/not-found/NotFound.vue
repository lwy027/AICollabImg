<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<template>
  <div class="not-found">
    <h1>没有此{{ route.params.pathMatch }}页面请重新输入</h1>
  </div>
</template>

<style lang="less" scoped></style>
