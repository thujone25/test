<template>
  <div class="gallery">
    <template v-if="finalImages">
      <OneImage v-for="(item, index) in finalImages"
                :key="index"
                :img="item"
                class="gallery__one-image" />
      <div class="gallery__load-mode-btn-cont">
        <button v-if="showBtn"
                :disabled="disabledBtn"
                class="gallery__load-mode-btn"
                @click="loadMorePictures">Load more</button>
      </div>
      <ImageModal v-if="showModal"
                  :img="image"
                  :disable-prev="disablePrev"
                  :disable-next="disableNext"
                  @catchnav="catchNav" />
    </template>
    <template v-else>
      <div>Sorry, our database is empty and we don't have any images yet =(</div>
    </template>
  </div>
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex'; 
import OneImage from '@/components/Gallery/OneImageTile';
import ImageModal from '@/components/Gallery/ImageModal';

export default {
  components: {
    OneImage,
    ImageModal
  },
  data() {
    return {
      requestIsInProgress: false,
      disabledBtn: false
    }
  },
  computed: {
    ...mapState('galleryStore', ['images', 'totalPages', 'page']),
    ...mapState('oneImgStore', ['image']),
    disablePrev() {
      return this.images.length ? this.$route.query.img == this.images[0].id : true;
    },
    disableNext() {
      return !this.showBtn && (this.images.length ? this.$route.query.img == this.images[this.images.length - 1].id : true);
    },
    showBtn() {
      return this.page < this.totalPages;
    },
    finalImages() {
      if (this.requestIsInProgress) return 20;
      return this.images.length ? this.images : '';
    },
    showModal() {
      return this.$route.query.img;
    }
  },
  watch: {
    $route(newVal, oldVal) {
      if (newVal.query.img && !oldVal.query.img) {
        this.getOneImage(newVal.query.img);
      } else if (newVal.query.img && oldVal.query.img && newVal.query.img != oldVal.query.img) {
        this.removeImg();
        this.getOneImage(newVal.query.img);
      }
    }
  },
  methods: {
    ...mapActions('galleryStore', ['getImages', 'loadMoreImages']),
    ...mapActions('oneImgStore', ['getOneImage']),
    ...mapMutations('oneImgStore', ['removeImg']),
    loadMorePictures() {
      this.disabledBtn = true;
      return this.loadMoreImages().then(() => {
        this.disabledBtn = false;
      });
    },
    findIndexByID(id) {
      for (let i = 0, lim = this.images.length; i < lim; i += 1) {
        if (this.images[i].id == id) return i;
      }
    },
    async catchNav(type) {
      const currentIndex = this.findIndexByID(this.$route.query.img);
      if (type == 'prev') {
        const requestedID = this.images[currentIndex - 1].id;
        this.$router.push({name: this.$route.name, query: {img: requestedID}});
      } else if (type == 'next') {
        if (currentIndex == this.images.length - 1) {
          await this.loadMorePictures();
        }
        const requestedID = this.images[currentIndex + 1].id;
        this.$router.push({name: this.$route.name, query: {img: requestedID}});
      }
    }
  },
  created() {
    this.requestIsInProgress = true;
    this.$store.dispatch('galleryStore/getImages').then(() => {
      this.requestIsInProgress = false;
    });
  },
  mounted() {
    if (this.$route.query.img) {
      this.getOneImage(this.$route.query.img);
    }
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
.gallery__load-mode-btn-cont {
  display: flex;
  width: 100%;
  margin-top: 10px;
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
