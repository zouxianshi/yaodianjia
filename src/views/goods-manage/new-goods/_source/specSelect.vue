<template>
  <div class="spec-select-model">
    <span v-for="(item,$index) in specSelect" :key="$index" class="ssm-sp">
      <el-checkbox v-model="item.selected">{{ item.attributeName }}</el-checkbox>
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
  props: {
    specSelect: {
      type: Array,
      default: () => []
    }
  },
  methods: {},
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
