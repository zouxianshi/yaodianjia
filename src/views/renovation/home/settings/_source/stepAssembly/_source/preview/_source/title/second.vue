
<template>
  <div class="tim-title-bg sap-title-second-model">
    <strong class="tim-text">{{ item.itemList[0].name }}</strong>
  </div>
</template>
<script>
export default {
  name: 'SapTitleSecond',
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
  .sap-title-second-model {
    background: url('./img/second_bg.png') no-repeat center;
  }
</style>
