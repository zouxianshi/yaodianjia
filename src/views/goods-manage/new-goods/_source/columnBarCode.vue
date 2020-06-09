<template>
  <div class="column-bar-code-model">
    <span v-text="item.barCode" />
    <edit-table title="条形码" keys="barCode" :info="item" max-length="30" :index="index" @saveInfo="handleEditTabSpecs" />
  </div>
</template>
<script>
import editTable from './edit-table'
export default {
  name: 'ColumnBarCode',
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
  .column-bar-code-model {

  }
</style>
