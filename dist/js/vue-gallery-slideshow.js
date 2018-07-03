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
    mounted() {
      window.addEventListener("keydown", e => {
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
        this.$emit("close");
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

        if (currThumbsWidth < centerPos) {
          this.galleryXPos = 0;
        } else if (currThumbsWidth > (this.images.length * this.thumbnailWidth) - galleryWidth + centerPos) {
          this.galleryXPos = -(this.images.length * this.thumbnailWidth - galleryWidth - 20);
        } else {
          this.galleryXPos = -(this.imgIndex * this.thumbnailWidth) + centerPos;
        }
      }
    },
    computed: {
      imageUrl() {
        return this.images[this.imgIndex];
      },
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

  /* script */
              const __vue_script__ = script;
              
  /* template */
  var __vue_render__ = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("transition", { attrs: { name: "modal" } }, [
      _vm.imgIndex !== null
        ? _c(
            "div",
            { staticClass: "modal-slideshow", on: { click: _vm.close } },
            [
              _c(
                "button",
                {
                  staticClass: "modal-slideshow__close",
                  on: { click: _vm.close }
                },
                [_vm._v("×")]
              ),
              _vm._v(" "),
              _c(
                "button",
                {
                  staticClass: "modal-slideshow__prev",
                  on: {
                    click: function($event) {
                      $event.stopPropagation();
                      return _vm.onPrev($event)
                    }
                  }
                },
                [_vm._v("‹")]
              ),
              _vm._v(" "),
              _vm.images
                ? _c(
                    "div",
                    {
                      staticClass: "modal-slideshow__container",
                      on: {
                        click: function($event) {
                          $event.stopPropagation();
                          return _vm.onNext($event)
                        }
                      }
                    },
                    [
                      _c(
                        "div",
                        { staticClass: "modal-slideshow__container__image" },
                        [
                          _c("img", {
                            staticClass: "modal-slideshow__container__image__img",
                            attrs: { src: _vm.imageUrl },
                            on: {
                              click: function($event) {
                                $event.stopPropagation();
                                return _vm.onNext($event)
                              }
                            }
                          })
                        ]
                      )
                    ]
                  )
                : _vm._e(),
              _vm._v(" "),
              _c(
                "button",
                {
                  staticClass: "modal-slideshow__next",
                  on: {
                    click: function($event) {
                      $event.stopPropagation();
                      return _vm.onNext($event)
                    }
                  }
                },
                [_vm._v("›")]
              ),
              _vm._v(" "),
              _c(
                "div",
                { ref: "gallery", staticClass: "modal-slideshow__gallery" },
                [
                  _vm.images
                    ? _c(
                        "div",
                        { staticClass: "modal-slideshow__gallery__title" },
                        [
                          _vm._v(
                            _vm._s(_vm.imgIndex + 1) +
                              " / " +
                              _vm._s(_vm.images.length)
                          )
                        ]
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.images
                    ? _c(
                        "div",
                        {
                          staticClass: "modal-slideshow__gallery__container",
                          style: {
                            transform: "translate(" + _vm.galleryXPos + "px, 0)"
                          }
                        },
                        _vm._l(_vm.images, function(image, i) {
                          return _c("img", {
                            key: i,
                            staticClass:
                              "modal-slideshow__gallery__container__img",
                            class: {
                              "modal-slideshow__gallery__container__img--active":
                                i === _vm.imgIndex
                            },
                            attrs: { src: image },
                            on: {
                              click: function($event) {
                                $event.stopPropagation();
                                _vm.onClickThumb(image, i);
                              }
                            }
                          })
                        })
                      )
                    : _vm._e()
                ]
              )
            ]
          )
        : _vm._e()
    ])
  };
  var __vue_staticRenderFns__ = [];
  __vue_render__._withStripped = true;

    /* style */
    const __vue_inject_styles__ = function (inject) {
      if (!inject) return
      inject("data-v-3bd5934d_0", { source: "\n.modal-slideshow {\n  transition: opacity 0.2s ease;\n  position: fixed;\n  z-index: 9998;\n  top: 0;\n  left: 0;\n  width: 100%;\n  min-height: 100%;\n  height: 100vh;\n  background-color: rgba(0, 0, 0, 0.8);\n  display: table;\n  background-color: rgba(0, 0, 0, 0.8);\n}\n.modal-slideshow__close {\n    color: #fff;\n    position: absolute;\n    top: 0;\n    right: 0;\n    background-color: transparent;\n    border: none;\n    font-size: 25px;\n    width: 50px;\n    height: 50px;\n    cursor: pointer;\n    z-index: 999;\n}\n.modal-slideshow__close:focus {\n      outline: 0;\n}\n.modal-slideshow__prev, .modal-slideshow__next {\n    position: absolute;\n    top: 50%;\n    margin-top: -25px;\n    width: 50px;\n    height: 50px;\n    z-index: 999;\n    cursor: pointer;\n    font-size: 40px;\n    color: #fff;\n    background-color: transparent;\n    border: none;\n}\n.modal-slideshow__prev:focus, .modal-slideshow__next:focus {\n      outline: 0;\n}\n.modal-slideshow__prev {\n    left: 0;\n}\n.modal-slideshow__next {\n    right: 0;\n}\n.modal-slideshow__container {\n    position: absolute;\n    cursor: pointer;\n    overflow: hidden;\n    max-width: 100vh;\n    margin: auto;\n    left: 0.5rem;\n    right: 0.5rem;\n}\n@media (min-width: 0) {\n.modal-slideshow__container {\n        width: 100%;\n        max-width: 100%;\n        top: 50%;\n        margin-top: -150px;\n        left: 0;\n        right: 0;\n}\n}\n@media (min-width: 40em) {\n.modal-slideshow__container {\n        max-width: 100vh;\n        margin: auto;\n        top: 3rem;\n        left: 0.5rem;\n        right: 0.5rem;\n}\n}\n.modal-slideshow__container__image {\n      background-color: #000;\n      height: 60vh;\n      border-radius: 12px;\n      overflow: hidden;\n}\n@media (min-width: 0) {\n.modal-slideshow__container__image {\n          height: 274px;\n          border-radius: 0;\n}\n}\n@media (min-width: 40em) {\n.modal-slideshow__container__image {\n          height: 60vh;\n          border-radius: 12px;\n          overflow: hidden;\n}\n}\n.modal-slideshow__container__image__img {\n        display: block;\n        margin: 0 auto;\n        height: 100%;\n}\n.modal-slideshow__gallery {\n  overflow-x: hidden;\n  overflow-y: hidden;\n  position: absolute;\n  bottom: 10px;\n  margin: auto;\n  max-width: 100vh;\n  white-space: nowrap;\n  left: 0.5rem;\n  right: 0.5rem;\n}\n@media (min-width: 0) {\n.modal-slideshow__gallery {\n      display: none;\n}\n}\n@media (min-width: 40em) {\n.modal-slideshow__gallery {\n      overflow-x: hidden;\n      overflow-y: hidden;\n      position: absolute;\n      bottom: 10px;\n      margin: auto;\n      max-width: 100vh;\n      white-space: nowrap;\n      left: 0.5rem;\n      right: 0.5rem;\n      display: block;\n}\n}\n.modal-slideshow__gallery__title {\n    color: #fff;\n    margin-bottom: 0.5rem;\n}\n.modal-slideshow__gallery__container {\n    overflow: visible;\n    display: block;\n    height: 100px;\n    white-space: nowrap;\n    transition: all 200ms ease-in-out;\n    width: 100%;\n}\n.modal-slideshow__gallery__container__img {\n      width: 100px;\n      height: 100px;\n      object-fit: cover;\n      display: inline-block;\n      float: none;\n      margin-right: 20px;\n      cursor: pointer;\n      opacity: 0.6;\n      border-radius: 8px;\n}\n.modal-slideshow__gallery__container__img--active {\n      width: 100px;\n      display: inline-block;\n      float: none;\n      opacity: 1;\n}\n.modal-enter {\n  opacity: 0;\n}\n.modal-leave-active {\n  opacity: 0;\n}\n\n/*# sourceMappingURL=GallerySlideshow.vue.map */", map: {"version":3,"sources":["/Users/norman/Projects/_kitchenstories/vue-gallery-slideshow/src/component/GallerySlideshow.vue","GallerySlideshow.vue"],"names":[],"mappings":";AA6IA;EAjBA,8BAAA;EACA,gBAAA;EACA,cAAA;EAMA,OAAA;EACA,QAAA;EACA,YAAA;EACA,iBAAA;EACA,cAAA;EACA,qCApCA;EAqCA,eAAA;EAKA,qCA1CA;CA4IA;AAhGA;IACA,YAAA;IACA,mBAAA;IACA,OAAA;IACA,SAAA;IACA,8BAAA;IACA,aAAA;IACA,gBAAA;IACA,YAAA;IACA,aAAA;IACA,gBAAA;IACA,aAAA;CAKA;AAhBA;MAcA,WAAA;CACA;AAGA;IAEA,mBAAA;IACA,SAAA;IACA,kBAAA;IACA,YAAA;IACA,aAAA;IACA,aAAA;IACA,gBAAA;IACA,gBAAA;IACA,YAAA;IACA,8BAAA;IACA,aAAA;CAKA;AAjBA;MAeA,WAAA;CACA;AAGA;IACA,QAAA;CACA;AAEA;IACA,SAAA;CACA;AAEA;IACA,mBAAA;IACA,gBAAA;IACA,iBAAA;IACA,iBAAA;IACA,aAAA;IACA,aAAA;IACA,cAAA;CA2CA;AAnIA;AAiFA;QAUA,YAAA;QACA,gBAAA;QACA,SAAA;QACA,mBAAA;QACA,QAAA;QACA,SAAA;CAmCA;CAAA;AA/HA;AA6EA;QAmBA,iBAAA;QACA,aAAA;QACA,UAAA;QACA,aAAA;QACA,cAAA;CA2BA;CAAA;AAxBA;MACA,uBAnHA;MAgIA,aAAA;MACA,oBA9HA;MA+HA,iBAAA;CAOA;AAlIA;AA2GA;UAIA,cAAA;UACA,iBAAA;CAkBA;CAAA;AA9HA;AAuGA;UASA,aAAA;UACA,oBAzHA;UA0HA,iBAAA;CAYA;CAAA;AALA;QACA,eAAA;QACA,eAAA;QACA,aAAA;CACA;AAKA;EAkBA,mBAAA;EACA,mBAAA;EACA,mBAAA;EACA,aAAA;EACA,aAAA;EACA,iBAAA;EACA,oBAAA;EACA,aAAA;EACA,cAAA;CAkCA;AAlMA;AAsIA;MAEA,cAAA;CA0DA;CAAA;AA9LA;AAkIA;MAMA,mBAAA;MACA,mBAAA;MACA,mBAAA;MACA,aAAA;MACA,aAAA;MACA,iBAAA;MACA,oBAAA;MACA,aAAA;MACA,cAAA;MACA,eAAA;CA6CA;CAAA;AAhCA;IACA,YAzKA;IA0KA,sBAAA;CACA;AAEA;IACA,kBAAA;IACA,eAAA;IACA,cAAA;IACA,oBAAA;IACA,kCAAA;IACA,YAAA;CAoBA;AAlBA;MACA,aAAA;MACA,cAAA;MACA,kBAAA;MACA,sBAAA;MACA,YAAA;MACA,mBAAA;MACA,gBAAA;MACA,aAAA;MACA,mBA7LA;CA8LA;AAEA;MACA,aAAA;MACA,sBAAA;MACA,YAAA;MACA,WAAA;CACA;AAIA;EACA,WAAA;CACA;AAEA;EACA,WAAA;CACA;;ACxKA,gDAAgD","file":"GallerySlideshow.vue","sourcesContent":[null,".modal-slideshow {\n  transition: opacity 0.2s ease;\n  position: fixed;\n  z-index: 9998;\n  top: 0;\n  left: 0;\n  width: 100%;\n  min-height: 100%;\n  height: 100vh;\n  background-color: rgba(0, 0, 0, 0.8);\n  display: table;\n  background-color: rgba(0, 0, 0, 0.8); }\n  .modal-slideshow__close {\n    color: #fff;\n    position: absolute;\n    top: 0;\n    right: 0;\n    background-color: transparent;\n    border: none;\n    font-size: 25px;\n    width: 50px;\n    height: 50px;\n    cursor: pointer;\n    z-index: 999; }\n    .modal-slideshow__close:focus {\n      outline: 0; }\n  .modal-slideshow__prev, .modal-slideshow__next {\n    position: absolute;\n    top: 50%;\n    margin-top: -25px;\n    width: 50px;\n    height: 50px;\n    z-index: 999;\n    cursor: pointer;\n    font-size: 40px;\n    color: #fff;\n    background-color: transparent;\n    border: none; }\n    .modal-slideshow__prev:focus, .modal-slideshow__next:focus {\n      outline: 0; }\n  .modal-slideshow__prev {\n    left: 0; }\n  .modal-slideshow__next {\n    right: 0; }\n  .modal-slideshow__container {\n    position: absolute;\n    cursor: pointer;\n    overflow: hidden;\n    max-width: 100vh;\n    margin: auto;\n    left: 0.5rem;\n    right: 0.5rem; }\n    @media (min-width: 0) {\n      .modal-slideshow__container {\n        width: 100%;\n        max-width: 100%;\n        top: 50%;\n        margin-top: -150px;\n        left: 0;\n        right: 0; } }\n    @media (min-width: 40em) {\n      .modal-slideshow__container {\n        max-width: 100vh;\n        margin: auto;\n        top: 3rem;\n        left: 0.5rem;\n        right: 0.5rem; } }\n    .modal-slideshow__container__image {\n      background-color: #000;\n      height: 60vh;\n      border-radius: 12px;\n      overflow: hidden; }\n      @media (min-width: 0) {\n        .modal-slideshow__container__image {\n          height: 274px;\n          border-radius: 0; } }\n      @media (min-width: 40em) {\n        .modal-slideshow__container__image {\n          height: 60vh;\n          border-radius: 12px;\n          overflow: hidden; } }\n      .modal-slideshow__container__image__img {\n        display: block;\n        margin: 0 auto;\n        height: 100%; }\n\n.modal-slideshow__gallery {\n  overflow-x: hidden;\n  overflow-y: hidden;\n  position: absolute;\n  bottom: 10px;\n  margin: auto;\n  max-width: 100vh;\n  white-space: nowrap;\n  left: 0.5rem;\n  right: 0.5rem; }\n  @media (min-width: 0) {\n    .modal-slideshow__gallery {\n      display: none; } }\n  @media (min-width: 40em) {\n    .modal-slideshow__gallery {\n      overflow-x: hidden;\n      overflow-y: hidden;\n      position: absolute;\n      bottom: 10px;\n      margin: auto;\n      max-width: 100vh;\n      white-space: nowrap;\n      left: 0.5rem;\n      right: 0.5rem;\n      display: block; } }\n  .modal-slideshow__gallery__title {\n    color: #fff;\n    margin-bottom: 0.5rem; }\n  .modal-slideshow__gallery__container {\n    overflow: visible;\n    display: block;\n    height: 100px;\n    white-space: nowrap;\n    transition: all 200ms ease-in-out;\n    width: 100%; }\n    .modal-slideshow__gallery__container__img {\n      width: 100px;\n      height: 100px;\n      object-fit: cover;\n      display: inline-block;\n      float: none;\n      margin-right: 20px;\n      cursor: pointer;\n      opacity: 0.6;\n      border-radius: 8px; }\n    .modal-slideshow__gallery__container__img--active {\n      width: 100px;\n      display: inline-block;\n      float: none;\n      opacity: 1; }\n\n.modal-enter {\n  opacity: 0; }\n\n.modal-leave-active {\n  opacity: 0; }\n\n/*# sourceMappingURL=GallerySlideshow.vue.map */"]}, media: undefined });

    };
    /* scoped */
    const __vue_scope_id__ = undefined;
    /* module identifier */
    const __vue_module_identifier__ = undefined;
    /* functional template */
    const __vue_is_functional_template__ = false;
    /* component normalizer */
    function __vue_normalize__(
      template, style, script$$1,
      scope, functional, moduleIdentifier,
      createInjector, createInjectorSSR
    ) {
      const component = (typeof script$$1 === 'function' ? script$$1.options : script$$1) || {};

      {
        component.__file = "/Users/norman/Projects/_kitchenstories/vue-gallery-slideshow/src/component/GallerySlideshow.vue";
      }

      if (!component.render) {
        component.render = template.render;
        component.staticRenderFns = template.staticRenderFns;
        component._compiled = true;

        if (functional) component.functional = true;
      }

      component._scopeId = scope;

      {
        let hook;
        if (style) {
          hook = function(context) {
            style.call(this, createInjector(context));
          };
        }

        if (hook !== undefined) {
          if (component.functional) {
            // register for functional component in vue file
            const originalRender = component.render;
            component.render = function renderWithStyleInjection(h, context) {
              hook.call(context);
              return originalRender(h, context)
            };
          } else {
            // inject component registration as beforeCreate hook
            const existing = component.beforeCreate;
            component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
          }
        }
      }

      return component
    }
    /* style inject */
    function __vue_create_injector__() {
      const head = document.head || document.getElementsByTagName('head')[0];
      const styles = __vue_create_injector__.styles || (__vue_create_injector__.styles = {});
      const isOldIE =
        typeof navigator !== 'undefined' &&
        /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

      return function addStyle(id, css) {
        if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return // SSR styles are present.

        const group = isOldIE ? css.media || 'default' : id;
        const style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

        if (!style.ids.includes(id)) {
          let code = css.source;
          let index = style.ids.length;

          style.ids.push(id);

          if (isOldIE) {
            style.element = style.element || document.querySelector('style[data-group=' + group + ']');
          }

          if (!style.element) {
            const el = style.element = document.createElement('style');
            el.type = 'text/css';

            if (css.media) el.setAttribute('media', css.media);
            if (isOldIE) {
              el.setAttribute('data-group', group);
              el.setAttribute('data-next-index', '0');
            }

            head.appendChild(el);
          }

          if (isOldIE) {
            index = parseInt(style.element.getAttribute('data-next-index'));
            style.element.setAttribute('data-next-index', index + 1);
          }

          if (style.element.styleSheet) {
            style.parts.push(code);
            style.element.styleSheet.cssText = style.parts
              .filter(Boolean)
              .join('\n');
          } else {
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index]) style.element.removeChild(nodes[index]);
            if (nodes.length) style.element.insertBefore(textNode, nodes[index]);
            else style.element.appendChild(textNode);
          }
        }
      }
    }
    /* style inject SSR */
    

    
    var GallerySlideshow = __vue_normalize__(
      { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__,
      __vue_module_identifier__,
      __vue_create_injector__,
      undefined
    );

  return GallerySlideshow;

})));
