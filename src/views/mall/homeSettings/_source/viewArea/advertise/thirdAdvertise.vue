<template>
  <div class="va-third-advertise-model">
    <div class="vtam-item">
      <img src="../img/va_advertise_third_1.png" alt="" width="129" height="129">
    </div>
    <div class="vtam-item">
      <img src="../img/va_advertise_third_2.png" alt="" width="129" height="129">
    </div>
    <div class="vtam-item">
      <img src="../img/va_advertise_third_3.png" alt="" width="129" height="129">
    </div>
  </div>
</template>
<script>
export default {
  name: 'VaThirdAdvertise',
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
  components: {}
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .va-third-advertise-model {
    overflow: hidden;
    .vtam-item {
      width: 129px;
      float: left;
      margin-right: 8px;
      &:nth-child(1) {
        margin-left: 8px;
      }
    }
  }
</style>
