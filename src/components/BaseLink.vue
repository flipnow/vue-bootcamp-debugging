<script setup lang="ts">
import { ElLink } from 'element-plus';
</script>

<template>
  <ElLink>
    <slot />
  </ElLink>
</template>

<style scoped lang="scss">
.el-link:focus-visible {
  outline: auto;
}
</style>
