<template>
  <transition name="modal">
    <div class="modal-slideshow" @click="close" v-if="imgIndex !== null">
      <button class="modal-slideshow__close" @click="close">&times;</button>
      <button class="modal-slideshow__prev" @click.stop="onPrev">&lsaquo;</button>
      <div class="modal-slideshow__container" @click.stop="fakeOnNext" v-if="images">
        <div class="modal-slideshow__container__image">
          <img v-show="!isPlayingVideo" class="modal-slideshow__container__image__img" @click.stop="onNextOrVideo" :src="imageUrl"/>
          <video-player class="vjs-custom-skin"
                        ref="videoPlayer"
                        :options="playerOptions"
                        :playsinline="true"
                        @click.stop='doNothing'
                        v-show="isPlayingVideo">
          </video-player>
        </div>
      </div>
      <button class="modal-slideshow__next" @click.stop="onNext">&rsaquo;</button>
      <div class="modal-slideshow__gallery" ref="gallery">
        <div class="modal-slideshow__gallery__title" v-if="images">{{ imgIndex + 1 }} / {{ images.length }}</div>
        <div class="modal-slideshow__gallery__container" v-if="images"
             :style="{ transform: 'translate(' + galleryXPos + 'px, 0)' }"><img
          class="modal-slideshow__gallery__container__img" v-for="(image, i) in images" :src="image"
          @click.stop="onClickThumb(image, i)" :key="i"
          :class="{ 'modal-slideshow__gallery__container__img--active': i === imgIndex}"/></div>
      </div>
    </div>
  </transition>
</template>

<script>
    import 'video.js/dist/video-js.css'
    import { videoPlayer } from 'vue-video-player'
  export default {
    props: ["images", "index", "videos"],
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
      },
      imageUrl(val){
        this.playerOptions.poster = val;
      },
      videoUrl(val){
          this.playerOptions.sources[0].src = val;
      }
    },
    methods: {
      close() {
        this.isPlayingVideo = 0;
        this.imgIndex = null;
        this.$emit("close");
      },
      doNothing(){
          this.isPlayingVideo = 1;
      },
      onPrev() {
          this.isPlayingVideo = 0;
        if (this.imgIndex > 0) {
          this.imgIndex--;
        } else {
          this.imgIndex = this.images.length - 1;
        }
        this.updateThumbails();
      },
      onNext() {
          this.isPlayingVideo = 0;
        if (this.imgIndex < this.images.length - 1) {
          this.imgIndex++;
        } else {
          this.imgIndex = 0;
        }
        this.updateThumbails();
      },
      fakeOnNext(e) {
          if(this.isPlayingVideo == 1)
          {
              e.preventDefault();
          }
          else{
              this.isPlayingVideo = 0;
              if (this.imgIndex < this.images.length - 1) {
                  this.imgIndex++;
              } else {
                  this.imgIndex = 0;
              }
              this.updateThumbails();
          }
      },
      onNextOrVideo() {
          if(this.videoUrl != null)
          {
            this.isPlayingVideo = 1;
          }
          else{
             this.onNext()
          }
      },
      onClickThumb(image, index) {
          this.isPlayingVideo = 0;
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
      videoUrl() {
        return this.videos[this.imgIndex];
      },
    },
    data() {
      return {
        imgIndex: this.index,
        image: null,
        isPlayingVideo: 0,
        galleryXPos: 0,
        thumbnailWidth: 120,
        playerOptions: {
            height: '500',
            autoplay: true,
            muted: true,
            language: 'en',
            playbackRates: [0.7, 1.0, 1.5, 2.0],
            sources: [{
                type: "video/mp4",
                src: null,
            }],
            poster: null,
        }
      };
    },
    components: {
        videoPlayer
    }
  };
</script>

<style lang="scss">
  $black-alpha-80: rgba(0, 0, 0, 0.8);
  $black: #000;
  $white: #fff;
  $radius-medium: 8px;
  $radius-large: 12px;

  @mixin respond-to($breakpoint) {
    @if $breakpoint == small {
      @media (min-width: 0) {
        @content;
      }
    } @else if $breakpoint == medium {
      @media (min-width: 40em) {
        @content;
      }
    } @else if $breakpoint == large {
      @media (min-width: 80em) {
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

  .modal-slideshow {
    @include modal-mask();
    background-color: $black-alpha-80;

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
      cursor: pointer;
      overflow: hidden;
      max-width: 100vh;
      margin: auto;
      left: 0.5rem;
      right: 0.5rem;

      @include respond-to(small) {
        width: 100%;
        max-width: 100%;
        top: 50%;
        margin-top: -150px;
        left: 0;
        right: 0;
      }

      @include respond-to(medium) {
        max-width: 100vh;
        margin: auto;
        top: 3rem;
        left: 0.5rem;
        right: 0.5rem;
      }

      &__image {
        background-color: $black;

        @include respond-to(small) {
          height: 274px;
          border-radius: 0;
        }

        @include respond-to(medium) {
          height: 60vh;
          border-radius: $radius-large;
          overflow: hidden;
        }

        height: 60vh;
        border-radius: $radius-large;
        overflow: hidden;

        &__img {
          display: block;
          margin: 0 auto;
          height: 100%;
        }
      }
    }
  }

  .modal-slideshow__gallery {
    @include respond-to(small) {
      display: none;
    }

    @include respond-to(medium) {
      overflow-x: hidden;
      overflow-y: hidden;
      position: absolute;
      bottom: 10px;
      margin: auto;
      max-width: 100vh;
      white-space: nowrap;
      left: 0.5rem;
      right: 0.5rem;
      display: block;
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
