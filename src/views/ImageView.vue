<script setup lang="ts">
import { useImagesStore } from '@/stores/imagesStore';
import { ElButton, ElSwitch, ElSlider } from 'element-plus';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const imagesStore = useImagesStore();
const { image } = storeToRefs(imagesStore);

const route = useRoute();

const isGray = ref(false);
const blur = ref(0);

onMounted(() => {
  const id = Array.isArray(route.params.id)
    ? route.params.id[0]
    : route.params.id;
  imagesStore.loadImage(id || image.value?.id, isGray.value, blur.value);
});
</script>

<template>
  <div class="image-view">
    <img :src="image?.download_url" class="image" width="600" height="400" />
    <div class="image-view__controls">
      <ElSwitch v-model="isGray" active-text="Gray" inactive-text="Color" />
      <ElSlider
        v-model="blur"
        :step="1"
        show-stops
        :min="0"
        :max="10"
        :marks="{ 0: 'No blur', 10: 'Max blur' }"
        class="image-view__slider"
      />
      <ElButton @click="imagesStore.loadImage(image?.id || '', isGray, blur)">
        Load
      </ElButton>
    </div>
  </div>
</template>

<style scoped lang="scss">
.image-view {
  &__controls {
    display: flex;
    column-gap: 12px;
    margin-top: 64px;
  }

  &__slider {
    max-width: 384px;
    padding: 0 32px;

    :deep(.el-slider__marks) {
      width: 100%;
      .el-slider__marks-text {
        white-space: nowrap;
      }
    }
  }
}
</style>
