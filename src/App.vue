<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="nav">
      <RouterLink to="/">UserLoginView</RouterLink>
      <RouterLink to="/Sign">SignView</RouterLink>
      <RouterLink to="/user-view">UserManageView</RouterLink>
      <RouterLink to="/digital-collectible-view">DigitalCollectibleView</RouterLink>
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
