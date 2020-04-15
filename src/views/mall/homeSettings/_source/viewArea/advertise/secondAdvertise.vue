<template>
  <div class="va-second-advertise-model">
    <div class="vsam-left">
      <div class="ads-p1">
        <img src="../img/va_advertise_second_1.png" alt="" width="181" height="203">
      </div>
    </div>
    <div class="vsam-right">
      <div class="ads-p2">
        <img src="../img/va_advertise_second_2.png" alt="" width="215" height="96">
      </div>
      <div class="ads-p3">
        <img src="../img/va_advertise_second_3.png" alt="" width="215" height="96">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'VaSecondAdvertise',
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
  .va-second-advertise-model {
    overflow: hidden;
    height: 203px;
    .vsam-left,.vsam-right {
      float: left;
    }
    .vsam-left {
      width: 181px;
      margin-right: 8px;
      margin-left: 8px;
    }
    .vsam-right {
      width: 215px;
      .ads-p2 {
        margin-bottom: 9px;
      }
    }
  }
</style>
