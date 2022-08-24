<script setup lang="ts">
import { ElLink } from 'element-plus';
</script>

<template>
  <ElLink>
    <slot />
  </ElLink>
</template>

<style scoped lang="scss">
:deep(.el-link) {
  outline: auto;
}
</style>
