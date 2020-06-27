<template>
  <div class="title-index-model">
    <component :is="mod" :item="item" />
  </div>
</template>
<script>
import mFirst from './first'
import mSecond from './second'
import mThird from './third'
import mFour from './four'
import mFive from './five'
import mSix from './six'
import mSeven from './seven'
export default {
  name: 'TitleIndex',
  data() {
    return {}
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
        case 'third':
          return mThird
        case 'four':
          return mFour
        case 'five':
          return mFive
        case 'six':
          return mSix
        case 'seven':
          return mSeven
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .title-index-model {
    .tim-title-bg {
      width: 352px;
      height: 36px;
      line-height: 33px;
      overflow: hidden;
      .tim-text {
        display: block;
        text-align: center;
        font-size: 14px;
      }
    }
  }
</style>
