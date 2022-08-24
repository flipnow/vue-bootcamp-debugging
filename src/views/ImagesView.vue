<script setup lang="ts">
import { onMounted } from 'vue';
import { useImagesStore } from '@/stores/imagesStore';
import { storeToRefs } from 'pinia';
import { ElInputNumber, ElButton } from 'element-plus';
import ImagesGrid from '../components/ImagesGrid.vue';
import ImageCard from '../components/ImageCard.vue';

const imagesStore = useImagesStore();
const { images, limit } = storeToRefs(imagesStore);

onMounted(() => {
  imagesStore.loadImages();
});
</script>

<template>
  <div class="images-view">
    <div class="images-view__controls">
      <div class="images-view__limit">
        <ElInputNumber v-model="limit" :min="1" :max="20" />
        <ElButton type="primary" @click="imagesStore.loadImages">
          Load new
        </ElButton>
      </div>
    </div>
    <ImagesGrid>
      <ImageCard v-for="image in images" :key="image.id" :image="image" />
    </ImagesGrid>
  </div>
</template>

<style scoped lang="scss">
.images-view {
  display: flex;
  flex-direction: column;
  gap: 32px;

  &__controls {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__limit {
    display: flex;
    align-items: center;
    gap: 16px;
  }
}
</style>
