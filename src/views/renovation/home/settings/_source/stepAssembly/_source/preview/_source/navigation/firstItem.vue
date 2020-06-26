<template>
  <div class="sap-first-item-model">
    <div v-if="false" class="sfim-icon">
      <img src="https://images.ydjia.cn/ydjia-merchant-manager/888888/20200617/8491500185354981adb819e77d0f9521.jpg" alt="" style="width: 58px;height: 58px;">
    </div>
    <m-item-no-data border-radius="100%" height="58px" />

    <div class="sfim-text">
      导航一
    </div>
  </div>
</template>
<script>
import mItemNoData from './../../../itemNoData'
export default {
  name: 'SapFirstItem',
  data() {
    return {

    }
  },
  props: {
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
  components: { mItemNoData }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  $w:58px;
  .sap-first-item-model {
    width: $w;
    text-align: center;
    margin: 0 auto 8px auto;
    .sfim-icon,.sfim-no-data {
      width: $w;
      height: $w;
    }
    .sfim-text {
      font-size: 12px;
      color: #4A4A4A;
      margin-top: 8px;
    }
  }
</style>
