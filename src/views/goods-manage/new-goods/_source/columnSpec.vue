<template>
  <div class="column-spec-list-model">
    <span v-text="item[key] || '-'" />
    <span v-if="!isDisabled">
      <edit-table :title="item.attributeName" :keys="key" :info="item" max-length="50" :index="index" @saveInfo="handleEditTabSpecs" />
    </span>
  </div>
</template>
<script>
import editTable from './edit-table'
export default {
  name: 'ColumnSpecList',
  data() {
    return {
      specObj: {}
    }
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
    },
    attributeName: {
      type: String,
      default: ''
    },
    specSelectData: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handleEditTabSpecs(row, keys, index) {
      this.item = _.assign(this.item, row)
      this.$forceUpdate()
    }
  },
  watch: {},
  beforeCreate() {
  },
  created() {
    const { specSelectData, attributeName } = this
    const { id } = _.find(specSelectData, { 'attributeName': attributeName })
    this.key = `index_${id}_${attributeName}`
    if (!_.has(this.item, this.key)) {
      this.item[this.key] = ''
    }
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
  .column-spec-list-model {

  }
</style>
