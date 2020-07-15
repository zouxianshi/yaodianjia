<template>
  <div class="links-goods-model">
    <div class="lgm-conditions">
      <m-gt-conditions @on-conditions="_onConditions" />
    </div>
    <div v-loading="loading" class="lgm-list-box">
      <el-table :data="list" style="width: 100%" size="mini" class="scrollbar" height="calc(100vh - 304px)" @row-click="onRowClick">
        <el-table-column label="" width="50">
          <template slot-scope="scope">
            <el-radio v-model="linkUrl" :label="scope.row.linkAddress">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="商品名称" show-overflow-tooltip width="100" />
        <el-table-column prop="linkAddress" label="链接" show-overflow-tooltip />
      </el-table>
      <div class="lgm-pages">
        <el-pagination :current-page="searchParams.currentPage" :page-size="searchParams.pageSize" :total="totalCount" @current-change="onPage" />
      </div>
    </div>
  </div>
</template>
<script>
import { getActivityComm } from '@/api/mallService'
import mGtConditions from './gtConditions'
export default {
  name: 'LinksGoods',
  data() {
    return {
      loading: false,
      totalCount: null,
      list: [],
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
  model: {
    prop: 'linkUrl',
    event: 'onLinkUrlEvent'
  },
  props: {
    linkUrl: {
      type: String,
      default: ''
    }
  },

  methods: {
    onRowClick({ linkAddress }) {
      this.$emit('onLinkUrlEvent', linkAddress)
    },
    _onConditions(o) {
      this.searchParams = { ...this.searchParams, ...o }
      this.getData()
    },
    onPage(v) {
      this.searchParams.currentPage = v
      this.getData()
    },
    getData() {
      this.loading = true
      getActivityComm(this.searchParams).then(res => {
        const { data, totalCount } = res.data
        const { merCode } = this.$store.state.user
        this.totalCount = totalCount
        this.list = _.map(data, v => {
          const { commodityId, storeId, specId } = v
          return {
            ...v,
            linkAddress: `${this.h5Base}pages/details/index?productId=${commodityId}&storeId=${storeId}&merCode=${merCode}&specId=${specId}`
          }
        })
        this.loading = false
      }).catch(() => {
        this.loading = false
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
  computed: {},
  components: { mGtConditions }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .links-goods-model {
    .lgm-list-box {
      margin-top: 20px;
      .lgm-pages {
        text-align: right;
        margin-top: 16px;
      }
    }
  }
</style>
