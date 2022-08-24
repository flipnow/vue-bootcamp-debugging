import { defineConfig } from 'vitest/config';
import config from './vite.config';

export default defineConfig({
  ...config,
  test: {
    environment: 'happy-dom',
  },
});
