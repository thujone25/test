<template>
  <div class="gallery">
    <OneImage v-for="(item, index) in 25"
              :key="index"
              class="gallery__one-image" />
  </div>
</template>

<script>
import OneImage from '@/components/Gallery/OneImageTile';

export default {
  components: {
    OneImage
  },
  mounted() {
    this.$store.dispatch('galleryStore/getImages');
  }
}
</script>

<style scoped>
.gallery {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1550px;
  padding: 20px;
  margin: 0 auto;
}
.gallery__one-image {
  display: block;
  width: 300px;
  height: 169px;
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>
