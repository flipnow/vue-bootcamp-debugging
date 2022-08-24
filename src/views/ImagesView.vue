<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { useImagesStore } from '@/stores/imagesStore';
import { storeToRefs } from 'pinia';
import { ElInputNumber, ElButton } from 'element-plus';
import ImagesGrid from '../components/ImagesGrid.vue';
import ImageCard from '../components/ImageCard.vue';
import { faker } from '@faker-js/faker';
import type { OrientationType } from '@/types/OrientationType';

const imagesStore = useImagesStore();
const { images, limit, loadingImages } = storeToRefs(imagesStore);
const orientation = ref<OrientationType>('landscape-primary');

onMounted(() => {
  imagesStore.loadImages();

  const mapped = [...Array(25000)].map(() => ({
    id: faker.datatype.uuid(),
    text: faker.lorem.lines(),
  }));
  setTimeout(() => {
    console.table(mapped);
  }, 1000000);

  screen.orientation.addEventListener('change', () => {
    const { type } = screen.orientation;
    orientation.value = type;
  });
});

const handleAnonymise = () => {
  images.value.forEach((image) => {
    image.author = 'Anonymous';
  });
};
</script>

<template>
  <div class="images-view">
    <div class="images-view__controls">
      <div class="images-view__limit">
        <ElButton @click="handleAnonymise">Anonymize</ElButton>
        <ElInputNumber v-model="limit" :min="1" :max="20" />
        <ElButton
          type="primary"
          @click="imagesStore.loadImages"
          :loading="loadingImages"
        >
          Load new
        </ElButton>
      </div>
    </div>
    <ImagesGrid>
      <!-- <ImageCard v-for="image in images" :key="image.id" :image="image" /> -->
      <ImageCard
        v-for="(image, index) in images"
        :key="index"
        :image="image"
        :orientation="orientation"
      />
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
    padding: 16px 0;
  }

  &__limit {
    display: flex;
    align-items: center;
    gap: 16px;
  }
}
</style>
