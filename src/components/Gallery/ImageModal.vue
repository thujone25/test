<template>
  <div class="image-modal"
       @click="closeModal">
    <div class="image-modal__content"
         @click.stop="">
      <!-- <div class="image-modal__img"
           :style="finalStyles"
           :class="{'image-modal__img--with-image': finalStyles}"></div> -->
      <img :src="img.full_picture"
           :class="{'image-modal__img--with-image': loaded}"
           class="image-modal__img">
    </div>
    <button class="image-modal__close-btn">X</button>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'; 

export default {
  props: ['img'],
  data() {
    return {
      loaded: false
    }
  },
  computed: {
    finalStyles() {
      if (this.img.full_picture && this.loaded) {
        return {
          backgroundImage: `url(${encodeURI(this.img.full_picture)})`
        }
      }
      return undefined;
    }
  },
  watch: {
    img() {
      this.loadPicture();
    }
  },
  methods: {
    ...mapMutations('oneImgStore', ['removeImg']),
    loadPicture() {
      if (this.img.full_picture) {
        let img = new Image();
        img.src = this.img.full_picture;
        img.onload = () => {
          this.loaded = true;
        };
        img = null;
      }
    },
    closeModal() {
      this.$router.push({name: this.$route.name, query: {}});
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
  z-index: 10;
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
.image-modal__close-btn {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10;
  display: block;
  width: 45px;
  height: 45px;
  color: #ffffff;
  font-size: 25px;
  font-weight: bold;
  text-shadow: 0 0 3px #000000;
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
