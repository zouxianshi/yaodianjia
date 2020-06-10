<template>
  <div class="spec-select-model">
    <span v-for="(item,$index) in specSelect" :key="$index" class="ssm-sp">
      <el-checkbox v-model="item.selected" :disabled="selectDis || isDisabled" @change="onChange($event,item)">{{ item.attributeName }}</el-checkbox>
    </span>
  </div>
</template>
<script>
export default {
  name: 'SpecSelect',
  data() {
    return {
      selectDis: false
    }
  },
  inject: ['isDisabled'],
  props: {
    specSelect: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    onChange(event, { id, attributeName }) {
      this.$emit('on-spec', {
        attributeName,
        key: `index_${id}_${attributeName}`,
        selected: event
      })
    }
  },
  watch: {},
  beforeCreate() {
  },
  created() {
    if (_.size(this.specSelect) === 1) {
      this.selectDis = true
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
  components: {}
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .spec-select-model {
    .ssm-sp {
      margin-right: 18px;
    }
  }
</style>
