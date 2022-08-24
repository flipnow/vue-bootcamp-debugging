<script setup lang="ts">
import type { ImageInfo } from '@/types/ImageInfo';
import type { OrientationType } from '@/types/OrientationType';
import { ElCard, ElTag } from 'element-plus';
import BaseLink from './BaseLink.vue';

defineProps<{
  image: ImageInfo;
  orientation?: OrientationType;
}>();
</script>

<template>
  <ElCard @click="$router.push({ name: 'image' })">
    <img
      :src="image.downloadUrl"
      :class="{
        'image-card__preview': true,
        'image-card__preview--portrait': orientation === 'portrait-primary',
      }"
    />
    <div class="image-card__content">
      <span>{{ image.author }}</span>
      <ElTag type="info">{{ `${image.width} x ${image.height}` }}</ElTag>
    </div>
    <div class="image-card__footer">
      <BaseLink :href="image.url">View image origin</BaseLink>
    </div>
  </ElCard>
</template>

<style scoped lang="scss">
.image-card {
  &__preview {
    width: 300px;
    height: 200px;

    &--portrait {
      width: 200px;
      height: 300px;
    }
  }

  &__content {
    display: flex;
    justify-content: space-between;
    padding: 12px 0;
  }
}
</style>
