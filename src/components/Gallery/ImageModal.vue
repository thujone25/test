<template>
  <div class="image-modal"
       @click="closeModal">
    <div class="image-modal__content"
         @click.stop="">
      <button v-clipboard:copy="currentPath"
              class="image-modal__copy-path-btn"
              @click="handleCopySuccess">
        Copy link!
        <span v-if="isCopied">Link copied!</span>
      </button>
      <img :src="img.full_picture"
           :class="{'image-modal__img--with-image': loaded}"
           class="image-modal__img">
      <p v-if="loaded"
         class="image-modal__img-info">{{ imgInfoText }}</p>
      <button v-if="!disablePrev"
              class="image-modal__prev-img-btn"
              @click="emitNavigation('prev')"><span>&#x2B05;</span></button>
      <button v-if="!disableNext"
              class="image-modal__next-img-btn"
              @click="emitNavigation('next')"><span>&#x27A1;</span></button>
    </div>
    <button class="image-modal__close-btn">X</button>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'; 

export default {
  props: ['img', 'disablePrev', 'disableNext'],
  data() {
    return {
      loaded: false,
      isCopied: false,
      isCopyLinkActive: false,
      timerId: false
    }
  },
  computed: {
    currentPath() {
      return window.location.href;
    },
    finalStyles() {
      if (this.img.full_picture && this.loaded) {
        return {
          backgroundImage: `url(${encodeURI(this.img.full_picture)})`
        }
      }
      return undefined;
    },
    imgInfoText() {
      return [this.img.author || '', this.img.camera || '', this.img.tags || ''].join(' | ');
    }
  },
  watch: {
    img() {
      this.loadPicture();
    }
  },
  methods: {
    ...mapMutations('oneImgStore', ['removeImg']),
    emitNavigation(type) {
      this.$emit('catchnav', type);
    },
    loadPicture() {
      if (this.img.full_picture) {
        let img = new Image();
        img.src = this.img.full_picture;
        img.onload = () => {
          this.loaded = true;
          img = null;
        };
      }
    },
    closeModal() {
      this.$router.push({name: this.$route.name, query: {}});
    },
    handleCopySuccess() {
      if (this.isCopied) {
        this.isCopied = false;
        this.isCopyLinkActive = false;
        clearTimeout(this.timerId);
      } else {
        this.isCopied = true;
        this.isCopyLinkActive = true;
        if (this.timerId) {
          this.timerId = null;
          clearTimeout(this.timerId);
        }
        if (!this.timerId) {
          this.timerId = setTimeout(() => {
            this.isCopied = false;
          }, 500);
        }
      }
    }
  },
  mounted() {
    this.loadPicture();
  },
  beforeDestroy() {
    this.removeImg();
  }
};
</script>

<style scoped>
.image-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(10, 10, 10, 0.45);
}
.image-modal__content {
  position: relative;
  display: block;
  background-color: #ffffff;
  border-radius: 12px;
}
.image-modal__img {
  width: 500px;
  height: 281px;
  max-width: 95vw;
  max-height: 95vh;
  background-color: #ccc;
  border-radius: 12px;
  background-image: linear-gradient(90deg, #ddd 0px, #e8e8e8 40px, #ddd 80px);
  background-size: 95%;
  animation: shine-avatar 1.6s infinite linear;
}
.image-modal__img--with-image {
  width: initial;
  height: initial;
  background-image: none;
}
.image-modal__img-info {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  padding: 10px;
  font-size: 14px;
  text-shadow: 0 0 3px #000000;
  color: #ffffff;
  background-color: rgba(10, 10, 10, 0.85);
  opacity: 0.45;
}
.image-modal__prev-img-btn,
.image-modal__next-img-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 10px 0;
  font-size: 20px;
  font-weight: bold;
  text-shadow: 0 0 3px #000000;
  color: #ffffff;
  background-color: rgba(10, 10, 10, 0.85);
  opacity: 0.45;
  border-radius: 50%;
}
.image-modal__prev-img-btn {
  left: 10px;
}
.image-modal__next-img-btn {
  right: 10px;
}
.image-modal__content:hover .image-modal__img-info,
.image-modal__content:hover .image-modal__copy-path-btn,
.image-modal__content:hover .image-modal__prev-img-btn,
.image-modal__content:hover .image-modal__next-img-btn {
  opacity: 0.85;
}
.image-modal__close-btn {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10;
  display: block;
  width: 45px;
  height: 45px;
  font-size: 25px;
  font-weight: bold;
  text-shadow: 0 0 3px #000000;
  color: #ffffff;
}
.image-modal__copy-path-btn {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: inline-block;
  height: 25px;
  padding: 0 10px;
  font-size: 12px;
  font-weight: bold;
  text-shadow: 0 0 3px #000000;
  color: #ffffff;
  background-color: rgba(10, 10, 10, 0.85);
  opacity: 0.45;
  border-radius: 12px;
}
.image-modal__copy-path-btn span {
  position: absolute;
  top: calc( 100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  font-size: 10px;
  font-weight: bold;
  text-shadow: 0 0 3px #000000;
  color: #ffffff;
  background-color: rgba(10, 10, 10, 0.85);
}
@keyframes shine-avatar {
  0% {
    background-position: -10%;
  }
  40%, 100% {
    background-position: 100%;
  }
}
</style>
