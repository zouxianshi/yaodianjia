<template>
  <div class="sap-banner-model">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div v-for="(item,i) in bannerList" :key="i" class="swiper-slide">
          <img v-if="item.img" :src="showImg(item.img)" width="100%" height="116">
          <m-item-no-data v-else height="116px" />
        </div>
      </div>
      <div class="swiper-pagination" />
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Swiper from 'swiper'
import mItemNoData from './../../../itemNoData'

export default {
  name: 'SapBanner',
  data() {
    return {
      bannerList: []
    }
  },
  props: {
    itemList: {
      type: Array,
      default: () => []
    }
  },
  methods: {

  },
  watch: {
    'itemList': {
      deep: true,
      handler(v) {
        this.bannerList = v
      }
    }
  },
  beforeCreate() {
  },
  created() {
  },
  beforeMount() {
  },
  mounted() {
    this.bannerList = this.itemList
    new Swiper('.swiper-container', {
      autoplay: {
        delay: 3000
      },
      observer: true,
      pagination: {
        el: '.swiper-pagination'
      }
    })
  },
  beforeUpdate() {
  },
  updated() {
  },
  beforeDestroy() {
  },
  destroyed() {
  },
  computed: {
    ...mapState('renovation', ['borderFlag'])
  },
  components: { mItemNoData }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .sap-banner-model {
    height: 116px;
    .swiper-slide {
      >img {
        display: block;
      }
    }
  }
</style>
