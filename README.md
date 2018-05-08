<p>
  <a href="https://travis-ci.org/KitchenStories/vue-gallery-slideshow"><img src="https://img.shields.io/travis/KitchenStories/vue-gallery-slideshow.svg?style=flat-square"></a>
  <a href="https://www.npmjs.com/package/vue-gallery-slideshow"><img src="https://img.shields.io/npm/dt/vue-gallery-slideshow.svg?style=flat-square"></a>
</p>  

# vue-gallery-slideshow

## Installation

#### NPM

```bash
npm install vue-gallery-slideshow --save
```

## Usage

#### HTML

```html
<div id="app">
  <img class="image" v-for="(image, i) in images" :src="image" @click="onClick(i)">
  <vue-gallery-slideshow :images="images" :index="index"></vue-gallery-slideshow>
</div>
```


#### JavaScript

```javascript
import VueGallerySlideshow from 'vue-gallery-slideshow'


const app = new Vue({
  el: '#app',
  components: {
    VueGallerySlideshow
  },
  methods: {
    onClick(i) {
      this.index = i;
    }
  },
  data: {
    images: [
      'https://placekitten.com/801/800',
      'https://placekitten.com/802/800',
      'https://placekitten.com/803/800',
      'https://placekitten.com/804/800',
      'https://placekitten.com/805/800',
      'https://placekitten.com/806/800',
      'https://placekitten.com/807/800',
      'https://placekitten.com/808/800',
      'https://placekitten.com/809/800',
      'https://placekitten.com/810/800'
    ],
    index: 0
  }
})

```

## Author

Norman Sander, norman@nsander.de

## License

vue-gallery-slideshow is available under the MIT license. See the LICENSE file for more info.
