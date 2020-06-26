<template>
  <div class="sap-recommend-second-model">
    <el-row :gutter="8">
      <template v-for="(el,$index) in item.itemList">
        <el-col :key="$index" :span="8" class="srsm-item">
          <m-second-item :el="el" img-height="86px" />
        </el-col>
      </template>
    </el-row>
  </div>
</template>
<script>
import mSecondItem from './../commodity/secondItem'
export default {
  name: 'SapRecommendSecond',
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
  .sap-recommend-second-model {
    .srsm-item {
      margin-bottom: 8px;
    }
  }
</style>
