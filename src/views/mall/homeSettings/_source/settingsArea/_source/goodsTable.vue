<template>
  <div class="goods-table-model">
    <div class="gtm-conditions">
      <m-gt-conditions @on-conditions="_onConditions" />
    </div>
    <div v-loading="loading" class="gtm-content">
      <m-gt-list ref="gtList" :list="list" :item-list="activesData" @on-selects="_onSelects" />
      <div class="gtm-pages">
        <el-pagination :current-page="searchParams.currentPage" :page-size="searchParams.pageSize" :total="totalCount" @current-change="onPage" />
      </div>
      <el-divider content-position="left">已选数据</el-divider>
      <div class="gtm-tooltip">
        <el-alert :closable="false" title="*当前所选的商品会根据门店上架情况自动显示，按照添加顺序优先显示排在前面的商品" type="error" />
      </div>
      <div class="gtm-active">
        <div class="scrollbar gtm-active-box">
          <template v-for="(item,i) in activesData">
            <m-second-item v-if="isItem(item)" :key="i" source="sa-select-goods" :item="item" @on-delete="_onDelete" />
          </template>
        </div>
      </div>
    </div>
    <div class="gtm-ope">
      <el-button size="small" type="text" @click="$parent.closeDrawer()">取消</el-button>
      <el-button type="primary" size="small" @click="onSave">确定</el-button>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import mGtConditions from './gtConditions'
import mGtList from './gtList'
import { saIsId } from './utils'
import { getActivityComm } from '@/api/mallService'
import mSecondItem from './../../viewArea/commodity/secondItem'

export default {
  name: 'GoodsTable',
  data() {
    return {
      list: [],
      totalCount: null,
      loading: false,
      activesData: [],
      searchParams: {
        'brandName:': '',
        'groupId': '',
        'status': 1,
        'auditStatus': 1,
        'currentPage': 1,
        'pageSize': 10,
        'erpOrName': ''
      }
    }
  },
  props: {
    subType: {
      type: String,
      default: ''
    },
    itemList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    _onConditions(o) {
      this.searchParams = { ...this.searchParams, ...o }
      this.getData()
    },
    isItem(item) {
      return !_.isEmpty(item.specId)
    },
    onPage(v) {
      this.searchParams.currentPage = v
      this.getData()
    },
    _onDelete(item) {
      this.$refs.gtList.handlerClose(item, specId => {
        this.activesData = _.reject(this.activesData, ['specId', specId])
      })
    },
    _onSelects(v) {
      this.activesData = v
    },
    getData() {
      this.loading = true
      getActivityComm(this.searchParams).then(res => {
        const { data, totalCount } = res.data
        this.totalCount = totalCount
        if (this.activesData.length) {
          this.list = _.map(data, v => {
            return { ...v, select: saIsId(this.activesData, v.specId) }
          })
        } else {
          this.list = data
        }
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    async onSave() {
      const { subType, activesData } = this
      if (_.some(activesData, ['specId', ''])) {
        this.$message.error('请选择商品！')
        return
      }
      if (subType === 'first' && _.size(activesData) < 2) {
        this.$message.error('当前组件只能添加（2）个商品！')
        return
      }
      if (subType === 'second' && _.size(activesData) < 3) {
        this.$message.error('当前组件只能添加（3）个商品！')
        return
      }
      if (subType === 'third' && _.size(activesData) < 4) {
        this.$message.error('当前组件只能添加（4）个商品！')
        return
      }
      if (subType === 'four' && _.size(activesData) < 1) {
        this.$message.error('当前组件只能添加（1）个商品！')
        return
      }
      await this.$emit('on-update', activesData)
      this.$parent.closeDrawer()
    }
  },
  watch: {

  },
  beforeCreate() {
  },
  created() {
    this.searchParams.merCode = this.$store.getters.merCode
    console.log(this.itemList)
    this.activesData = _.reject(_.cloneDeep(this.itemList), v => !v.commodityId)
    console.log(this.activesData)
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
  components: { mGtConditions, mGtList, mSecondItem }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .goods-table-model {
    margin-top: -20px;
    .gtm-conditions,.gtm-content {
      padding: 0 20px;
    }
    .gtm-content{
      overflow-y: scroll;
      margin: 20px 0 10px 0;
      padding-right: 16px;
      height: calc(100vh - 174px);
      .gtm-active {
        width: 100%;
        justify-content: space-between;
        white-space: nowrap;
        overflow-y: hidden;
        overflow-x: scroll;
        display: flex;
        background: rgb(249, 249, 250);
        padding-top: 10px;
        border-radius:4px;
        &::-webkit-scrollbar{
          display: none;
        }
        .gtm-active-box {
          .c-second-item-model {
            float:none;
            display: inline-block;
          }
        }
      }
      .gtm-pages {
        text-align: center;
        margin-top: 10px;
        margin-bottom: -10px;
      }
      .el-table thead th {
        height: 36px;
      }
    }
    .gtm-ope {
      padding: 12px 20px 0px 20px;
      border-top: 1px solid #E5E5E5;
      text-align: right;
    }
    .gtm-tooltip {
      margin-bottom: 12px;
      margin-top: -8px;
    }
  }
</style>
