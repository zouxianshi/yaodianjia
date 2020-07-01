
<template>
  <div class="tim-title-bg sap-title-four-model">
    <strong class="tim-text">{{ item.itemList[0].name }}</strong>
  </div>
</template>
<script>
export default {
  name: 'SapTitleFour',
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
  .sap-title-four-model {
    background: url('./img/four_bg.png') no-repeat center;
  }
</style>
