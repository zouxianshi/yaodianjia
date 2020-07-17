<template>
  <div class="sap-notice-model">
    <div v-if="chooseFlag === 0" class="swiper-notice-transverse">
      <div class="sap-snt-box">
        <ul class="scroll" :style="{width:`${itemList.length * 180}px`,left:`${left}px`}">
          <li v-for="(item,$index) in itemList" :key="$index" :style="{color:textColor}">{{ truName(item.name) }}</li>
        </ul>
      </div>
    </div>
    <div v-show="chooseFlag === 1" class="swiper-notice-container">
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
    return {
      timer: null,
      left: 0
    }
  },
  props: {
    itemList: {
      type: Array,
      default: () => []
    },
    textColor: {
      type: String,
      default: '#3E3E3E'
    },
    chooseFlag: {
      type: Number,
      default: 0
    }
  },
  methods: {
    truName(v) {
      if (!v) {
        return ''
      }
      return _.truncate(v, { 'length': 12, 'omission': '' })
    },
    handlerTransverse() {
      const handlerLeft = () => {
        if (this.left === -(this.itemList.length * 180)) {
          this.left = 0
        }
        this.left -= 1
      }
      this.timer = setInterval(handlerLeft, 40)
      $('.swiper-notice-transverse').hover(function() {
        clearInterval(this.timer)
      }, function() {
        this.timer = setInterval(handlerLeft, 40)
      })
    }
  },
  watch: {
    'chooseFlag': {
      deep: true,
      immediate: true,
      handler(v) {
        if (v === 0) {
          this.timer = null
          this.left = 0
          this.handlerTransverse()
        }
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
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
      this.left = 0
    }
  },
  destroyed() {
  },
  computed: {},
  components: {}
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .sap-notice-model {
    .swiper-notice-transverse {
      .sap-snt-box {
        width:190px;
        height:20px;
        overflow:hidden;
        position:relative;
        .scroll {
          position:absolute;
          left:0px;
          top:0px;
        }
        .scroll li {
          width:180px;
          float:left;
          text-align:center;
          font-size: 14px;
        }
      }
    }
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
