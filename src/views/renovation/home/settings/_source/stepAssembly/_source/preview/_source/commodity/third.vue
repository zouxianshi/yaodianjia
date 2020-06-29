<template>
  <div class="sap-commodity-third-model">
    <el-row :gutter="8">
      <template v-for="(el,$index) in item.itemList">
        <el-col :key="$index" :span="8" class="sctm-item">
          <m-second-item :el="el" img-height="90px" />
        </el-col>
      </template>
    </el-row>
  </div>
</template>
<script>
import mSecondItem from './secondItem'
export default {
  name: 'SapCommodityThird',
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
  .sap-commodity-third-model {

  }
</style>
