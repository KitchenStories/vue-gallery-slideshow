import vue from 'rollup-plugin-vue';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.js',
  plugins: [
    vue(),
    (process.env.NODE_ENV === 'production' && terser())
  ],
  output: {
    file: process.env.NODE_ENV === 'production' ? 'dist/js/vue-gallery-slideshow.min.js' : 'dist/js/vue-gallery-slideshow.js',
    format: 'umd',
    name: 'VueGallerySlideshow',
  }
};
