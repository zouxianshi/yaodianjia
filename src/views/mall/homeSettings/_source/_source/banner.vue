<template>
  <div class="va-banner-model" :style="{width:width,height:height}">
    <swiper v-if="isList" :options="{loop: true,autoplay: list.length === 1 ? false : {delay: 5000}}">
      <swiper-slide v-for="(item,i) in list" :key="i" class="slider-item">
        <div class="vbm-img-wrap">
          <m-tag-ads v-if="source === 'sa'" :text="`广告${i+1}`" />
          <img v-if="item.img" :src="showImg(item.img)" :width="width" :height="height">
          <div v-else class="no-banner" :style="{width:width,height:height}">
            <m-icons :is-center="true" text="请添加banner图" />
            <div style="padding-top: 50px">
              暂无图片，请上传
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>
<script>
import mIcons from './icons'
import mTagAds from './../viewArea/_source/tagAds'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
// import 'swiper/dist/css/swiper.css'
import 'swiper/css/swiper.css'

export default {
  name: 'VaBanner',
  components: {
    swiper,
    swiperSlide,
    mTagAds,
    mIcons
  },
  props: {
    source: {
      type: String,
      default: 'va'
    },
    width: {
      type: String,
      default: '420px'
    },
    height: {
      type: String,
      default: '180px'
    },
    itemList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      list: [],
      isList: false
    }
  },
  computed: {},
  watch: {
    'itemList': {
      deep: true,
      immediate: true,
      handler(v) {
        this.isList = false
        setTimeout(() => {
          this.list = v
          this.isList = true
        })
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
    overflow: hidden;
    margin: 0 auto;
    .vbm-img-wrap {
      position: relative;
      .no-banner {
        width: 420px;
        height: 180px;
        background: #F0F2F5;
        text-align: center;
        font-size: 12px;
        color: #666;
      }
    }
  }
</style>
