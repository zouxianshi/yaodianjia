<template>
  <div class="sap-banner-model" :style="stylees">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div v-for="(item,i) in list" :key="i" class="swiper-slide">
          <img v-if="item.img" :src="showImg(item.img)" width="100%" height="116">
        </div>
      </div>
      <div class="swiper-pagination" />
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Swiper from 'swiper'
export default {
  name: 'SapBanner',
  data() {
    return {
      list: [
        {
          img: 'https://images.ydjia.cn/ydjia-merchant-manager/888888/20200617/8491500185354981adb819e77d0f9521.jpg'
        },
        {
          img: 'https://images.ydjia.cn/ydjia-merchant-manager/888888/20200617/8491500185354981adb819e77d0f9521.jpg'
        },
        {
          img: 'https://images.ydjia.cn/ydjia-merchant-manager/888888/20200617/8491500185354981adb819e77d0f9521.jpg'
        }
      ]
    }
  },
  props: {},
  methods: {},
  watch: {},
  beforeCreate() {
  },
  created() {
  },
  beforeMount() {
  },
  mounted() {
    new Swiper('.swiper-container', {
      autoplay: {
        delay: 1000
      },
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
    ...mapState('renovation', ['borderFlag']),
    stylees() {
      return [
        {
          padding: `0 ${this.borderFlag}px`
        }
      ]
    }
  },
  components: {}
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .sap-banner-model {

  }
</style>
