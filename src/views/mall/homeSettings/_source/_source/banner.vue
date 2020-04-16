<template>
  <div class="va-banner-model">
    <swiper :options="{loop: true,autoplay: {delay: 3000}}">
      <swiper-slide v-for="(el,i) in 3" :key="i" class="slider-item">
        <div class="vbm-img-wrap">
          <m-tag-ads v-if="source === 'sa'" :text="`广告${i+1}`" />
          <img src="./../viewArea/img/va_banner_1.png">
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>
<script>
import mTagAds from './../viewArea/_source/tagAds'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

export default {
  name: 'VaBanner',
  components: {
    swiper,
    swiperSlide,
    mTagAds
  },
  props: {
    source: {
      type: String,
      default: 'va'
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  beforeCreate() {
  },
  created() {
  },
  beforeMount() {
  },
  mounted() {
  },
  beforeUpdate() {
  },
  updated() {
  },
  methods: {},
  beforeDestroy() {
  },
  destroyed() {
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .va-banner-model {
    height: 180px;
    overflow: hidden;
    .vbm-img-wrap {
      position: relative;
      .vbm-source {

      }
    }
  }
</style>
