<template>
  <div class="scrollbar va-third-commodity-model">
    <div class="vtcm-box" :style="{width:`${140 * item.itemList.length}px`}">
      <m-second-item v-for="(el,i) in item.itemList" :key="i" :item="el" />
    </div>
  </div>
</template>
<script>
import mSecondItem from './secondItem'
export default {
  name: 'VaThirdCommodity',
  data() {
    return {
    }
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  methods: {},
  watch: {
  },
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
  computed: {},
  components: { mSecondItem }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .va-third-commodity-model {
    margin-bottom: 10px;
    &::-webkit-scrollbar{
      display: none;
    }
    .vtcm-box {
      height: 178px;
    }
  }
</style>
