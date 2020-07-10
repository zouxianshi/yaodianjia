<template>
  <div class="item-limit-num-model">
    <el-radio-group v-model="item.limitType">
      <el-radio :label="0" style="display:block line-height: 28px">不限购</el-radio>
      <el-radio :label="1" style="margin-top:10px">
        <span style="color:#333">
          每笔订单限购&nbsp;
          <template v-if="item.limitType === 1">
            <el-input v-model="item.limitNum" size="mini" maxlength="8" :disabled="item.limitType=== 2 || item.limitType === 0" style="width:100px" />&nbsp;件
          </template>
          <template v-else>
            <el-input maxlength="8" :disabled="item.limitType === 2 || item.limitType === 0" size="mini" style="width:100px" />&nbsp;件
          </template>
        </span>
      </el-radio>
      <el-radio :label="2" style="margin-top:10px">
        <span style="color:#333">
          按周期每&nbsp;
          <el-select v-model="item.type" :disabled="item.limitType === 1 || item.limitType === 0" size="mini" style="width:80px;margin-right: 20px;" placeholder="选择类型">
            <el-option :value="2" label="天" />
            <el-option :value="3" label="周" />
            <el-option :value="4" label="月" />
          </el-select>
          限购&nbsp;
          <template v-if="item.limitType === 2">
            <el-input v-model="item.limit" maxlength="8" :disabled="item.limitType === 1 || item.limitType === 0" size="mini" style="width:100px" />
          </template>
          <template v-else>
            <el-input maxlength="8" :disabled="item.limitType === 1 || item.limitType === 0" size="mini" style="width:100px" />
          </template>
        </span>
      </el-radio>
    </el-radio-group>
  </div>
</template>
<script>
export default {
  name: 'ItemLimitNum',
  data() {
    return {}
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    $verification() {
      const { limitType, limit, limitNum } = this.item
      const value = (() => {
        if (limitType === 2) {
          return limit
        } else if (limitType === 1) {
          return limitNum
        }
      })()
      if (limitType === 1 || limitType === 2) {
        if (isNaN(value)) {
          return '请输入数字'
        }
        if (value > 0 && value % 1 !== 0) {
          return '请输入大于0的整数'
        } else {
          if (value <= 0) {
            return '请输入大于0的整数'
          }
        }
      }
      return true
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
  .item-limit-num-model {

  }
</style>
