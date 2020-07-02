<template>
  <div class="recommend-index-model">
    <div class="rim-title">
      <i class="rim-icon" />
      <span>为你推荐</span>
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
    .rim-title {
      text-align: center;
      margin-bottom: 8px;
      .rim-icon {
        width: 18px;
        height: 18px;
        background: url('./img/icon_recommend.png') no-repeat;
        display: inline-block;
      }
      >span {
        font-size: 18px;
        color: #3E3E3E;
        vertical-align: 2px;
        margin-left: 8px;
      }
    }
  }
</style>
