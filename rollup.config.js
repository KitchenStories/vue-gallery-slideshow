import vue from "rollup-plugin-vue";
import babel from "rollup-plugin-babel";
import { terser } from "rollup-plugin-terser";
import commonjs from "rollup-plugin-commonjs";

export default {
  input: "src/index.js",
  plugins: [
    commonjs(),
    vue(),
    babel({
      babelrc: true,
      runtimeHelpers: true,
      externalHelpers: false,
      exclude: "node_modules/**",
    }),
    (process.env.BUILD_MODE === "minify" && terser())
  ],
  output: {
    file: process.env.BUILD_MODE === "minify" ? "dist/js/vue-gallery-slideshow.min.js" : "dist/js/vue-gallery-slideshow.js",
    format: "umd",
    name: "VueGallerySlideshow",
  }
};
