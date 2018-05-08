(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.VueGallerySlideshow = factory());
}(this, (function () { 'use strict';

  (function () {
    if (typeof document !== 'undefined') {
      var head = document.head || document.getElementsByTagName('head')[0],
          style = document.createElement('style'),
          css = ".modal-slideshow { transition: opacity 0.2s ease; position: fixed; z-index: 9998; top: 0; left: 0; width: 100%; min-height: 100%; height: 100vh; background-color: rgba(0, 0, 0, 0.8); display: table; background-color: rgba(0, 0, 0, 0.8); } .modal-slideshow__close { color: #fff; position: absolute; top: 10px; right: 10px; pointer: cursor; } .modal-slideshow__prev, .modal-slideshow__next { position: absolute; top: 50%; margin-top: -25px; width: 50px; height: 50px; z-index: 999; cursor: pointer; font-size: 40px; color: #fff; background-color: transparent; border: none; } .modal-slideshow__prev:focus, .modal-slideshow__next:focus { outline: 0; } .modal-slideshow__prev { left: 0; } .modal-slideshow__next { right: 0; } .modal-slideshow__container { position: absolute; cursor: pointer; margin: 0 auto; overflow: hidden; /* @include respond-to(small) { width: 100%; top: 50%; margin-top: -150px; } @include respond-to(medium) { max-width: 100vh; margin: auto; top: 2rem; left: 0.5rem; right: 0.5rem; } */ max-width: 100vh; margin: auto; top: 2rem; left: 0.5rem; right: 0.5rem; } .modal-slideshow__container__image { background-color: #000; /* @include respond-to(small) { height: 274px; } @include respond-to(medium) { height: 60vh; border-radius: $radius-large; overflow: hidden; } */ height: 60vh; border-radius: 12px; overflow: hidden; } .modal-slideshow__container__image__img { display: block; margin: 0 auto; height: 100%; } .modal-slideshow__gallery { /* @include respond-to(small) { display: none; } @include respond-to(medium) { overflow-x: hidden; overflow-y: hidden; position: absolute; bottom: 10px; margin: auto; max-width: 100vh; white-space: nowrap; left: 0.5rem; right: 0.5rem; } */ overflow-x: hidden; overflow-y: hidden; position: absolute; bottom: 10px; margin: auto; max-width: 100vh; white-space: nowrap; left: 0.5rem; right: 0.5rem; } .modal-slideshow__gallery__title { color: #fff; margin-bottom: 0.5rem; } .modal-slideshow__gallery__container { overflow: visible; display: block; height: 100px; white-space: nowrap; transition: all 200ms ease-in-out; width: 100%; } .modal-slideshow__gallery__container__img { width: 100px; height: 100px; object-fit: cover; display: inline-block; float: none; margin-right: 20px; cursor: pointer; opacity: 0.6; border-radius: 8px; } .modal-slideshow__gallery__container__img--active { width: 100px; display: inline-block; float: none; opacity: 1; } ";style.type = 'text/css';if (style.styleSheet) {
        style.styleSheet.cssText = css;
      } else {
        style.appendChild(document.createTextNode(css));
      }head.appendChild(style);
    }
  })();

  var GallerySlideshow = { render: function () {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('transition', { attrs: { "name": "modal" } }, [_vm.imgIndex !== null ? _c('div', { staticClass: "modal-slideshow", on: { "click": _vm.close } }, [_c('div', { staticClass: "modal-slideshow__close", on: { "click": _vm.close } }, [_vm._v("x")]), _c('button', { staticClass: "modal-slideshow__prev", on: { "click": function ($event) {
            $event.stopPropagation();return _vm.onPrev($event);
          } } }, [_vm._v("<")]), _vm.images ? _c('div', { staticClass: "modal-slideshow__container", on: { "click": function ($event) {
            $event.stopPropagation();return _vm.onNext($event);
          } } }, [_c('div', { staticClass: "modal-slideshow__container__image" }, [_c('img', { staticClass: "modal-slideshow__container__image__img", attrs: { "src": _vm.imageUrl }, on: { "click": function ($event) {
            $event.stopPropagation();return _vm.onNext($event);
          } } })])]) : _vm._e(), _c('button', { staticClass: "modal-slideshow__next", on: { "click": function ($event) {
            $event.stopPropagation();return _vm.onNext($event);
          } } }, [_vm._v(">")]), _c('div', { ref: "gallery", staticClass: "modal-slideshow__gallery" }, [_vm.images ? _c('div', { staticClass: "modal-slideshow__gallery__title" }, [_vm._v(_vm._s(_vm.imgIndex + 1) + " / " + _vm._s(_vm.images.length))]) : _vm._e(), _vm.images ? _c('div', { staticClass: "modal-slideshow__gallery__container", style: { transform: 'translate(' + _vm.galleryXPos + 'px, 0)' } }, _vm._l(_vm.images, function (image, i) {
        return _c('img', { staticClass: "modal-slideshow__gallery__container__img", class: { 'modal-slideshow__gallery__container__img--active': i === _vm.imgIndex }, attrs: { "src": image }, on: { "click": function ($event) {
              $event.stopPropagation();_vm.onClickThumb(image, i);
            } } });
      })) : _vm._e()])]) : _vm._e()]);
    }, staticRenderFns: [],
    props: ['images', 'index'],
    mounted() {
      window.addEventListener('keydown', e => {
        if (e.keyCode === 37) {
          this.onPrev();
        }

        if (e.keyCode === 39) {
          this.onNext();
        }
      });
    },
    watch: {
      index(val) {
        this.imgIndex = val;
      }
    },
    methods: {
      close() {
        this.imgIndex = null;
      },
      onPrev() {
        if (this.imgIndex > 0) {
          this.imgIndex--;
        } else {
          this.imgIndex = this.images.length - 1;
        }
        this.updateThumbails();
      },
      onNext() {
        if (this.imgIndex < this.images.length - 1) {
          this.imgIndex++;
        } else {
          this.imgIndex = 0;
        }
        this.updateThumbails();
      },
      onClickThumb(image, index) {
        this.imgIndex = index;
        this.updateThumbails();
      },
      updateThumbails() {
        if (!this.$refs.gallery) {
          return;
        }

        const galleryWidth = this.$refs.gallery.clientWidth;
        const currThumbsWidth = this.imgIndex * this.thumbnailWidth;
        const centerPos = Math.floor(galleryWidth / (this.thumbnailWidth * 2)) * this.thumbnailWidth;

        if (currThumbsWidth < centerPos || galleryWidth >= currThumbsWidth) {
          this.galleryXPos = 0;
        } else if (currThumbsWidth > this.images.length * this.thumbnailWidth - galleryWidth + centerPos) {
          this.galleryXPos = -(this.images.length * this.thumbnailWidth - galleryWidth - 20);
        } else {
          this.galleryXPos = -(this.imgIndex * this.thumbnailWidth) + centerPos;
        }
      }
    },
    computed: {
      imageUrl() {
        return this.images[this.imgIndex];
      }
    },
    data() {
      return {
        imgIndex: this.index,
        image: null,
        galleryXPos: 0,
        thumbnailWidth: 120
      };
    }
  };

  return GallerySlideshow;

})));
