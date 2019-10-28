<template>
  <transition name="modal">
    <div
      v-if="imgIndex !== null"
      class="vgs"
      @click="close"
    >
      <button
        type="button"
        class="vgs__close"
        @click="close"
      >
        &times;
      </button>
      <button
        v-if="isMultiple"
        type="button"
        class="vgs__prev"
        @click.stop="onPrev"
      >
        &lsaquo;
      </button>
      <div
        v-if="images"
        class="vgs__container"
        @click.stop="onNext"
      >
        <img
          class="vgs__container__img"
          :src="imageUrl"
          :alt="alt"
          @click.stop="onNext"
        >
      </div>
      <button
        v-if="isMultiple"
        type="button"
        class="vgs__next"
        @click.stop="onNext"
      >
        &rsaquo;
      </button>
      <div
        v-if="isMultiple"
        ref="gallery"
        class="vgs__gallery"
      >
        <div
          v-if="images"
          class="vgs__gallery__title"
        >
          {{ imgIndex + 1 }} / {{ images.length }}
        </div>
        <div
          v-if="images"
          class="vgs__gallery__container"
          :style="{ transform: 'translate(' + galleryXPos + 'px, 0)' }"
        >
          <img
            v-for="(img, i) in images"
            :key="i"
            class="vgs__gallery__container__img"
            :src="typeof img === 'string' ? img : img.url"
            :class="{ 'vgs__gallery__container__img--active': i === imgIndex}"
            :alt="typeof img === 'string' ? '' : img.alt"
            @click.stop="onClickThumb(img, i)"
          >
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    images : {
      type: Array,
      required: true
    },
    index: {
      type: Number,
      required: false,
      default: null
    }
  },
  data() {
    return {
      imgIndex: this.index,
      image: null,
      galleryXPos: 0,
      thumbnailWidth: 120
    };
  },
  computed: {
    imageUrl() {
      const img = this.images[this.imgIndex];
      if (typeof img === "string") {
          return img;
      }
      return img.url;
    },
    alt() {
      const img = this.images[this.imgIndex];
      if (typeof img === "object") {
          return img.alt;
      }

      return "";
    },
    isMultiple() {
      return this.images.length > 1;
    }
  },
  watch: {
    index(val, prev) {
      this.imgIndex = val;

      // updateThumbails when popup
      if (prev == null && val != null) {
        this.$nextTick(() => {
          this.updateThumbails();
        });
      }
    }
  },
  mounted() {
    window.addEventListener("keydown", e => {
      if (e.keyCode === 37) {
        this.onPrev();
      } else if (e.keyCode === 39) {
        this.onNext();
      } else if (e.keyCode === 27) {
        this.close();
      }
    });
  },
  methods: {
    close() {
      this.imgIndex = null;
      this.$emit("close");
    },
    onPrev() {
      if (this.imgIndex === null) return;
      if (this.imgIndex > 0) {
        this.imgIndex--;
      } else {
        this.imgIndex = this.images.length - 1;
      }
      this.updateThumbails();
    },
    onNext() {
      if (this.imgIndex === null) return;
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
      const maxThumbsWidth = this.images.length * this.thumbnailWidth;
      const centerPos =
        Math.floor(galleryWidth / (this.thumbnailWidth * 2)) *
        this.thumbnailWidth;

      // Prevent scrolling of images if not needed
      if (maxThumbsWidth < galleryWidth) {
        return;
      }

      if (currThumbsWidth < centerPos) {
        this.galleryXPos = 0;
      } else if (
        currThumbsWidth >
        this.images.length * this.thumbnailWidth - galleryWidth + centerPos
      ) {
        this.galleryXPos = -(
          this.images.length * this.thumbnailWidth -
          galleryWidth -
          20
        );
      } else {
        this.galleryXPos = -(this.imgIndex * this.thumbnailWidth) + centerPos;
      }
    }
  }
};
</script>

<style lang="scss">
$black-alpha-80: rgba(0, 0, 0, 0.8);
$black: #000;
$white: #fff;
$radius-medium: 8px;
$radius-large: 12px;
// Breakpoints
$screen-xs: 480px;
$screen-sm: 768px;
$screen-md: 992px;
$screen-lg: 1200px;
// So media queries don't overlap when required, provide a maximum
$screen-xs-max: ($screen-sm - 1);
$screen-sm-max: ($screen-md - 1);
$screen-md-max: ($screen-lg - 1);
@mixin respond-to($media) {
  @if $media==xs {
    @media (max-width: $screen-xs-max) {
      @content;
    }
  } @else if $media==sm {
    @media (min-width: $screen-sm) and (max-width: $screen-sm-max) {
      @content;
    }
  } @else if $media==md {
    @media (min-width: $screen-md) and (max-width: $screen-md-max) {
      @content;
    }
  } @else if $media==lg {
    @media (min-width: $screen-lg) {
      @content;
    }
  }
}

@mixin modal-base() {
  transition: opacity 0.2s ease;
  position: fixed;
  z-index: 9998;
}

@mixin modal-mask() {
  @include modal-base();
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  height: 100vh;
  background-color: $black-alpha-80;
  display: table;
}

.vgs {
  @include modal-mask();
  &__close {
    color: #fff;
    position: absolute;
    top: 0;
    right: 0;
    background-color: transparent;
    border: none;
    font-size: 25px;
    width: 50px;
    height: 50px;
    cursor: pointer;
    z-index: 999;
    &:focus {
      outline: 0;
    }
  }
  &__prev,
  &__next {
    position: absolute;
    top: 50%;
    margin-top: -25px;
    width: 50px;
    height: 50px;
    z-index: 999;
    cursor: pointer;
    font-size: 40px;
    color: #fff;
    background-color: transparent;
    border: none;
    &:focus {
      outline: 0;
    }
  }
  &__prev {
    left: 0;
  }
  &__next {
    right: 0;
  }
  &__container {
    position: absolute;
    overflow: hidden;
    cursor: pointer;
    overflow: hidden;
    max-width: 100vh;
    margin: 0.5rem auto 0;
    left: 0.5rem;
    right: 0.5rem;
    height: 60vh;
    border-radius: $radius-large;
    background-color: $black;
    @include respond-to(xs) {
      width: 100%;
      max-width: 100%;
      top: 50%;
      margin-top: -140px;
      left: 0;
      right: 0;
      border-radius: 0;
      height: 280px;
    }

    &__img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}

.vgs__gallery {
  @include respond-to(xs) {
    display: none;
  }
  overflow-x: hidden;
  overflow-y: hidden;
  position: absolute;
  bottom: 10px;
  margin: auto;
  max-width: 100vh;
  white-space: nowrap;
  left: 0.5rem;
  right: 0.5rem;
  &__title {
    color: $white;
    margin-bottom: 0.5rem;
  }
  &__container {
    overflow: visible;
    display: block;
    height: 100px;
    white-space: nowrap;
    transition: all 200ms ease-in-out;
    width: 100%;
    &__img {
      width: 100px;
      height: 100px;
      object-fit: cover;
      display: inline-block;
      float: none;
      margin-right: 20px;
      cursor: pointer;
      opacity: 0.6;
      border-radius: $radius-medium;
    }
    &__img--active {
      width: 100px;
      display: inline-block;
      float: none;
      opacity: 1;
    }
  }
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}
</style>
