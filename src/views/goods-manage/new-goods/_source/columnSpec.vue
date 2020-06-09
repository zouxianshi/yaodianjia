<template>
  <div class="column-spec-list-model">
    column-spec-list
  </div>
</template>
<script>
export default {
  name: 'ColumnSpecList',
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
    debugger
    console.log(this.item)
    console.log('------------------------------this.item')
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
  .column-spec-list-model {

  }
</style>
