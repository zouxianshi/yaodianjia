<template>
  <div class="content_pick">
    <div class="top-container">
      <div class="input-container">
        <el-input
          v-model="storeName"
          placeholder="输入门店名称、编码搜索"
          prefix-icon="el-icon-search"
          style="width:300px;"
        />
        <el-button
          v-loading="query"
          type="primary"
          class="search"
          @click="getStoreData('search')"
        >搜索</el-button>
      </div>
      <div class="nav-btn">
        <el-button
          type="primary"
          size="mini"
          @click="toAdd()"
        >添加提货门店</el-button>
      </div>
    </div>
    <div class="tabel-content">
      <el-table :data="shopData" border style="width: 100%">
        <el-table-column prop="storeName" label="提货门店名称" />
        <el-table-column prop="storeCode" label="门店编码" />
        <el-table-column prop="storeAddress" label="门店地址" />
        <el-table-column prop="phoneNumber" label="电话号码" />
        <el-table-column label="操作" align="center" width="160">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="updataStore(scope.row.id)"
            >编辑</el-button>
            <el-button
              v-if="scope.row.status == 0"
              type="primary"
              size="mini"
              @click="changePointStatus(scope.row.id, scope.row.status)"
            >启用</el-button>
            <el-button
              v-else
              type="info"
              size="mini"
              @click="changePointStatus(scope.row.id, scope.row.status)"
            >停用</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page-box">
      <el-pagination
        :current-page="pageInfo.currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageInfo.total"
        @size-change="changePageSize"
        @current-change="changeIndex"
      />
    </div>
  </div>
</template>

<script>
import distributionService from '@/api/distributionService'
export default {
  data() {
    return {
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      shopData: [],
      storeName: '',
      query: false
    }
  },
  created() {
    this.getStoreData('init')
  },
  methods: {
    // 分页切换
    changePageSize(pageSize) {
      this.pageInfo.pageSize = pageSize
      this.pageInfo.currentPage = 1
      this.getStoreData('init')
    },
    changeIndex(index) {
      this.pageInfo.currentPage = index
      this.getStoreData('init')
    },
    getStoreData(status) {
      this.query = true
      var parmes = {
        isStoreList: 1
      }
      parmes.currentPage = status === 'init' ? this.pageInfo.currentPage : 1
      parmes.pageSize = this.pageInfo.pageSize
      parmes.storeName = this.storeName
      distributionService.getPointerList(parmes).then(res => {
        if (res.data) {
          var result = res.data
          this.pageInfo.total = result.totalCount
          this.shopData = result.data
        }
        this.query = false
      })
    },
    changePointStatus(id, status) {
      // 修改 停、启用
      var params = {
        id: id,
        status: status === 1 ? '0' : '1'
      }
      distributionService._batchPoint(params).then(res => {
        this.$message({
          message: res.msg,
          type: 'success'
        })
        this.getStoreData('init')
      })
    },
    toAdd() {
      this.$router.push('/distribution/add-point')
    },
    updataStore(ids) {
      this.$router.push(`/distribution/updata-point?id=${ids}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.content_pick {
  padding: 10px 21px;
  height: calc(100vh - 158px);
  overflow-y: scroll;
  .top-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 20px 0;
    .input-container {
      display: flex;
      flex-direction: row;
      .search {
        margin-left: 20px;
      }
    }
    .nav-btn {
      text-align: right;
      height: 40px;
      line-height: 40px;
    }
  }

  .page-box {
    height: 40px;
    line-height: 40px;
    margin-top: 21px;
    text-align: right;
  }
}
</style>
