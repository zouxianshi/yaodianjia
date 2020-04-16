<template>
  <div class="va-four-advertise-model">
    <div class="vfam-item">
      <m-tag-ads v-if="source === 'sa'" text="广告1" />
      <img src="../img/va_advertise_four_1.png" alt="" width="199" height="91">
    </div>
    <div class="vfam-item">
      <m-tag-ads v-if="source === 'sa'" text="广告2" />
      <img src="../img/va_advertise_four_2.png" alt="" width="199" height="91">
    </div>
    <div class="vfam-item">
      <m-tag-ads v-if="source === 'sa'" text="广告3" />
      <img src="../img/va_advertise_four_3.png" alt="" width="199" height="91">
    </div>
    <div class="vfam-item">
      <m-tag-ads v-if="source === 'sa'" text="广告4" />
      <img src="../img/va_advertise_four_4.png" alt="" width="199" height="91">
    </div>
  </div>
</template>
<script>
import mTagAds from './../_source/tagAds'
export default {
  name: 'VaFourAdvertise',
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
  .va-four-advertise-model {
    overflow: hidden;
    .vfam-item {
      width: 199px;
      float: left;
      margin: 0 3px;
      margin-bottom: 4px;
      position: relative;
      &:nth-child(1),&:nth-child(3) {
        margin-left: 8px;
      }
      &:nth-child(3),&:nth-child(4) {
        margin-bottom: 0;
      }
    }
  }
</style>
