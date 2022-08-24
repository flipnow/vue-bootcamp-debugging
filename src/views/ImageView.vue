<script setup lang="ts">
import { useImagesStore } from '@/stores/imagesStore';
import { ElButton, ElSwitch, ElSlider } from 'element-plus';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import OpacityTransition from '../components/OpacityTransition.vue';

const imagesStore = useImagesStore();
const { image, loadingImage } = storeToRefs(imagesStore);

const route = useRoute();

const isImageLoaded = ref(false);
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
    <div class="image-view__preview">
      <OpacityTransition>
        <img
          :src="image?.download_url"
          class="image"
          width="600"
          height="400"
          @load="isImageLoaded = true"
          v-show="isImageLoaded"
        />
      </OpacityTransition>
    </div>
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
      <ElButton
        @click="imagesStore.loadImage(image?.id || '', isGray, blur)"
        :loading="loadingImage"
      >
        Load
      </ElButton>
    </div>
  </div>
</template>

<style scoped lang="scss">
.image-view {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__preview {
    width: 600px;
    height: 400px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  &__controls {
    display: flex;
    column-gap: 12px;
    margin-top: 64px;
  }

  &__slider {
    width: 384px;
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
