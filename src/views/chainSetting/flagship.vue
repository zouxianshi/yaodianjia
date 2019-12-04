<template>
  <div class="container">
    <h3>旗舰店</h3>
    <!--    <h6>旗舰店是连锁的最大且最为丰富齐全的一家营业店，旗舰店可为全国范围的会员提供最丰富的商品，且可提供<span style="color: #409eff">快递服务</span>的门店</h6>-->
    <el-alert
      type="info"
      :closable="false"
      style="line-height:20px"
    >
      旗舰店是可提供快递服务的一家线上中心营业店，可为全国范围的会员提供最丰富的商品，旗舰店必须设置，且只有一个。<br>
      旗舰店和非旗舰店的区别:<br>
      1.旗舰店：提供B2C服务，固定在商城首页，用户默认进入该门店。<br>
      2.非旗舰店：提供o2o服务，用户可就近选择非旗舰店门店购物，享受快捷的配送及自提服务。
    </el-alert>
    <!--<h6 style="line-height: 20px">
      旗舰店是可提供快递服务的一家线上中心营业店，可为全国范围的会员提供最丰富的商品，旗舰店必须设置，且只有一个。<br><br>
      旗舰店和非旗舰店的区别:<br>
      1.旗舰店：提供B2C服务，固定在商城首页，用户默认进入该门店。<br>
      2.非旗舰店：提供o2o服务，用户可就近选择非旗舰店门店购物，享受快捷的配送及自提服务。
    </h6>-->
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
      :close-on-click-modal="false"
      @close="dismiss"
    >
      <div style="margin-bottom: 10px">
        <el-input
          v-model="searchParams.searchKey"
          placeholder="门店编码/门店名称"
          prefix-icon="el-icon-search"
          style="width: 200px;margin-right: 5px"
        />
        <el-button type="primary" @click="onSearch">查询</el-button>
      </div>
      <el-table :data="list" stripe height="250">
        <div slot="empty">
          当前无上线门店，先去维护<el-button type="text" @click="toStoreSetting">上线门店</el-button>吧
        </div>
        <el-table-column property="stCode" label="门店编码" width="150" show-overflow-tooltip />
        <el-table-column label="门店名称">
          <template slot-scope="scope">
            <el-badge v-if="scope.row.centerStore === 1" value="旗舰店" class="item">
              <span>{{ scope.row.stName }}</span>
              <!--              <span>说的是大三大萨达萨达撒打撒大撒的萨达萨达撒</span>-->
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
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount"
          :current-page="searchParams.currentPage"
          :page-size="searchParams.pageSize"
          @size-change="pageSizeChange"
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
        searchKey: null,
        status: 1
      },
      loading: false
    }
  },
  computed: {
    ...mapGetters(['merCode'])
  },
  created() {
    this.searchParams.merCode = this.merCode
    this.getData()
    this.getStore()
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
    onSearch() {
      this.searchParams.currentPage = 1
      this.getStore()
    },
    getStore() {
      this.loading = true
      this.searchParams.onlineStatus = 1
      this.searchParams.isdelivery = 1
      queryStore(this.searchParams).then(res => {
        if (res.code === '10000') {
          this.list = res.data.data
          this.totalCount = res.data.totalCount
          this.loading = false
          if (!this.list) {
            this.searchParams.currentPage = 1
          }
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
    pageSizeChange(pageSize) {
      this.searchParams.pageSize = pageSize
      this.getStore()
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
    },
    toStoreSetting() {
      this.$router.push({ path: '/storeSetting/setting' })
    }
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
