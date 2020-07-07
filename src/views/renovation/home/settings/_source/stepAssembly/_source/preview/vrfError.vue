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
    background: rgba(255,4,2,.1);
    width: calc(100% - 16px);
    height: calc(100% - 16px);
    line-height: calc(100% - 16px);
    z-index: 2;
    border:2px dotted #ff0000;
    .vem-p1 {
      width: calc(100% - -4px);
      height: 22px;
      line-height: 22px;
      background: #ff0000;
      position: absolute;
      left: -2px;
      bottom: -2px;
      text-align: center;
      font-size: 12px;
      color: #fff;
    }
  }
</style>
