<template>
  <div class="spec-limit-num-model">
    <template v-if="item.limitType === 1">
      <span>每笔订单限购{{ item.limitNum }}件</span>
    </template>
    <template v-else-if="item.limitType === 2">
      <span>
        按周期每
        <span v-if="item.type === 2">天</span>
        <span v-else-if="item.type === 3">周</span>
        <span v-else>月</span>
        限购数量
        {{ item.limitNum }}件
      </span>
    </template>
    <template v-else>
      <span>不限购</span>
    </template>
    <template>
      <edit-table title="限购数量" keys="limitNum" max-length="8" :info="item" :index="index" @saveInfo="handleEditTabSpecs" />
    </template>
  </div>
</template>
<script>
import editTable from './edit-table'
export default {
  name: 'SpecLimitNum',
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
  .spec-limit-num-model {

  }
</style>
