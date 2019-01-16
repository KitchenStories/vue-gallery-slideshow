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
  script.__file = "/Users/norman/Projects/_kitchenstories/vue-gallery-slideshow/src/component/GallerySlideshow.vue";

  /* template */
  var __vue_render__ = function __vue_render__() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("transition", { attrs: { name: "modal" } }, [_vm.imgIndex !== null ? _c("div", { staticClass: "modal-slideshow", on: { click: _vm.close } }, [_c("button", {
      staticClass: "modal-slideshow__close",
      on: { click: _vm.close }
    }, [_vm._v("×")]), _vm._v(" "), _vm.isMultiple ? _c("button", {
      staticClass: "modal-slideshow__prev",
      on: {
        click: function click($event) {
          $event.stopPropagation();
          return _vm.onPrev($event);
        }
      }
    }, [_vm._v("‹")]) : _vm._e(), _vm._v(" "), _vm.images ? _c("div", {
      staticClass: "modal-slideshow__container",
      on: {
        click: function click($event) {
          $event.stopPropagation();
          return _vm.onNext($event);
        }
      }
    }, [_c("div", { staticClass: "modal-slideshow__container__image" }, [_c("img", {
      staticClass: "modal-slideshow__container__image__img",
      attrs: { src: _vm.imageUrl },
      on: {
        click: function click($event) {
          $event.stopPropagation();
          return _vm.onNext($event);
        }
      }
    })])]) : _vm._e(), _vm._v(" "), _vm.isMultiple ? _c("button", {
      staticClass: "modal-slideshow__next",
      on: {
        click: function click($event) {
          $event.stopPropagation();
          return _vm.onNext($event);
        }
      }
    }, [_vm._v("›")]) : _vm._e(), _vm._v(" "), _vm.isMultiple ? _c("div", { ref: "gallery", staticClass: "modal-slideshow__gallery" }, [_vm.images ? _c("div", { staticClass: "modal-slideshow__gallery__title" }, [_vm._v(_vm._s(_vm.imgIndex + 1) + " / " + _vm._s(_vm.images.length))]) : _vm._e(), _vm._v(" "), _vm.images ? _c("div", {
      staticClass: "modal-slideshow__gallery__container",
      style: {
        transform: "translate(" + _vm.galleryXPos + "px, 0)"
      }
    }, _vm._l(_vm.images, function (image, i) {
      return _c("img", {
        key: i,
        staticClass: "modal-slideshow__gallery__container__img",
        class: {
          "modal-slideshow__gallery__container__img--active": i === _vm.imgIndex
        },
        attrs: { src: image },
        on: {
          click: function click($event) {
            $event.stopPropagation();
            _vm.onClickThumb(image, i);
          }
        }
      });
    }), 0) : _vm._e()]) : _vm._e()]) : _vm._e()]);
  };
  var __vue_staticRenderFns__ = [];
  __vue_render__._withStripped = true;

  /* style */
  var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
    if (!inject) return;
    inject("data-v-4aa19392_0", { source: ".modal-slideshow {\n  transition: opacity 0.2s ease;\n  position: fixed;\n  z-index: 9998;\n  top: 0;\n  left: 0;\n  width: 100%;\n  min-height: 100%;\n  height: 100vh;\n  background-color: rgba(0, 0, 0, 0.8);\n  display: table;\n  background-color: rgba(0, 0, 0, 0.8);\n}\n.modal-slideshow__close {\n    color: #fff;\n    position: absolute;\n    top: 0;\n    right: 0;\n    background-color: transparent;\n    border: none;\n    font-size: 25px;\n    width: 50px;\n    height: 50px;\n    cursor: pointer;\n    z-index: 999;\n}\n.modal-slideshow__close:focus {\n      outline: 0;\n}\n.modal-slideshow__prev, .modal-slideshow__next {\n    position: absolute;\n    top: 50%;\n    margin-top: -25px;\n    width: 50px;\n    height: 50px;\n    z-index: 999;\n    cursor: pointer;\n    font-size: 40px;\n    color: #fff;\n    background-color: transparent;\n    border: none;\n}\n.modal-slideshow__prev:focus, .modal-slideshow__next:focus {\n      outline: 0;\n}\n.modal-slideshow__prev {\n    left: 0;\n}\n.modal-slideshow__next {\n    right: 0;\n}\n.modal-slideshow__container {\n    position: absolute;\n    cursor: pointer;\n    overflow: hidden;\n    max-width: 100vh;\n    margin: auto;\n    left: 0.5rem;\n    right: 0.5rem;\n}\n@media (min-width: 0) {\n.modal-slideshow__container {\n        width: 100%;\n        max-width: 100%;\n        top: 50%;\n        margin-top: -150px;\n        left: 0;\n        right: 0;\n}\n}\n@media (min-width: 40em) {\n.modal-slideshow__container {\n        max-width: 100vh;\n        margin: auto;\n        top: 3rem;\n        left: 0.5rem;\n        right: 0.5rem;\n}\n}\n.modal-slideshow__container__image {\n      background-color: #000;\n      height: 60vh;\n      border-radius: 12px;\n      overflow: hidden;\n}\n@media (min-width: 0) {\n.modal-slideshow__container__image {\n          height: 274px;\n          border-radius: 0;\n}\n}\n@media (min-width: 40em) {\n.modal-slideshow__container__image {\n          height: 60vh;\n          border-radius: 12px;\n          overflow: hidden;\n}\n}\n.modal-slideshow__container__image__img {\n        display: block;\n        margin: 0 auto;\n        height: 100%;\n}\n.modal-slideshow__gallery {\n  overflow-x: hidden;\n  overflow-y: hidden;\n  position: absolute;\n  bottom: 10px;\n  margin: auto;\n  max-width: 100vh;\n  white-space: nowrap;\n  left: 0.5rem;\n  right: 0.5rem;\n}\n@media (min-width: 0) {\n.modal-slideshow__gallery {\n      display: none;\n}\n}\n@media (min-width: 40em) {\n.modal-slideshow__gallery {\n      overflow-x: hidden;\n      overflow-y: hidden;\n      position: absolute;\n      bottom: 10px;\n      margin: auto;\n      max-width: 100vh;\n      white-space: nowrap;\n      left: 0.5rem;\n      right: 0.5rem;\n      display: block;\n}\n}\n.modal-slideshow__gallery__title {\n    color: #fff;\n    margin-bottom: 0.5rem;\n}\n.modal-slideshow__gallery__container {\n    overflow: visible;\n    display: block;\n    height: 100px;\n    white-space: nowrap;\n    transition: all 200ms ease-in-out;\n    width: 100%;\n}\n.modal-slideshow__gallery__container__img {\n      width: 100px;\n      height: 100px;\n      object-fit: cover;\n      display: inline-block;\n      float: none;\n      margin-right: 20px;\n      cursor: pointer;\n      opacity: 0.6;\n      border-radius: 8px;\n}\n.modal-slideshow__gallery__container__img--active {\n      width: 100px;\n      display: inline-block;\n      float: none;\n      opacity: 1;\n}\n.modal-enter {\n  opacity: 0;\n}\n.modal-leave-active {\n  opacity: 0;\n}\n\n/*# sourceMappingURL=GallerySlideshow.vue.map */", map: { "version": 3, "sources": ["/Users/norman/Projects/_kitchenstories/vue-gallery-slideshow/src/component/GallerySlideshow.vue", "GallerySlideshow.vue"], "names": [], "mappings": "AAwJA;EAjBA,6BAAA;EACA,eAAA;EACA,aAAA;EAMA,MAAA;EACA,OAAA;EACA,WAAA;EACA,gBAAA;EACA,aAAA;EACA,oCApCA;EAqCA,cAAA;EAKA,oCA1CA;AAAA;AA4CA;IACA,WAAA;IACA,kBAAA;IACA,MAAA;IACA,QAAA;IACA,6BAAA;IACA,YAAA;IACA,eAAA;IACA,WAAA;IACA,YAAA;IACA,eAAA;IACA,YAAA;AAAA;AAXA;MAcA,UAAA;AAAA;AAIA;IAEA,kBAAA;IACA,QAAA;IACA,iBAAA;IACA,WAAA;IACA,YAAA;IACA,YAAA;IACA,eAAA;IACA,eAAA;IACA,WAAA;IACA,6BAAA;IACA,YAAA;AAAA;AAZA;MAeA,UAAA;AAAA;AAIA;IACA,OAAA;AAAA;AAGA;IACA,QAAA;AAAA;AAGA;IACA,kBAAA;IACA,eAAA;IACA,gBAAA;IACA,gBAAA;IACA,YAAA;IACA,YAAA;IACA,aAAA;AAAA;AAxFA;AAiFA;QAUA,WAAA;QACA,eAAA;QACA,QAAA;QACA,kBAAA;QACA,OAAA;QACA,QAAA;AAAA;AAmCA;AA/HA;AA6EA;QAmBA,gBAAA;QACA,YAAA;QACA,SAAA;QACA,YAAA;QACA,aAAA;AAAA;AA2BA;AAxBA;MACA,sBAnHA;MAgIA,YAAA;MACA,mBA9HA;MA+HA,gBAAA;AAAA;AA3HA;AA2GA;UAIA,aAAA;UACA,gBAAA;AAAA;AAkBA;AA9HA;AAuGA;UASA,YAAA;UACA,mBAzHA;UA0HA,gBAAA;AAAA;AAYA;AALA;QACA,cAAA;QACA,cAAA;QACA,YAAA;AAAA;AAMA;EAkBA,kBAAA;EACA,kBAAA;EACA,kBAAA;EACA,YAAA;EACA,YAAA;EACA,gBAAA;EACA,mBAAA;EACA,YAAA;EACA,aAAA;AAAA;AAhKA;AAsIA;MAEA,aAAA;AAAA;AA0DA;AA9LA;AAkIA;MAMA,kBAAA;MACA,kBAAA;MACA,kBAAA;MACA,YAAA;MACA,YAAA;MACA,gBAAA;MACA,mBAAA;MACA,YAAA;MACA,aAAA;MACA,cAAA;AAAA;AA6CA;AAhCA;IACA,WAzKA;IA0KA,qBAAA;AAAA;AAGA;IACA,iBAAA;IACA,cAAA;IACA,aAAA;IACA,mBAAA;IACA,iCAAA;IACA,WAAA;AAAA;AAEA;MACA,YAAA;MACA,aAAA;MACA,iBAAA;MACA,qBAAA;MACA,WAAA;MACA,kBAAA;MACA,eAAA;MACA,YAAA;MACA,kBA7LA;AAAA;AAgMA;MACA,YAAA;MACA,qBAAA;MACA,WAAA;MACA,UAAA;AAAA;AAKA;EACA,UAAA;AAAA;AAGA;EACA,UAAA;AAAA;;AClLA,+CAA+C", "file": "GallerySlideshow.vue", "sourcesContent": [null, ".modal-slideshow {\n  transition: opacity 0.2s ease;\n  position: fixed;\n  z-index: 9998;\n  top: 0;\n  left: 0;\n  width: 100%;\n  min-height: 100%;\n  height: 100vh;\n  background-color: rgba(0, 0, 0, 0.8);\n  display: table;\n  background-color: rgba(0, 0, 0, 0.8); }\n  .modal-slideshow__close {\n    color: #fff;\n    position: absolute;\n    top: 0;\n    right: 0;\n    background-color: transparent;\n    border: none;\n    font-size: 25px;\n    width: 50px;\n    height: 50px;\n    cursor: pointer;\n    z-index: 999; }\n    .modal-slideshow__close:focus {\n      outline: 0; }\n  .modal-slideshow__prev, .modal-slideshow__next {\n    position: absolute;\n    top: 50%;\n    margin-top: -25px;\n    width: 50px;\n    height: 50px;\n    z-index: 999;\n    cursor: pointer;\n    font-size: 40px;\n    color: #fff;\n    background-color: transparent;\n    border: none; }\n    .modal-slideshow__prev:focus, .modal-slideshow__next:focus {\n      outline: 0; }\n  .modal-slideshow__prev {\n    left: 0; }\n  .modal-slideshow__next {\n    right: 0; }\n  .modal-slideshow__container {\n    position: absolute;\n    cursor: pointer;\n    overflow: hidden;\n    max-width: 100vh;\n    margin: auto;\n    left: 0.5rem;\n    right: 0.5rem; }\n    @media (min-width: 0) {\n      .modal-slideshow__container {\n        width: 100%;\n        max-width: 100%;\n        top: 50%;\n        margin-top: -150px;\n        left: 0;\n        right: 0; } }\n    @media (min-width: 40em) {\n      .modal-slideshow__container {\n        max-width: 100vh;\n        margin: auto;\n        top: 3rem;\n        left: 0.5rem;\n        right: 0.5rem; } }\n    .modal-slideshow__container__image {\n      background-color: #000;\n      height: 60vh;\n      border-radius: 12px;\n      overflow: hidden; }\n      @media (min-width: 0) {\n        .modal-slideshow__container__image {\n          height: 274px;\n          border-radius: 0; } }\n      @media (min-width: 40em) {\n        .modal-slideshow__container__image {\n          height: 60vh;\n          border-radius: 12px;\n          overflow: hidden; } }\n      .modal-slideshow__container__image__img {\n        display: block;\n        margin: 0 auto;\n        height: 100%; }\n\n.modal-slideshow__gallery {\n  overflow-x: hidden;\n  overflow-y: hidden;\n  position: absolute;\n  bottom: 10px;\n  margin: auto;\n  max-width: 100vh;\n  white-space: nowrap;\n  left: 0.5rem;\n  right: 0.5rem; }\n  @media (min-width: 0) {\n    .modal-slideshow__gallery {\n      display: none; } }\n  @media (min-width: 40em) {\n    .modal-slideshow__gallery {\n      overflow-x: hidden;\n      overflow-y: hidden;\n      position: absolute;\n      bottom: 10px;\n      margin: auto;\n      max-width: 100vh;\n      white-space: nowrap;\n      left: 0.5rem;\n      right: 0.5rem;\n      display: block; } }\n  .modal-slideshow__gallery__title {\n    color: #fff;\n    margin-bottom: 0.5rem; }\n  .modal-slideshow__gallery__container {\n    overflow: visible;\n    display: block;\n    height: 100px;\n    white-space: nowrap;\n    transition: all 200ms ease-in-out;\n    width: 100%; }\n    .modal-slideshow__gallery__container__img {\n      width: 100px;\n      height: 100px;\n      object-fit: cover;\n      display: inline-block;\n      float: none;\n      margin-right: 20px;\n      cursor: pointer;\n      opacity: 0.6;\n      border-radius: 8px; }\n    .modal-slideshow__gallery__container__img--active {\n      width: 100px;\n      display: inline-block;\n      float: none;\n      opacity: 1; }\n\n.modal-enter {\n  opacity: 0; }\n\n.modal-leave-active {\n  opacity: 0; }\n\n/*# sourceMappingURL=GallerySlideshow.vue.map */"] }, media: undefined });
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
