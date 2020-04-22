<template>
  <div class="va-notice-model">
    <div class="vnm-box">
      <div class="swiper-box">
        <swiper :options="{loop: true,direction: 'vertical',autoplay: {delay: 5000}}">
          <swiper-slide v-for="(el,i) in list" :key="i" class="slider-item">
            <p class="text">{{ el.name }} >></p>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>
<script>
import { getNotice } from './_source/utils'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'VaNotice',
  components: { swiper, swiperSlide },
  props: {},
  data() {
    return {
      list: []
    }
  },
  computed: {},
  watch: {},
  beforeCreate() {
  },
  created() {
    getNotice({ merCode: this.$store.state.user.merCode }).then(res => {
      this.list = res
    })
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
    width: 422px;
    background: #f5f5f8;
    border-top: 2px solid #f5f5f8;
    border-left: 2px solid #f5f5f8;
    border-right: 2px solid #ffffff;
    border-bottom: 2px solid #f5f5f8;
    .vnm-box {
      width: 420px;
      height: 76px;
      background: url('./img/va_notice_bg.png') no-repeat;

      .swiper-box {
        height: 24px;
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
