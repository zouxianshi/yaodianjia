<template>
  <div class="sap-recommend-first-model">
    <el-row :gutter="8">
      <template v-for="(el,$index) in item.itemList">
        <el-col :key="$index" :span="12" class="srfm-item">
          <m-second-item :el="el" />
        </el-col>
      </template>
    </el-row>
  </div>
</template>
<script>
import mSecondItem from './../commodity/secondItem'
export default {
  name: 'SapRecommendFirst',
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
  components: { mSecondItem }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .sap-recommend-first-model {
    .srfm-item {
      margin-bottom: 8px;
    }
  }
</style>
