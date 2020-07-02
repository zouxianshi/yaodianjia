<template>
  <div class="set-select-activity-model">
    <div class="sscm-condition-box">
      <span class="sscm-coupon-type">
        <span class="sscm-text-1">活动类型 </span>
        <el-select v-model="searchParams.actType" size="mini" placeholder="请选择" style="width: 120px;">
          <el-option v-for="item in [{value:null,label:'全部'},{value:11,label:'限时特惠'},{value:12,label:'限时秒杀'}]" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </span>
      <span class="sscm-coupon-name">
        <span class="sscm-text-1">活动名称 </span>
        <el-input v-model="searchParams.itemName" size="mini" placeholder="请输入商品名称/编码查询" style="width: 200px;" />
      </span>
      <el-button type="primary" size="mini" style="margin-left: 8px;" @click="onQuery">查询</el-button>
    </div>
    <div class="sscm-list-box">
      <el-table size="mini" :data="list" style="width: 100%" height="250" class="hdv-table">
        <el-table-column width="34">
          <template slot-scope="scope">
            <el-radio v-model="selectActivityId" :label="scope.row.activityId" />
          </template>
        </el-table-column>
        <el-table-column label="活动名称" prop="pmtName" />
        <el-table-column label="活动状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.validStatus === 0">未开始</el-tag>
            <el-tag v-if="scope.row.validStatus === 1" type="success">正在进行</el-tag>
            <el-tag v-if="scope.row.validStatus === 2" type="danger">已结束</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="活动时间" width="270">
          <template slot-scope="scope">
            <span>{{ scope.row.startTime }} - {{ scope.row.endTime }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="sscm-page">
      <el-pagination background layout="prev, pager, next" :total="totalCount" @current-change="currentChange" />
    </div>
  </div>
</template>
<script>
/**
 * 急忙求产出，不拆分了
 * Hurry to seek output, not to split !!!
 * Google translate
 */

import { mapState } from 'vuex'
import renovationService from '@/api/renovation'

export default {
  name: 'SetSelectCoupon',
  data() {
    return {
      list: [],
      totalCount: null,
      selectActivityId: null,
      searchParams: {
        actType: null,
        currentPage: 1,
        pageSize: 10,
        itemName: '',
        storeId: ''
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
      let flag = true
      if (!this.list.length) {
        flag = false
        this.$message.error('请选择活动')
      }

      if (flag) {
        return _.find(this.list, ['activityId', this.selectActivityId])
      }

      return flag ? _.find(this.list, ['activityId', this.selectActivityId]) : false
    },
    currentChange(v) {
      this.searchParams.currentPage = v
      this.getData()
    },
    onQuery() {
      this.searchParams.currentPage = 1
      this.getData()
    },
    getData() {
      renovationService.getHomePageAct({
        ...this.searchParams,
        storeId: this.centerStoreId
      }).then(res => {
        const { data, totalCount } = res.data
        this.list = data
        this.totalCount = totalCount
        if (this.list.length) {
          if (_.isEmpty(this.item.activityId)) {
            this.selectActivityId = _.head(this.list).activityId
          } else {
            this.selectActivityId = this.item.activityId
          }
        }
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
    ...mapState('mall', ['centerStoreId'])
  },
  components: {}
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .set-select-activity-model {
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
