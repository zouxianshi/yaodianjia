<template>
  <div class="container">
    <h3>旗舰店</h3>
    <h6>旗舰店是连锁的最大且最为丰富齐全的一家营业店，旗舰店可为全国范围的会员提供最丰富的商品，且可提供<span style="color: #409eff">快递服务</span>的门门店</h6>
    <div style="padding-top: 5px;padding-bottom: 5px">
      <span class="label-name">设置旗舰店：</span>
      <span id="flagship-name">{{ flagShipName }}</span>
      <el-button type="text" @click="visable = true">选择门店</el-button>
    </div>
    <el-dialog
      append-to-body
      title="选择门店"
      :visible.sync="visable"
      width="800px"
      @close="dismiss"
    >
      <div style="margin-bottom: 10px">
        <el-input
          v-model="searchParams.searchKey"
          placeholder="门店编码/门店名称"
          prefix-icon="el-icon-search"
          style="width: 200px;margin-right: 5px"
        />
        <el-button type="primary" @click="getStore">查询</el-button>
      </div>
      <el-table :data="list" stripe height="250">
        <div slot="empty">
          当前无上线门店，先去维护<el-button type="text">上线门店</el-button>吧
        </div>
        <el-table-column property="stCode" label="门店编码" width="150" show-overflow-tooltip />
        <el-table-column label="门店名称" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-badge v-if="scope.row.centerStore === 1" value="旗舰店" class="item">
              <span>{{ scope.row.stName }}</span>
            </el-badge>
            <span v-else>{{ scope.row.stName }}</span>
          </template>
        </el-table-column>
        <el-table-column property="address" label="门店地址" show-overflow-tooltip />
        <el-table-column property="mobile" label="门店电话" show-overflow-tooltip />
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="setFlagship(scope.row)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pages">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="totalCount"
          :current-page="searchParams.currentPage"
          :page-size="searchParams.pageSize"
          @current-change="pageChange"
        />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  getFlagship,
  queryStore,
  addCenter
} from '../../api/chainSetting'
export default {
  name: 'Flagship',
  data() {
    return {
      visable: false,
      flagShipName: null,
      codeOrName: null,
      list: [],
      totalCount: 0,
      searchParams: {
        merCode: null,
        currentPage: 1,
        pageSize: 20,
        searchKey: null
      },
      loading: false
    }
  },
  methods: {
    getData() {
      getFlagship({
        merCode: this.merCode
      }).then(res => {
        if (res.code === '10000') {
          this.flagShipName = res.data.stName
        } else {
          this.$message({
            message: res.msg,
            type: 'error',
            duration: 5 * 1000
          })
        }
        console.log('res-1', res)
      })
    },
    getStore() {
      this.loading = true
      this.searchParams.onlineStatus = 1
      queryStore(this.searchParams).then(res => {
        if (res.code === '10000') {
          this.list = res.data.data
          this.totalCount = res.data.totalCount
          this.loading = false
        } else {
          this.loading = false
          this.$message({
            message: res.msg,
            type: 'error',
            duration: 5 * 1000
          })
        }
        console.log('res-2', this.list)
      })
    },
    setFlagship(row) {
      this.loading = true
      addCenter({
        stCode: row.stCode,
        merCode: this.merCode
      }).then(res => {
        if (res.code === '10000') {
          this.loading = false
          this.$message({
            message: '设置成功',
            type: 'success',
            duration: 5 * 1000
          })
          this.getData()
          this.getStore()
          this.visable = false
        } else {
          this.loading = false
          this.$message({
            message: res.msg,
            type: 'error',
            duration: 5 * 1000
          })
        }
        console.log('res-3', res.data)
      })
    },
    pageChange(currentPage) {
      this.searchParams.currentPage = currentPage
      this.getStore()
    },
    dismiss() {
      console.log('dddd')
    },
    onSelect() {
      this.visable = false
    }
  },
  computed: {
    ...mapGetters(['merCode'])
  },
  created() {
    this.searchParams.merCode = this.merCode
    this.getData()
    this.getStore()
  }
}
</script>

<style scoped>
  .container h3 {
    font-size: 22px;
    font-weight: 400;
    margin: 0 0 10px;
    color: #1f2d3d;
  }
  .container h6 {
    font-size: 14px;
    font-weight: 400;
    margin: 0 0 50px;
    color: #99a9bf;
  }
  #flagship-name {
    border-style: solid;
    border-width: 1px;
    border-color: #dddddd;
    border-radius: 2px;
    padding: 5px 10px;
    margin-right: 10px;
    font-size: 14px;
    font-weight: 400;
    color: #1f2d3d;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
  }
  .label-name {
    display: inline-block;
    margin-right: 10px;
    text-align: right;
    color: #999999;
    font-size: 14px;
  }
  .item {
    margin-top: 10px;
    margin-right: 40px;
  }
  .pages {
    text-align: right;
    padding-top: 20px;
    margin-right: -10px;
  }
</style>
