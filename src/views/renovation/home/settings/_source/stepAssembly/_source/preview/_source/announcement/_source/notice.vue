<template>
  <div class="sap-notice-model">
    <div class="swiper-notice-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" :style="{color:textColor}">中台需求与微商城对应说明</div>
        <div class="swiper-slide" :style="{color:textColor}">功能模块对应开发人员说明</div>
        <div class="swiper-slide" :style="{color:textColor}">Git版本管理说明与职责分配</div>
      </div>
    </div>
  </div>
</template>
<script>
import Swiper from 'swiper'
export default {
  name: 'SapNotice',
  data() {
    return {}
  },
  props: {
    textColor: {
      type: String,
      default: '#3E3E3E'
    }
  },
  methods: {},
  watch: {},
  beforeCreate() {
  },
  created() {
  },
  beforeMount() {
  },
  mounted() {
    new Swiper('.swiper-notice-container', {
      direction: 'vertical',
      autoplay: {
        delay: 5000
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
  computed: {},
  components: {}
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .sap-notice-model {
    .swiper-notice-container {
      width: 180px;
      height: 28px;
      overflow: hidden;
    }
    .swiper-slide {
      font-size: 14px;
    }
  }
</style>
