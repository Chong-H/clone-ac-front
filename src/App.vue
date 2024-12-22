<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <div class="app-container">
    <header class="nav-header">
      <!-- 这里是刘海导航栏 -->
      <nav class="nav-content">
        <!-- Login -->
        <RouterLink to="/">UserLoginView</RouterLink>
        <!-- sign up for -->
        <RouterLink to="/Sign">SignView</RouterLink>
        <!-- admin view -->
        <RouterLink to="/user-view">UserManageView</RouterLink>
        <!-- launch goods -->
        <RouterLink to="/digital-collectible-view">DigitalCollectibleView</RouterLink>
        <!-- transmit hall -->
        <RouterLink to="/Store">StoreView</RouterLink>
        <!-- message hall -->
        <RouterLink to="/Message">MessageView</RouterLink>
      </nav>
    </header>
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<!-- 组件局部样式 -->
<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  /* position: fixed; */
}

.nav-header {
  width: 100%;
  background: linear-gradient(to bottom, darkslategrey, darkslategrey);
  border-radius: 0 0 20px 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 15px 0;
  z-index: 100;
}

.nav-content {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 20px;
}

.main-content {
  flex: 1;
  display: flex;
  justify-content: center;
  /* 水平居中 */
  align-items: center;
  /* 垂直居中 */
  position: relative;
  width: 100%;
}
</style>
