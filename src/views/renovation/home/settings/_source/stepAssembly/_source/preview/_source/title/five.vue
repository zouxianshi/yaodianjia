
<template>
  <div class="tim-title-bg sap-title-five-model">
    <strong class="tim-text">{{ item.itemList[0].name }}</strong>
  </div>
</template>
<script>
export default {
  name: 'SapTitleFive',
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
  .sap-title-five-model {
    background: url('./img/five_bg.png') no-repeat center;
    .tim-text {
      color: #fff;
    }
  }
</style>
