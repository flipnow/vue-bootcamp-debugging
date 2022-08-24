<script setup lang="ts">
import { ElButton } from 'element-plus';
import { ref } from 'vue';

const counter = ref(0);

const increment = () => {
  counter.value + 1;
};
</script>

<template>
  <ElButton @click="increment()">{{ `Clicked ${counter} times` }}</ElButton>
</template>

<style scoped lang="scss"></style>
