<template>
  <div class="dashboard-container">
    <div class="app-container">
      <a href="#/marketing/activity/assemble-edit">
        <el-button
          class="btn btn-add"
          type="primary"
          size="small"
        >新建活动</el-button>
      </a>
      <section @keydown.enter="search()">
        <div class="search-form" style="margin-top:20px;margin-bottom:10px">
          <div class="search-item">
            <span class="label-name" style="width: 80px">活动名称</span>
            <el-input
              v-model.trim="searchForm.name"
              size="small"
              style="width: 200px"
              placeholder="请输入活动名称"
            />
          </div>
          <div class="search-item">
            <span class="label-name" style="width: 80px">活动店铺</span>
            <el-select
              v-model="searchForm.storeId"
              multiple
              size="small"
              filterable
              placeholder="全部"
              @change="search()"
            >
              <el-option v-for="(item,index) in storeList" :key="index" :label="item.stName" :value="item.id" />
            </el-select>
          </div>
          <div class="search-item">
            <span class="label-name" style="width: 80px">活动状态</span>
            <el-select
              v-model="searchForm.timeStatus"
              size="small"
              placeholder="全部"
              @change="search()"
            >
              <el-option label="全部" value="" />
              <el-option label="进行中" :value="1" />
              <el-option label="未开始" :value="0" />
              <el-option label="已结束" :value="2" />
            </el-select>
          </div>
          <div class="search-item">
            <el-button size="small" type="primary" @click="search()">查 询</el-button>
          </div>
        </div>
      </section>
      <section
        class="table-box webkit-scroll"
        style="height: calc(100% - 180px);overflow: auto"
      >
        <el-table v-loading="loading" :data="tableData" style="width: 100%">
          <el-table-column prop="id" label="活动编号" min-width="150" />
          <el-table-column prop="name" label="标题" min-width="150" />
          <el-table-column
            prop="startTime"
            label="活动开始时间"
            min-width="120"
            align="center"
          />
          <el-table-column
            prop="endTime"
            label="活动结束时间"
            min-width="120"
            align="center"
          />
          <el-table-column label="时间状态" min-width="80" align="center">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.schedule===0" size="small" type="info">未开始</el-tag>
              <el-tag v-else-if="scope.row.schedule===1" size="small" type="success">进行中</el-tag>
              <el-tag v-else size="small" type="danger">已结束</el-tag>
            </template>
          </el-table-column>
          <!-- <el-table-column label="状态" min-width="60" align="center">
            <template>
              <el-tag type="success" size="small">已生效</el-tag>
            </template>
          </el-table-column> -->
          <el-table-column label="操作" width="262">
            <template slot-scope="scope">
              <el-button v-if="scope.row.schedule===0" plain size="mini" @click="toEdit(scope.row)">编辑</el-button>
              <!-- <el-button v-if="scope.row.schedule===0||scope.row.schedule===1" plain size="mini" @click="toEdit(scope.row, 1)">查看数据</el-button> -->
              <template v-if="scope.row.schedule===0||scope.row.schedule===2">
                <el-button type="danger" size="mini" @click="handleDel(scope.row)">删除</el-button>
              </template>
              <product-kucun v-if="scope.row.schedule===1" :row-item="scope.row" />
            </template>
          </el-table-column>
        </el-table>
      </section>
      <section class="c-footer">
        <el-pagination
          background
          :current-page="pager.current"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="pager.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pager.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </section>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getAssembleList, delAssembleActivity } from '@/api/marketing'
