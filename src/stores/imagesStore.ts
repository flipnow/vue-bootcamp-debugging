import { defineStore } from 'pinia';
import { ref, shallowRef } from 'vue';
import axios from 'axios';
import type { ImageBaseInfo, ImageInfo } from '@/types/ImageInfo';

export const useImagesStore = defineStore('imagesStore', () => {
  const images = shallowRef<ImageInfo[]>([]);
  const loadingImages = ref(false);
  const image = ref<ImageBaseInfo | null>(null);
  const limit = ref(3);
  const loadingImage = ref(false);

  const loadImages = async () => {
    try {
      loadingImages.value = true;
      const { data } = await axios.get(
        `https://picsum.photos/v2/list?limit=${limit.value}&page=${Math.floor(
          Math.random() * 50
        )}`
      );
      images.value = data;
    } catch (error) {
      console.error(error);
    } finally {
      loadingImages.value = false;
    }
  };

  const loadImage = async (
    id: string | undefined,
    gray: boolean | undefined,
    blur: number | undefined
  ) => {
    try {
      loadingImage.value = true;
      const { data } = await axios.get(
        `https://picsum.photos/id/${id}/200/300?${gray ? `grayscale&` : ''}${
          blur && blur > 0 ? `blur=${blur}` : ''
        }`
      );
      image.value = {
        id: data.id,
        downloadUrl: data.url,
      };
    } catch (error) {
      console.error(error);
    } finally {
      loadingImage.value = false;
    }
  };

  return {
    loadingImages,
    images,
    limit,
    loadImages,

    loadImage,
    image,
    loadingImage,
  };
});
