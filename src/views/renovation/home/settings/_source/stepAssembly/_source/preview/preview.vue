<template>
  <div class="sa-preview-model">
    <div class="apm-header">
      <m-header />
    </div>
    <div class="apm-banner">
      <m-banner />
    </div>
    <div class="apm-drag-area" />
  </div>
</template>
<script>
import mHeader from './_source/header/header'
import mBanner from './_source/banner/banner'
export default {
  name: 'SaPreview',
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
  components: { mHeader, mBanner }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .sa-preview-model {
    height: calc(100vh - 374px);
    border:1px solid #CFCFCF;
    background: #FBFBFB;
    .apm-header {
      margin-bottom: 10px;
    }
  }
</style>
