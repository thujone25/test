<template>
  <div :style="finalStyles"
       :class="{'one-gallery-image--with-image': finalStyles}"
       class="one-gallery-image"></div>
</template>

<script>
export default {
  props: ['img'],
  data() {
    return {
      loaded: false
    }
  },
  computed: {
    finalStyles() {
      if (this.img.cropped_picture && this.loaded) {
        return {
          backgroundImage: `url(${encodeURI(this.img.cropped_picture)})`
        }
      }
      return undefined;
    }
  },
  watch: {
    img() {
      if (this.img.cropped_picture) {
        let img = new Image();
        img.src = this.img.cropped_picture;
        img.onload = () => {
          this.loaded = true;
        };
        img = null;
      }
    }
  }
}
</script>

<style scoped>
.one-gallery-image {
  background-color: #ccc;
  border-radius: 12px;
  background-image: linear-gradient(90deg, #ddd 0px, #e8e8e8 40px, #ddd 80px);
  background-size: 600px;
  animation: shine-avatar 1.6s infinite linear;
}
.one-gallery-image--with-image {
  background-position: 50% 50%;
  background-size: cover;
  background-repeat: no-repeat;
  animation: none;
}
@keyframes shine-avatar {
  0% {
    background-position: -32px;
  }
  40%, 100% {
    background-position: 208px;
  }
}
</style>
