<template>
  <div class="gallery">
    <template v-if="finalImages">
      <OneImage v-for="(item, index) in finalImages"
                :key="index"
                :img="item"
                class="gallery__one-image" />
      <button v-if="showBtn"
              :disabled="disabledBtn"
              class="gallery__load-mode-btn"
              @click="loadMorePictures">Load more</button>
    </template>
    <template v-else>
      <div>Sorry, our database is empty and we don't have any images yet =(</div>
    </template>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'; 
import OneImage from '@/components/Gallery/OneImageTile';

export default {
  components: {
    OneImage
  },
  data() {
    return {
      requestIsInProgress: false,
      disabledBtn: false
    }
  },
  computed: {
    ...mapState('galleryStore', ['images', 'totalPages', 'page']),
    showBtn() {
      return this.page < this.totalPages;
    },
    finalImages() {
      if (this.requestIsInProgress) return 20;
      return this.images.length ? this.images : '';
    }
  },
  methods: {
    ...mapActions('galleryStore', ['getImages', 'loadMoreImages']),
    loadMorePictures() {
      this.disabledBtn = true;
      this.loadMoreImages().then(() => {
        this.disabledBtn = false;
      });
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
.gallery__load-mode-btn {
  display: block;
  width: 200px;
  height: 35px;
  line-height: 35px;
  text-align: center;
  font-size: 20px;
  color: #ffffff;
  background-color: blue;
}
.gallery__load-mode-btn:not([disabled]):hover {
  opacity: 0.85;
}
.gallery__load-mode-btn[disabled] {
  background-color: grey;
  cursor: not-allowed;
  pointer-events: none;
}
</style>
