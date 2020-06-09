<template>
  <div class="column-erp-code-model">
    <span v-text="item.erpCode" />
    <span v-if="!isDisabled">
      <edit-table title="商品编码" keys="erpCode" max-length="16" :info="item" :index="index" @saveInfo="handleEditTabSpecs" />
    </span>
  </div>
</template>
<script>
import editTable from './edit-table'
export default {
  name: 'ColumnErpCode',
  data() {
    return {}
  },
  inject: ['isDisabled'],
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
  .column-erp-code-model {

  }
</style>
