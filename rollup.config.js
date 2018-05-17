import VuePlugin from 'rollup-plugin-vue';
import BabelPlugin from 'rollup-plugin-babel';
import UglifyPlugin from 'rollup-plugin-uglify';

export default {
  entry: 'src/index.js',
  plugins: [
    VuePlugin(),
    BabelPlugin({
      babelrc: true,
      runtimeHelpers: true,
      externalHelpers: false,
      exclude: 'node_modules/**',
    }),
    (process.env.NODE_ENV === 'production' && UglifyPlugin())
  ],
  output: {
    file: process.env.NODE_ENV === 'production' ? 'dist/js/vue-gallery-slideshow.min.js' : 'dist/js/vue-gallery-slideshow.js',
    format: 'umd',
    name: 'VueGallerySlideshow',
  }
};
