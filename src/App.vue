<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="nav">
      <RouterLink to="/">UserLoginView</RouterLink>
      <RouterLink to="/user-view">UserView</RouterLink>
      <RouterLink to="/digital-collectible-view">DigitalCollectibleView</RouterLink>
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
