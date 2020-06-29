<template>
  <div class="set-select-coupon-model">
    <div class="scrollbar sscm-select-box">
      <el-form label-width="80px">
        <el-form-item label="已选">
          <el-tag v-for="(item,$index) in selectList" :key="$index">{{ item.cname }}</el-tag>
        </el-form-item>
      </el-form>
    </div>
    <div class="sscm-condition-box">
      <span class="sscm-coupon-type">
        <span class="sscm-text-1">活动类型 </span>
        <el-select v-model="searchParams.ctype" size="mini" placeholder="请选择" style="width: 200px;">
          <el-option v-for="item in [{value:0,label:'全部'},{value:1,label:'折扣券'},{value:2,label:'抵价劵'},{value:3,label:'礼品券'},]" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </span>
      <span class="sscm-coupon-name">
        <span class="sscm-text-1">活动名称 </span>
        <el-input v-model="searchParams.ctype.cname" size="mini" placeholder="请输入名称" style="width: 200px;" />
      </span>
      <el-button type="primary" size="mini" style="margin-left: 8px;" @click="onQuery">查询</el-button>
    </div>
    <div class="sscm-list-box">
      <el-table size="mini" :data="list" style="width: 100%" height="250" class="hdv-table">
        <el-table-column width="46">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.selected" @change="onSelect($event,scope.row)" />
          </template>
        </el-table-column>
        <el-table-column prop="cname" label="优惠券名称" show-overflow-tooltip />
        <el-table-column label="优惠内容" width="120" show-overflow-tooltip>
          <template slot-scope="scope">{{ handleshopRule(scope.row.ctype,scope.row.useRule,scope.row.denomination,scope.row.giftName) }}</template>
        </el-table-column>
        <el-table-column label="使用时间" show-overflow-tooltip>
          <template slot-scope="scope">{{ handletimeRule(scope.row.timeRule,scope.row.effectTime) }}</template>
        </el-table-column>
        <el-table-column label="使用场景" width="80">
          <template slot-scope="scope">{{ scope.row.shopRule ===1?'线上':'' || scope.row.shopRule ===2?'线下':'' || scope.row.shopRule ===3?'线上线下通用':'' }}</template>
        </el-table-column>
        <el-table-column label="适用门店" width="100">
          <template slot-scope="scope">{{ scope.row.productRule ===1?'全部门店':'' || scope.row.shopRule ===2?'部分门店':'' || scope.row.shopRule ===3?'部分门店不可用':'' }}</template>
        </el-table-column>
      </el-table>
    </div>
    <div class="sscm-page">
      <el-pagination background layout="prev, pager, next" :total="total" @current-change="currentChange" />
    </div>
  </div>
</template>
<script>
/**
   * 急忙求产出，不拆分了
   * Hurry to seek output, not to split !!!
   * Google translate
   */

import renovationService from '@/api/renovation'
import { handletimeRule, handleshopRule } from './utils'

export default {
  name: 'SetSelectCoupon',
  data() {
    return {
      list: [],
      selectList: [],
      total: null,
      searchParams: {
        beginTime: '',
        busType: 1,
        cname: '',
        ctype: 0,
        currentPage: 1,
        endTime: '',
        operatorType: 2,
        pageSize: 10
      }
    }
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    $verification() {
      const { item: { subType, max }, selectList } = this

      let flag = false

      if (subType === 'first' && _.size(selectList) > max) {
        flag = true
        this.$message.error(`优惠券最大限制${max}条`)
      }

      if (subType === 'second' && _.size(selectList) < 2 || _.size(selectList) > max) {
        flag = true
        this.$message.error(`优惠券最少2条，最大限制${max}条`)
      }

      if (subType === 'third' && _.size(selectList) < 6 || _.size(selectList) > max) {
        flag = true
        this.$message.error(`优惠券最少6条，最大限制${max}条`)
      }

      return flag || selectList
    },
    currentChange(v) {
      this.searchParams.currentPage = v
      this.getData()
    },
    onQuery() {
      this.searchParams.currentPage = 1
      this.getData()
    },
    onSelect(is, item) {
      if (is) {
        this.selectList.push(item)
      } else {
        this.selectList = _.reject(this.selectList, ['id', item.id])
      }
    },
    handleshopRule(ctype, useRule, denomination, giftName) {
      return handleshopRule(ctype, useRule, denomination, giftName)
    },
    // 使用日期
    handletimeRule(timeRule, effectTime) {
      return handletimeRule(timeRule, effectTime)
    },
    getData() {
      renovationService.getHomeCoupon(this.searchParams).then(res => {
        this.list = _.map(res.data.records, v => {
          return {
            ...v,
            selected: false
          }
        })

        this.total = res.data.total
      })
    }
  },
  watch: {},
  beforeCreate() {
  },
  created() {
    this.getData()
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
  components: {}
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .set-select-coupon-model {
    margin: -20px 0;
    .sscm-select-box {
      height: 84px;
      padding: 8px 0;
      overflow-y: scroll;
      background: #F2F2F6;
      .el-tag {
        margin-right: 8px;
      }
    }
    .sscm-condition-box {
      padding: 16px 0;
      .sscm-coupon-type {
        display: inline-block;
        margin-right: 12px;
      }
      .sscm-text-1 {
        font-size: 12px;
        color: #666;
        display: inline-block;
        margin-right: 6px;
      }
    }
    .sscm-page {
      text-align: right;
      padding-top: 16px;
    }
    .sscm-list-box {
      .hdv-table {
        table {
          thead {
            tr {
              th {
                height: 24px;
                background: #F1F8FF;
              }
            }
          }
        }
      }
    }
  }
</style>