import productKucun from './components/product-kucun'
import config from '@/utils/config'
import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
import { getStoreList } from '@/api/depot'
Vue.use(VueClipboard)
export default {
  components: {
    productKucun
  },
  data() {
    return {
      loading: false,
      searchForm: {
        name: '',
        storeId: '',
        timeStatus: '' // 活动.时间状态 int (-1: 未开始, 1: 进行中, 0: 已结束)
      },
      tableData: [],
      pager: {
        current: 1,
        size: 10,
        total: 0
      },
      dialogFormVisible: false,
      storeList: []
    }
  },
  computed: {
    ...mapGetters(['roles', 'merCode']),
    uploadFileUrl() {
      return `${this.uploadFileURL}`
    },
    headers() {
      return { Authorization: this.$store.getters.token }
    },
    merCode() {
      return this.$store.state.user.merCode || ''
    },
    upLoadUrl() {
      return `${this.uploadFileURL}/${config.merGoods}/1.0/file/_uploadImg?merCode=${this.merCode}`
    }
  },
  created() {
    this._loadStoreList() // 加载活动店铺
    this.fetchData()
  },
  methods: {
    // statusCupte(row) {
    //   const startTimestamp = Date.parse(new Date(row.startTime))
    //   const endTimestamp = Date.parse(new Date(row.endTime))
    //   const timestamp = Date.parse(new Date())
    //   if (timestamp < startTimestamp) {
    //     return 0
    //   } else if (timestamp > startTimestamp && timestamp < endTimestamp) {
    //     return 1
    //   } else if (timestamp > endTimestamp) {
    //     return 2
    //   }
    // },
    fetchData() {
      this._getTableData()
    },
    _loadStoreList() { // 加载门店列表
      const data = {
        searchKey: '',
        currentPage: 1,
        onlineStatus: 1,
        status: 1,
        pageSize: 9000
      }
      getStoreList(data).then(res => {
        const { data } = res.data
        data.unshift({ id: '', stName: '全部' })
        this.storeList = data
      }).catch(err => {
        console.log(err)
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pager.size = val
      this._getTableData()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.pager.current = val
      this._getTableData()
    },
    // 查询
    search() {
      this.pager = {
        current: 1,
        size: 10,
        total: 0
      }
      this._getTableData()
    },
    // 编辑
    toEdit(row) {
      this.$router.push('/marketing/activity/assemble-edit?id=' + row.id)
    },
    // 删除
    handleDel(row) {
      this.$confirm('确认删除吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this._delData(row.id)
      })
    },
    // 获取列表数据
    _getTableData() {
      const params = {
        type: this.searchForm.type,
        name: this.searchForm.name,
        currentPage: this.pager.current,
        pageSize: this.pager.size,
        storeId: Array.isArray(this.searchForm.storeId) ? this.searchForm.storeId.join(',') : '',
        schedule: this.searchForm.timeStatus
      }
      this.loading = true
      getAssembleList(params).then(res => {
        if (res.code === '10000') {
          this.tableData = res.data.data
          this.pager.total = res.data.totalCount || 0
        } else {
          this.$message({
            message: res.msg,
            type: 'error',
            duration: 5 * 1000
          })
        }
        this.loading = false
      }).catch(_ => {
        this.loading = false
      })
    },
    _delData(id) {
      const params = [`${id}`]
      delAssembleActivity(params).then(res => {
        if (res.code === '10000') {
          this.$message.success('已删除')
          // 更新列表
          this._getTableData()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 失效数据
    _disableData(id) {
      // const params = {
      //   id: id
      // }
    },
    handleClean() {
      // 清空活动库存
    }
  }
}
</script>
<style lang="scss">
.scope-img-wrap {
  width: 60px;
  height: 40px;
  background: #f5f5f5;
  margin: auto;
  img {
    width: 100%;
    height: 100%;
  }
}
.x-dialog-body {
  width: 100%;
  display: flex;
  .form-box {
    flex: 1;
  }
  .preview-box {
    flex: 0 0 250px;
    .title {
      font-size: 18px;
    }
    .prview-pic {
      margin-top: 20px;
      width: 100%;
      height: 450px;
    }
  }
  .test-1 {
    color: red;
  }
}

.note-grey {
  font-size: 14px;
  line-height: 1.1;
  color: #999999;
}
.table-footer{
    margin-top: 10px;
    display: flex;
    // justify-content: center
    justify-content: space-between;
}
.goods-info{
  display: flex;
  .goods-txt{
    margin-left: 10px;
    flex:1
  }
  .price{
    font-size: 18px;
    color: red
  }
}
 .custom-input{
      display: flex;
      .custom-input-box{
         border-top-right-radius: 0!important;
        border-bottom-right-radius: 0!important;
        border-right: none!important;
        &:focus{
          outline: none;
          border-color: #147de8;
        }
      }
      .operate{
        display: flex;
        flex-direction: column;
        margin-left: -12px;
        z-index: 3;
        width: 30px;
        align-items: center;
        background: #f5f7fa;
        border: 1px solid #dcdfe6;
        height: 32px;
         border-radius: 4px;
         border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        color: #909399;
        span{
          width: 100%;
          height: 50%;;
          text-align: center;
          &:last-child{
            border-top:1px solid #dcdfe6;
          }
        }
      }
    }
    .table-opeater{
      display: flex;
      align-items: center;
    }
</style>
