<template>
  <div class="sap-recommend-first-model">
    <el-row :gutter="8">
      <template v-if="item.itemList.length">
        <template v-for="(el,$index) in item.itemList">
          <el-col :key="$index" :span="12" class="srfm-item">
            <m-second-item :el="el" />
          </el-col>
        </template>
      </template>
      <template v-else>
        <template v-for="(el,$index) in 2">
          <el-col :key="$index" :span="12" class="srfm-item">
            <m-second-item :el="itemParams" />
          </el-col>
        </template>
      </template>
    </el-row>
  </div>
</template>
<script>
import { itemParams } from './.././../../../default'
import mSecondItem from './../commodity/secondItem'
export default {
  name: 'SapRecommendFirst',
  data() {
    return {
      itemParams
    }
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
