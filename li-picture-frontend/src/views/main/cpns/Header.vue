<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import GlobalHeader from '@/components/main/GlobalHeader.vue'
</script>

<template>
  <div class="header"><GlobalHeader /></div>
</template>

<style lang="less" scoped>
.header {
  width: 100vw;
  padding-inline: 20px;
  margin-bottom: 16px;
  color: unset;
  background: white;
  position: fixed;
}
</style>
