![npm](https://img.shields.io/npm/dt/vue-gallery-slideshow.svg)

# vue-gallery-slideshow

Lightweight and responsive image gallery for Vue.js.

![](https://github.com/KitchenStories/vue-gallery-slideshow/blob/master/images/demo.gif)

## Live Demo

[https://jsfiddle.net/headione/szk73x45/show/](https://jsfiddle.net/headione/szk73x45/show/)

## Installation

#### By CDN

```html
<script src="https://unpkg.com/vue-gallery-slideshow"></script>
```

#### By package manager

```bash
npm install vue-gallery-slideshow
```

```bash
yarn add vue-gallery-slideshow
```

## Usage

#### HTML

```html
<div id="app">
  <img class="image" v-for="(image, i) in images" :src="image" :key="i" @click="index = i">
  <vue-gallery-slideshow :images="images" :index="index" @close="index = null"></vue-gallery-slideshow>
</div>
```

#### JavaScript

```javascript
import VueGallerySlideshow from 'vue-gallery-slideshow';

const app = new Vue({
  el: '#app',
  components: {
    VueGallerySlideshow
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
    index: null
  }
});
```

### Options

## Adding alt text

If you want to add alt tags to the images, you can do by wrapping it in an object and adding an `alt` property:

```javascript
images: [
   { url: 'https://placem.at/places?w=800&h=600&random=1', alt:'My alt text' },
   ...
]
```

## Usage with Nuxt.js

When used with server-side rendering frameworks like Nuxt.js, please wrap the component in a `<client-only>` element like shown below:

```html
...
<img class="image" v-for="(image, i) in images" :src="image" :key="i" @click="index = i">
<client-only placeholder="Loading...">
  <vgs :images="images" :index="index" @close="index = null" />
</client-only>
...
```

## Contributing

Please refer to each project's style guidelines and guidelines for submitting patches and additions. In general, we follow the "fork-and-pull" Git workflow.

1. **Fork** the repo on GitHub
2. **Clone** the project to your machine
3. **Commit** changes to your branch
4. **Push** your work back up to your fork
5. Submit a **Pull request** so that we can review your changes

NOTE: Be sure to merge the latest from "upstream" before making a pull request!

## Author

Norman Sander

## License

vue-gallery-slideshow is available under the MIT license. See the LICENSE file for more info.
