<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { useImagesStore } from '@/stores/imagesStore';
import { storeToRefs } from 'pinia';
import { ElInputNumber, ElButton } from 'element-plus';
import ImagesGrid from '../components/ImagesGrid.vue';
import ImageCard from '../components/ImageCard.vue';
import { faker } from '@faker-js/faker';
import { debounce } from 'lodash';
import type { OrientationType } from '@/types/OrientationType';
import CounterButton from '../components/CounterButton.vue';

const imagesStore = useImagesStore();
const { images, limit } = storeToRefs(imagesStore);
const orientation = ref<OrientationType>('landscape-primary');
// let handle: ReturnType<typeof setTimeout> | undefined;

const handleResize = debounce(imagesStore.loadImages, 500);

onMounted(() => {
  imagesStore.loadImages();

  const mapped = [...Array(25000)].map(() => ({
    id: faker.datatype.uuid(),
    text: faker.lorem.lines(),
  }));
  setTimeout(() => {
    console.table(mapped);
  }, 1000000);

  window.addEventListener('resize', handleResize);
  screen.orientation.addEventListener('change', () => {
    const { type } = screen.orientation;
    orientation.value = type;
  });
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  // clearTimeout(handle);
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
        <ElInputNumber v-model="limit" :min="1" :max="20" />
        <ElButton type="primary" @click="imagesStore.loadImages">
          Load new
        </ElButton>
        <ElButton @click="handleAnonymise">Anonymise</ElButton>
        <CounterButton />
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
  }

  &__limit {
    display: flex;
    align-items: center;
    gap: 16px;
  }
}
</style>
