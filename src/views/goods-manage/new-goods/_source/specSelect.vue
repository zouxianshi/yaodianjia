<template>
  <div class="spec-select-model">
    <span v-for="(item,$index) in specSelect" :key="$index" class="ssm-sp">
      <el-checkbox v-model="item.selected" :disabled="isDisabled" @change="onChange($event,item)">{{ item.attributeName }}</el-checkbox>
    </span>
  </div>
</template>
<script>
export default {
  name: 'SpecSelect',
  data() {
    return {
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
      if (!event) {
        this.$emit('on-spec-hide', `index_${id}_${attributeName}`)
      }
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
