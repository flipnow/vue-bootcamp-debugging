<script setup lang="ts">
import type { ImageInfo } from '@/types/ImageInfo';
import type { OrientationType } from '@/types/OrientationType';
import { ElCard, ElTag } from 'element-plus';
import { ref } from 'vue';
import BaseLink from './BaseLink.vue';
import OpacityTransition from './OpacityTransition.vue';

defineProps<{
  image: ImageInfo;
  orientation?: OrientationType;
}>();

const isImageLoaded = ref(false);
</script>

<template>
  <ElCard @click="$router.push({ name: 'image' })">
    <div
      :class="{
        'image-card__preview': true,
        'image-card__preview--portrait': orientation === 'portrait-primary',
      }"
    >
      <OpacityTransition>
        <img
          :src="image.downloadUrl"
          isImageLoaded
          @load="isImageLoaded = true"
        />
      </OpacityTransition>
    </div>
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

    img {
      width: 100%;
      height: 100%;
    }
  }

  &__content {
    display: flex;
    justify-content: space-between;
    padding: 12px 0;
  }
}
</style>
