<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import Header from './cpns/Header.vue'
import Content from './cpns/Content.vue'
import Footer from './cpns/Footer.vue'
</script>

<template>
  <div class="main">
    <a-layout>
      <a-layout-header>
        <Header />
      </a-layout-header>
      <a-layout-content>
        <Content />
      </a-layout-content>
      <a-layout-footer>
        <Footer />
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<style lang="less" scoped>
.main {
  .ant-layout {
    min-height: 100vh;
    .ant-layout-header {
      background-color: #fff;
      width: 100vw;
    }
  }
}
</style>
