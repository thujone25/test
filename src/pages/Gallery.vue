<template>
  <div class="gallery">
    <template v-if="finalImages">
      <OneImage v-for="(item, index) in finalImages"
                :key="index"
                :img="item"
                class="gallery__one-image" />
    </template>
    <template v-else>
      <div>Sorry, our database is empty and we don't have any images yet =(</div>
    </template>
  </div>
</template>

<script>
import {mapState} from 'vuex'; 
import OneImage from '@/components/Gallery/OneImageTile';

export default {
  components: {
    OneImage
  },
  data() {
    return {
      requestIsInProgress: false
    }
  },
  computed: {
    ...mapState('galleryStore', ['images', 'totalPages']),
    finalImages() {
      if (this.requestIsInProgress) return 20;
      return this.images.length ? this.images : '';
    }
  },
  created() {
    this.requestIsInProgress = true;
    this.$store.dispatch('galleryStore/getImages').then(() => {
      this.requestIsInProgress = false;
    });
  }
}
</script>

<style scoped>
.gallery {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1590px;
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
