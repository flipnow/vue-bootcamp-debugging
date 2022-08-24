<script setup lang="ts">
import type { ImageInfo } from '@/types/ImageInfo';
import { ElCard, ElTag } from 'element-plus';
import { ref } from 'vue';
import BaseLink from './BaseLink.vue';
import OpacityTransition from './OpacityTransition.vue';

defineProps<{
  image: ImageInfo;
}>();

const isImageLoaded = ref(false);
</script>

<template>
  <RouterLink :to="{ name: 'image', params: { id: image.id } }">
    <ElCard>
      <div class="image-card__preview">
        <OpacityTransition>
          <img
            :src="image.download_url"
            @load="isImageLoaded = true"
            v-show="isImageLoaded"
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
  </RouterLink>
</template>

<style scoped lang="scss">
.image-card {
  &__preview {
    width: 300px;
    height: 200px;

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
