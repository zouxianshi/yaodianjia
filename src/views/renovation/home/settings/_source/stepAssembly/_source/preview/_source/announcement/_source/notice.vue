<template>
  <div class="sap-notice-model">
    <div class="swiper-notice-container">
      <div class="swiper-wrapper">
        <div v-for="(item,$index) in itemList" :key="$index" class="swiper-slide" :style="{color:textColor}">{{ truName(item.name) }}</div>
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
    itemList: {
      type: Array,
      default: () => []
    },
    textColor: {
      type: String,
      default: '#3E3E3E'
    }
  },
  methods: {
    truName(v) {
      if (!v) {
        return ''
      }
      return _.truncate(v, { 'length': 12, 'omission': '' })
    }
  },
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
      observer: true,
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
