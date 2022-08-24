<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { ElContainer, ElHeader, ElMain } from 'element-plus';
</script>

<template>
  <ElContainer>
    <ElHeader class="header">
      <RouterLink to="/" class="brand">
        <img alt="Vue logo" src="@/assets/logo.svg" width="45" height="45" />
        <h1>Vue bootcamp 2022</h1>
      </RouterLink>

      <nav>
        <RouterLink to="/image">Image workbench</RouterLink>
      </nav>
    </ElHeader>
    <ElMain>
      <RouterView />
    </ElMain>
  </ElContainer>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  align-items: center;
  padding: 12px 0;
  justify-content: space-between;

  .brand {
    display: flex;
    align-items: center;
    column-gap: 12px;
    text-decoration: none;
  }

  nav {
    display: flex;
    column-gap: 16px;
    margin-left: 32px;
  }
}
</style>
