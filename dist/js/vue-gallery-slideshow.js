(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue-runtime-helpers')) :
  typeof define === 'function' && define.amd ? define(['vue-runtime-helpers'], factory) :
  (global = global || self, global.VueGallerySlideshow = factory(global.vueRuntimeHelpers));
}(this, (function (vueRuntimeHelpers) { 'use strict';

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  var script = {
    props: {
      images: {
        type: Array,
        required: true
      },
      index: {
        type: Number,
        required: false,
        "default": null
      }
    },
    data: function data() {
      return {
        imgIndex: this.index,
        image: null,
        galleryXPos: 0,
        thumbnailWidth: 120
      };
    },
    computed: {
      imageUrl: function imageUrl() {
        var img = this.images[this.imgIndex];

        if (typeof img === "string") {
          return img;
        }

        return img.url;
      },
      alt: function alt() {
        var img = this.images[this.imgIndex];

        if (_typeof(img) === "object") {
          return img.alt;
        }

        return "";
      },
      isMultiple: function isMultiple() {
        return this.images.length > 1;
      }
    },
    watch: {
      index: function index(val, prev) {
        var _this = this;

        this.imgIndex = val; // updateThumbails when popup

        if (prev == null && val != null) {
          this.$nextTick(function () {
            _this.updateThumbails();
          });
        }
      }
    },
    mounted: function mounted() {
      var _this2 = this;

      window.addEventListener("keydown", function (e) {
        if (e.keyCode === 37) {
          _this2.onPrev();
        } else if (e.keyCode === 39) {
          _this2.onNext();
        } else if (e.keyCode === 27) {
          _this2.close();
        }
      });
    },
    methods: {
      close: function close() {
        this.imgIndex = null;
        this.$emit("close");
      },
      onPrev: function onPrev() {
        if (this.imgIndex === null) return;

        if (this.imgIndex > 0) {
          this.imgIndex--;
        } else {
          this.imgIndex = this.images.length - 1;
        }

        this.updateThumbails();
      },
      onNext: function onNext() {
        if (this.imgIndex === null) return;

        if (this.imgIndex < this.images.length - 1) {
          this.imgIndex++;
        } else {
          this.imgIndex = 0;
        }

        this.updateThumbails();
      },
      onClickThumb: function onClickThumb(image, index) {
        this.imgIndex = index;
        this.updateThumbails();
      },
      updateThumbails: function updateThumbails() {
        if (!this.$refs.gallery) {
          return;
        }

        var galleryWidth = this.$refs.gallery.clientWidth;
        var currThumbsWidth = this.imgIndex * this.thumbnailWidth;
        var maxThumbsWidth = this.images.length * this.thumbnailWidth;
        var centerPos = Math.floor(galleryWidth / (this.thumbnailWidth * 2)) * this.thumbnailWidth; // Prevent scrolling of images if not needed

        if (maxThumbsWidth < galleryWidth) {
          return;
        }

        if (currThumbsWidth < centerPos) {
          this.galleryXPos = 0;
        } else if (currThumbsWidth > this.images.length * this.thumbnailWidth - galleryWidth + centerPos) {
          this.galleryXPos = -(this.images.length * this.thumbnailWidth - galleryWidth - 20);
        } else {
          this.galleryXPos = -(this.imgIndex * this.thumbnailWidth) + centerPos;
        }
      }
    }
  };

  /* script */
  const __vue_script__ = script;

  /* template */
  var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"name":"modal"}},[(_vm.imgIndex !== null)?_c('div',{staticClass:"vgs",on:{"click":_vm.close}},[_c('button',{staticClass:"vgs__close",attrs:{"type":"button"},on:{"click":_vm.close}},[_vm._v("\n      ×\n    ")]),_vm._v(" "),(_vm.isMultiple)?_c('button',{staticClass:"vgs__prev",attrs:{"type":"button"},on:{"click":function($event){$event.stopPropagation();return _vm.onPrev($event)}}},[_vm._v("\n      ‹\n    ")]):_vm._e(),_vm._v(" "),(_vm.images)?_c('div',{staticClass:"vgs__container",on:{"click":function($event){$event.stopPropagation();return _vm.onNext($event)}}},[_c('img',{staticClass:"vgs__container__img",attrs:{"src":_vm.imageUrl,"alt":_vm.alt},on:{"click":function($event){$event.stopPropagation();return _vm.onNext($event)}}})]):_vm._e(),_vm._v(" "),(_vm.isMultiple)?_c('button',{staticClass:"vgs__next",attrs:{"type":"button"},on:{"click":function($event){$event.stopPropagation();return _vm.onNext($event)}}},[_vm._v("\n      ›\n    ")]):_vm._e(),_vm._v(" "),(_vm.isMultiple)?_c('div',{ref:"gallery",staticClass:"vgs__gallery"},[(_vm.images)?_c('div',{staticClass:"vgs__gallery__title"},[_vm._v("\n        "+_vm._s(_vm.imgIndex + 1)+" / "+_vm._s(_vm.images.length)+"\n      ")]):_vm._e(),_vm._v(" "),(_vm.images)?_c('div',{staticClass:"vgs__gallery__container",style:({ transform: 'translate(' + _vm.galleryXPos + 'px, 0)' })},_vm._l((_vm.images),function(img,i){return _c('img',{key:i,staticClass:"vgs__gallery__container__img",class:{ 'vgs__gallery__container__img--active': i === _vm.imgIndex},attrs:{"src":typeof img === 'string' ? img : img.url,"alt":typeof img === 'string' ? '' : img.alt},on:{"click":function($event){$event.stopPropagation();return _vm.onClickThumb(img, i)}}})}),0):_vm._e()]):_vm._e()]):_vm._e()])};
  var __vue_staticRenderFns__ = [];

    /* style */
    const __vue_inject_styles__ = function (inject) {
      if (!inject) return
      inject("data-v-5c04c531_0", { source: ".vgs{transition:opacity .2s ease;position:fixed;z-index:9998;top:0;left:0;width:100%;min-height:100%;height:100vh;background-color:rgba(0,0,0,.8);display:table}.vgs__close{color:#fff;position:absolute;top:0;right:0;background-color:transparent;border:none;font-size:25px;width:50px;height:50px;cursor:pointer;z-index:999}.vgs__close:focus{outline:0}.vgs__next,.vgs__prev{position:absolute;top:50%;margin-top:-25px;width:50px;height:50px;z-index:999;cursor:pointer;font-size:40px;color:#fff;background-color:transparent;border:none}.vgs__next:focus,.vgs__prev:focus{outline:0}.vgs__prev{left:0}.vgs__next{right:0}.vgs__container{position:absolute;overflow:hidden;cursor:pointer;overflow:hidden;max-width:100vh;margin:.5rem auto 0;left:.5rem;right:.5rem;height:60vh;border-radius:12px;background-color:#000}@media (max-width:767px){.vgs__container{width:100%;max-width:100%;top:50%;margin-top:-140px;left:0;right:0;border-radius:0;height:280px}}.vgs__container__img{width:100%;height:100%;object-fit:contain}.vgs__gallery{overflow-x:hidden;overflow-y:hidden;position:absolute;bottom:10px;margin:auto;max-width:100vh;white-space:nowrap;left:.5rem;right:.5rem}@media (max-width:767px){.vgs__gallery{display:none}}.vgs__gallery__title{color:#fff;margin-bottom:.5rem}.vgs__gallery__container{overflow:visible;display:block;height:100px;white-space:nowrap;transition:all .2s ease-in-out;width:100%}.vgs__gallery__container__img{width:100px;height:100px;object-fit:cover;display:inline-block;float:none;margin-right:20px;cursor:pointer;opacity:.6;border-radius:8px}.vgs__gallery__container__img--active{width:100px;display:inline-block;float:none;opacity:1}.modal-enter{opacity:0}.modal-leave-active{opacity:0}", map: undefined, media: undefined });

    };
    /* scoped */
    const __vue_scope_id__ = undefined;
    /* module identifier */
    const __vue_module_identifier__ = undefined;
    /* functional template */
    const __vue_is_functional_template__ = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    var GallerySlideshow = vueRuntimeHelpers.normalizeComponent(
      { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__,
      __vue_module_identifier__,
      false,
      vueRuntimeHelpers.createInjector,
      undefined,
      undefined
    );

  return GallerySlideshow;

})));
