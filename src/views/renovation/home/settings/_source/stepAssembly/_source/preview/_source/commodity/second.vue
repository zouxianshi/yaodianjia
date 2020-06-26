<template>
  <div class="sap-commodity-second-model" :style="stylees">
    <el-row :gutter="8">
      <template v-for="(el,$index) in item.itemList">
        <el-col :key="$index" :span="12" class="snfm-item">
          <m-second-item :el="el" />
        </el-col>
      </template>
    </el-row>
  </div>
</template>
<script>
import { globalBinding } from './../../../../mixins'
import mSecondItem from './secondItem'

export default {
  name: 'SapCommoditySecond',
  data() {
    return {}
  },
  mixins: [globalBinding],
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
  .sap-commodity-second-model {

  }
</style>
