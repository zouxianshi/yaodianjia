<template>
  <div class="view-area-model">
    <!--头部-->
    <m-header />

    <!--banner轮播图-->
    <m-banner />

    <!--公告-->
    <m-notice />

  </div>
</template>
<script>
import mHeader from './header'
import mBanner from './banner'
import mNotice from './notice'
export default {
  name: 'ViewArea',
  components: { mHeader, mBanner, mNotice },
  props: {},
  data() {
    return {}
  },
  computed: {},
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
  methods: {},
  beforeDestroy() {
  },
  destroyed() {
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .view-area-model {
    height: 1200px;
  }
</style>
