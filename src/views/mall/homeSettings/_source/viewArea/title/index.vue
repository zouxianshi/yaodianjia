<template>
  <div class="va-title-model">
    <span class="sp1">{{ name }}</span>
  </div>
</template>
<script>
export default {
  name: 'VaTitle',
  data() {
    return {}
  },
  props: {
    name: {
      type: String,
      default: '为你推荐'
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
  .va-title-model {
    padding: 0px 10px 0px 10px;
    .sp1 {
      font-weight: bold;
      font-size: 16px;
    }
  }
</style>
