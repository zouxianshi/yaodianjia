<template>
  <div class="spec-mprice-model">
    <span v-text="item.mprice" />
    <edit-table title="参考价格" keys="mprice" :info="item" :index="index" @saveInfo="handleEditTabSpecs" />
  </div>
</template>
<script>
import editTable from './edit-table'
export default {
  name: 'SpecMprice',
  data() {
    return {}
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    index: {
      type: Number,
      default: null
    }
  },
  methods: {
    handleEditTabSpecs(row, keys, index) {
      this.item = _.assign(this.item, row)
    }
  },
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
  components: { editTable }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .spec-mprice-model {

  }
</style>
