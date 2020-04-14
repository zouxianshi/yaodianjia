<template>
  <div class="va-banner-model">
    <swiper :options="{loop: true,autoplay: {delay: 3000}}">
      <swiper-slide v-for="(el,i) in 3" :key="i" class="slider-item">
        <div class="img-wrap">
          <img src="./img/va_banner_1.png">
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

export default {
  name: 'VaBanner',
  components: {
    swiper,
    swiperSlide
  },
  props: {},
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
  }
</style>
