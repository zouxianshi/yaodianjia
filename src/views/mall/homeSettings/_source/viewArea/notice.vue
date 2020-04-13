<template>
  <div class="va-notice-model">
    <div class="vnm-box">
      <div class="swiper-box">
        <swiper :options="{loop: true,direction: 'vertical',autoplay: {delay: 5000}}">
          <swiper-slide v-for="(el,i) in 3" :key="i" class="slider-item">
            <p class="text">防疫药品陆续到货中，速抢 >></p>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'VaNotice',
  components: { swiper, swiperSlide },
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
  .va-notice-model {
    background: #f5f5f8;
    .vnm-box {
      width: 420px;
      height: 80px;
      background: url('./img/va_notice_bg.png') no-repeat;

      .swiper-box {
        height: 40px;
        width: 240px;
        overflow: hidden;
        position: relative;
        left: 98px;
        top: 34px;
        .text {
          font-size: 14px;
          color: #fe4239;
          text-shadow: #fff 0 1px 0;
        }
      }

    }
  }
</style>
