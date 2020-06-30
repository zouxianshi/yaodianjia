<template>
  <div class="vrf-error-model">
    <p class="vem-p1">{{ item.typeName }}组件设置待完善</p>
  </div>
</template>
<script>
export default {
  name: 'VrfError',
  data() {
    return {}
  },
  props: {
    item: {
      type: Object,
      default: () => {}
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
  components: {}
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .vrf-error-model {
    position: absolute;
    left: 8px;
    top: 8px;
    background: rgba(255,4,2,.3);
    width: calc(100% - 16px);
    height: calc(100% - 16px);
    line-height: calc(100% - 16px);
    z-index: 2;
    .vem-p1 {
      width: 180px;
      height: 60px;
      line-height: 60px;
      color: #fff;
      font-size: 14px;
      position: absolute;
      left: 50%;
      top: 50%;
      margin-left: -90px;
      margin-top: -30px;
      text-align: center;
    }
  }
</style>
