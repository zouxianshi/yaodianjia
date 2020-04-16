<template>
  <div class="va-five-advertise-model">
    <m-tag-ads v-if="source === 'sa'" text="广告1" />
    <img src="http://meisudci.oss-cn-beijing.aliyuncs.com/bn_thumb/MSBQ13715300462216.jpg?x-oss-process=style/bn_info_thumb" alt="" width="100%">
  </div>
</template>
<script>
import mTagAds from './../_source/tagAds'
export default {
  name: 'VaFiveAdvertise',
  data() {
    return {}
  },
  props: {
    source: {
      type: String,
      default: 'va'
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
  computed: {},
  components: { mTagAds }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .va-five-advertise-model {
    position: relative;
  }
</style>
