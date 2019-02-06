(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.VueGallerySlideshow = factory());
}(this, (function () { 'use strict';

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
    props: ["images", "index"],
    mounted: function mounted() {
      var _this = this;

      window.addEventListener("keydown", function (e) {
        if (e.keyCode === 37) {
          _this.onPrev();
        }

        if (e.keyCode === 39) {
          _this.onNext();
        }
      });
    },

    watch: {
      index: function index(val) {
        this.imgIndex = val;
      }
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
        var centerPos = Math.floor(galleryWidth / (this.thumbnailWidth * 2)) * this.thumbnailWidth;

        // Prevent scrolling of images if not needed
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
    },
    computed: {
      imageUrl: function imageUrl() {
        return this.images[this.imgIndex];
      },
      isMultiple: function isMultiple() {
        return this.images.length > 1;
      }
    },
    data: function data() {
      return {
        imgIndex: this.index,
        image: null,
        galleryXPos: 0,
        thumbnailWidth: 120
      };
    }
  };

  function normalizeComponent(compiledTemplate, injectStyle, defaultExport, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, isShadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
      if (typeof isShadowMode === 'function') {
          createInjectorSSR = createInjector;
          createInjector = isShadowMode;
          isShadowMode = false;
      }
      // Vue.extend constructor export interop
      const options = typeof defaultExport === 'function' ? defaultExport.options : defaultExport;
      // render functions
      if (compiledTemplate && compiledTemplate.render) {
          options.render = compiledTemplate.render;
          options.staticRenderFns = compiledTemplate.staticRenderFns;
          options._compiled = true;
          // functional template
          if (isFunctionalTemplate) {
              options.functional = true;
          }
      }
      // scopedId
      if (scopeId) {
          options._scopeId = scopeId;
      }
      let hook;
      if (moduleIdentifier) {
          // server build
          hook = function (context) {
              // 2.3 injection
              context =
                  context || // cached call
                      (this.$vnode && this.$vnode.ssrContext) || // stateful
                      (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
              // 2.2 with runInNewContext: true
              if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                  context = __VUE_SSR_CONTEXT__;
              }
              // inject component styles
              if (injectStyle) {
                  injectStyle.call(this, createInjectorSSR(context));
              }
              // register component module identifier for async chunk inference
              if (context && context._registeredComponents) {
                  context._registeredComponents.add(moduleIdentifier);
              }
          };
          // used by ssr in case component is cached and beforeCreate
          // never gets called
          options._ssrRegister = hook;
      }
      else if (injectStyle) {
          hook = isShadowMode
              ? function () {
                  injectStyle.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
              }
              : function (context) {
                  injectStyle.call(this, createInjector(context));
              };
      }
      if (hook) {
          if (options.functional) {
              // register for functional component in vue file
              const originalRender = options.render;
              options.render = function renderWithStyleInjection(h, context) {
                  hook.call(context);
                  return originalRender(h, context);
              };
          }
          else {
              // inject component registration as beforeCreate hook
              const existing = options.beforeCreate;
              options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
          }
      }
      return defaultExport;
  }

  const isOldIE = typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
  function createInjector(context) {
      return (id, style) => addStyle(id, style);
  }
  const HEAD = document.head || document.getElementsByTagName('head')[0];
  const styles = {};
  function addStyle(id, css) {
      const group = isOldIE ? css.media || 'default' : id;
      const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
      if (!style.ids.has(id)) {
          style.ids.add(id);
          let code = css.source;
          if (css.map) {
              // https://developer.chrome.com/devtools/docs/javascript-debugging
              // this makes source maps inside style tags work properly in Chrome
              code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
              // http://stackoverflow.com/a/26603875
              code +=
                  '\n/*# sourceMappingURL=data:application/json;base64,' +
                      btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                      ' */';
          }
          if (!style.element) {
              style.element = document.createElement('style');
              style.element.type = 'text/css';
              if (css.media)
                  style.element.setAttribute('media', css.media);
              HEAD.appendChild(style.element);
          }
          if ('styleSheet' in style.element) {
              style.styles.push(code);
              style.element.styleSheet.cssText = style.styles
                  .filter(Boolean)
                  .join('\n');
          }
          else {
              const index = style.ids.size - 1;
              const textNode = document.createTextNode(code);
              const nodes = style.element.childNodes;
              if (nodes[index])
                  style.element.removeChild(nodes[index]);
              if (nodes.length)
                  style.element.insertBefore(textNode, nodes[index]);
              else
                  style.element.appendChild(textNode);
          }
      }
  }

  /* script */
  var __vue_script__ = script;
  // For security concerns, we use only base name in production mode. See https://github.com/vuejs/rollup-plugin-vue/issues/258
  script.__file = "GallerySlideshow.vue";

  /* template */
  var __vue_render__ = function __vue_render__() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('transition', { attrs: { "name": "modal" } }, [_vm.imgIndex !== null ? _c('div', { staticClass: "vgs", on: { "click": _vm.close } }, [_c('button', { staticClass: "vgs__close", on: { "click": _vm.close } }, [_vm._v("×")]), _vm._v(" "), _vm.isMultiple ? _c('button', { staticClass: "vgs__prev", on: { "click": function click($event) {
          $event.stopPropagation();return _vm.onPrev($event);
        } } }, [_vm._v("‹")]) : _vm._e(), _vm._v(" "), _vm.images ? _c('div', { staticClass: "vgs__container", on: { "click": function click($event) {
          $event.stopPropagation();return _vm.onNext($event);
        } } }, [_c('img', { staticClass: "vgs__container__img", attrs: { "src": _vm.imageUrl }, on: { "click": function click($event) {
          $event.stopPropagation();return _vm.onNext($event);
        } } })]) : _vm._e(), _vm._v(" "), _vm.isMultiple ? _c('button', { staticClass: "vgs__next", on: { "click": function click($event) {
          $event.stopPropagation();return _vm.onNext($event);
        } } }, [_vm._v("›")]) : _vm._e(), _vm._v(" "), _vm.isMultiple ? _c('div', { ref: "gallery", staticClass: "vgs__gallery" }, [_vm.images ? _c('div', { staticClass: "vgs__gallery__title" }, [_vm._v(_vm._s(_vm.imgIndex + 1) + " / " + _vm._s(_vm.images.length))]) : _vm._e(), _vm._v(" "), _vm.images ? _c('div', { staticClass: "vgs__gallery__container", style: { transform: 'translate(' + _vm.galleryXPos + 'px, 0)' } }, _vm._l(_vm.images, function (image, i) {
      return _c('img', { key: i, staticClass: "vgs__gallery__container__img", class: { 'vgs__gallery__container__img--active': i === _vm.imgIndex }, attrs: { "src": image }, on: { "click": function click($event) {
            $event.stopPropagation();_vm.onClickThumb(image, i);
          } } });
    }), 0) : _vm._e()]) : _vm._e()]) : _vm._e()]);
  };
  var __vue_staticRenderFns__ = [];

  /* style */
  var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
    if (!inject) return;
    inject("data-v-3aec641d_0", { source: ".vgs{transition:opacity .2s ease;position:fixed;z-index:9998;top:0;left:0;width:100%;min-height:100%;height:100vh;background-color:rgba(0,0,0,.8);display:table}.vgs__close{color:#fff;position:absolute;top:0;right:0;background-color:transparent;border:none;font-size:25px;width:50px;height:50px;cursor:pointer;z-index:999}.vgs__close:focus{outline:0}.vgs__next,.vgs__prev{position:absolute;top:50%;margin-top:-25px;width:50px;height:50px;z-index:999;cursor:pointer;font-size:40px;color:#fff;background-color:transparent;border:none}.vgs__next:focus,.vgs__prev:focus{outline:0}.vgs__prev{left:0}.vgs__next{right:0}.vgs__container{position:absolute;overflow:hidden;cursor:pointer;overflow:hidden;max-width:100vh;margin:.5rem auto 0;left:.5rem;right:.5rem;height:60vh;border-radius:12px;background-color:#000}@media (max-width:767px){.vgs__container{width:100%;max-width:100%;top:50%;margin-top:-140px;left:0;right:0;border-radius:0;height:280px}}.vgs__container__img{width:100%;height:100%;object-fit:contain}.vgs__gallery{overflow-x:hidden;overflow-y:hidden;position:absolute;bottom:10px;margin:auto;max-width:100vh;white-space:nowrap;left:.5rem;right:.5rem}@media (max-width:767px){.vgs__gallery{display:none}}.vgs__gallery__title{color:#fff;margin-bottom:.5rem}.vgs__gallery__container{overflow:visible;display:block;height:100px;white-space:nowrap;transition:all .2s ease-in-out;width:100%}.vgs__gallery__container__img{width:100px;height:100px;object-fit:cover;display:inline-block;float:none;margin-right:20px;cursor:pointer;opacity:.6;border-radius:8px}.vgs__gallery__container__img--active{width:100px;display:inline-block;float:none;opacity:1}.modal-enter{opacity:0}.modal-leave-active{opacity:0}", map: undefined, media: undefined });
  };
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject SSR */

  var GallerySlideshow = normalizeComponent({ render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ }, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, createInjector, undefined);

  return GallerySlideshow;

})));
