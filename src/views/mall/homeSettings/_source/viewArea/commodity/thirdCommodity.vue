<template>
  <div class="scrollbar va-third-commodity-model">
    <div class="vtcm-box" :style="{width:`${(137*10)}px`}">
      <m-second-item v-for="(el,i) in 10" :key="i" />
    </div>
  </div>
</template>
<script>
import mSecondItem from './secondItem'
export default {
  name: 'VaThirdCommodity',
  data() {
    return {}
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
    .vtcm-box {
      height: 178px;
    }
  }
</style>
