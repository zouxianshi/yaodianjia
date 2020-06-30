<template>
  <div class="recommend-index-model">
    <div class="rim-bg">
      <div class="rim-left-bg" />
      <div class="rim-center-bg" />
      <div class="rim-right-bg" />
    </div>
    <div class="rim-comp-box">
      <component :is="mod" :item="{...item,itemList}" />
    </div>
  </div>
</template>
<script>
import mFirst from './first'
import mSecond from './second'

import { getRecommendedFormat } from '@/views/mall/homeSettings/_source/viewArea/_source/utils'
export default {
  name: 'RecommendIndex',
  data() {
    return {
      itemList: []
    }
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  methods: {},
  watch: {},
  beforeCreate() {
  },
  created() {
    getRecommendedFormat(this).then(itemList => {
      this.itemList = itemList
      this.loading = false
    }).catch(() => {
      this.loading = false
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
  beforeDestroy() {
  },
  destroyed() {
  },
  computed: {
    mod() {
      switch (this.item.subType) {
        case 'first':
          return mFirst
        case 'second':
          return mSecond
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .recommend-index-model {
    min-height: 180px;
    .rim-bg {
      overflow: hidden;
      .rim-left-bg,.rim-center-bg,.rim-right-bg {
        height: 180px;
        float: left;
      }
      .rim-left-bg {
        width: 160px;
        background: url('./img/rim_left_bg.png') no-repeat;
      }
      .rim-center-bg {
        width: calc(100% - 260px);
        background: url('./img/rim_center_bg.png') repeat-x;
      }
      .rim-right-bg {
        width: 100px;
        background: url('./img/rim_right_bg.png') no-repeat;
      }
    }
    .rim-comp-box {
      margin: -128px 8px 0 8px;
    }
  }
</style>
