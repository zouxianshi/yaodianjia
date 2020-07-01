
<template>
  <div class="tim-title-bg sap-title-seven-model">
    <strong class="tim-text">{{ item.itemList[0].name }}</strong>
  </div>
</template>
<script>
export default {
  name: 'SapTitleSeven',
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
  .sap-title-seven-model {
    background: url('./img/seven_bg.png') no-repeat center;
    .tim-text {
      color: #fff;
    }
  }
</style>
