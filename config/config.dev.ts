import { defineConfig } from '@umijs/max';
import define from './define';

export default defineConfig({
  mfsu: false,
  base: '/admin-dev/',
  publicPath: '/admin-dev/',
  define: {
    ...define,
    API_URL_PREFIX: '/api-dev',
  },
});
