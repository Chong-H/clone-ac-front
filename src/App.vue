<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="nav">
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
      
    </div>
  </header>
  <RouterView />
</template>

<style scoped>
.nav {
  display: flex;
  justify-content: space-around;
  padding: 10px;
  background-color: darkslategrey;
}
</style>
