<template>
  <div class="sap-navigation-second-model" :style="stylees">
    <el-row>
      <template v-for="(el,$index) in item.itemList">
        <el-col :key="$index" :span="7" class="snsm-item">
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
  name: 'SapNavigationSecond',
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
  computed: {
  },
  components: { mSecondItem }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .sap-navigation-second-model {
    overflow: hidden;
    .el-row {
      .el-col-7 {
        width: 20%;
      }
    }
  }
</style>
