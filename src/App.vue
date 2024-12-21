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

<!-- 全局样式，不加 scoped -->
<style>
/* 重置默认样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body, #app {
  height: 100%;
  margin: 0;
  padding: 0;
  width: 100%;
  overflow-x: hidden;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  width: 100%;
}

.main-content {
  flex: 1;
  display: flex;
  position: relative;
  width: 100%;
}
</style>

<!-- 组件局部样式 -->
<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
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
</style>
