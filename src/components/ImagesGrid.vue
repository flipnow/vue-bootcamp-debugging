<script setup lang="ts"></script>

<template>
  <div class="images-grid">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.images-grid {
  display: flex;
  justify-content: center;
  gap: 8px;
}
</style>
