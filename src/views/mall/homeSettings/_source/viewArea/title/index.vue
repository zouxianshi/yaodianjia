<template>
  <div class="va-title-model">
    <span v-for="(el,i) in item.itemList" :key="i" class="sp1">{{ el.name || '请填写' }}</span>
  </div>
</template>
<script>
export default {
  name: 'VaTitle',
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
    console.log(this.item)
    console.log('s------------------------')
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
    position: relative;
    .sp1 {
      font-weight: bold;
      font-size: 16px;
    }
  }
</style>
