<template>
  <div class="spec-mprice-model">
    <span v-text="item[itemKey]" />
    <span v-if="!isDisabled">
      <edit-table :key="itemKey" :title="title" :keys="itemKey" :info="item" :index="index" @saveInfo="handleEditTabSpecs" />
    </span>
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
    },
    isDisabled: {
      type: Boolean,
      default: false
    },
    itemKey: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
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
