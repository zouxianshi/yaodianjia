<template>
  <div class="scrollbar va-third-commodity-model">
    <div class="vtcm-box" :style="{width:`${132 * item.itemList.length}px`}">
      <template v-for="(el,i) in item.itemList">
        <m-second-item v-if="size > i" :key="i" :item="el" :stylecs="{width:'116px'}" />
      </template>
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
    },
    size: {
      type: Number,
      default: 8
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
    &::-webkit-scrollbar{
      display: none;
    }
    .vtcm-box {
      height: 178px;
    }
  }
</style>
