<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import Header from './cpns/Header.vue'
import Footer from './cpns/Footer.vue'
import GlobalSider from '@/components/main/GlobalSider.vue'
</script>

<template>
  <div class="main">
    <a-layout>
      <a-layout-header class="header">
        <Header />
      </a-layout-header>
      <GlobalSider class="sider" />

      <a-layout-content class="content">
        <RouterView />
      </a-layout-content>
      <a-layout-footer>
        <Footer />
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<style lang="less" scoped>
.main {
  min-height: 100vh;

  .ant-layout {
    min-height: 100vh;

    .ant-layout-header {
      background-color: #fff;
    }
  }
  .content {
    position: relative;
    left: 70px;
    top: 90px;
    width: 89%;
    z-index: 10;
  }
  .header {
    margin-bottom: 1px;
  }

  .sider {
    background: #fff;
    padding-top: 20px;
    border-right: 0.5px solid #eee;
  }
}
.main .ant-layout:deep(.ant-menu-root) {
  border-bottom: none !important;
  border-inline-end: none !important;
}
</style>
