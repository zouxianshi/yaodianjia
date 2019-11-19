<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-button class="btn btn-add" type="primary" size="small" @click.stop="handleAdd()">新建活动</el-button>
      <section @keydown.enter="search()">
        <div class="search-form" style="margin-top:20px;margin-bottom:10px">
          <div class="search-item">
            <span class="label-name" style="width: 80px">活动类型</span>
            <el-select
              v-model="searchForm.type"
              size="small"
              placeholder="全部"
              @change="search()"
            >
              <el-option label="全部" value="" />
              <el-option label="电子DM单" :value="0" />
              <el-option label="限时优惠" :value="1" />
            </el-select>
          </div>
          <div class="search-item">
            <span class="label-name" style="width: 80px">活动名称</span>
            <el-input v-model.trim="searchForm.name" size="small" style="width: 200px" />
          </div>
          <div class="search-item">
            <span class="label-name" style="width: 80px">活动状态</span>
            <el-select
              v-model="searchForm.status"
              size="small"
              placeholder="全部"
              @change="search()"
            >
              <el-option label="进行中" value="" />
              <el-option label="未开始" :value="0" />
              <el-option label="已开始" :value="1" />
            </el-select>
          </div>
          <div class="search-item">
            <span class="label-name">有效时间</span>
            <el-date-picker
              v-model="searchForm.dateRange"
              size="small"
              type="datetimerange"
              value-format="yyyy-MM-dd HH:mm:ss"
              range-separator="至"
              :default-time="['00:00:00','23:59:59']"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              @change="handleTimeChange($event, 1)"
            />
          </div>
          <div class="search-item">
            <el-button size="small" @click="search()">查 询</el-button>
          </div>
        </div>
      </section>
      <section class="table-box">
        <el-table :data="tableData" style="width: 100%" size="small">
          <el-table-column prop="startTime" label="活动类型" min-width="80" />
          <el-table-column prop="startTime" label="标题" min-width="150" />
          <el-table-column prop="startTime" label="活动开始时间" min-width="120" align="center" />
          <el-table-column prop="endTime" label="活动结束时间" min-width="120" align="center" />
          <el-table-column label="时间状态" min-width="80" align="center">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.status=='1'" size="small">进行中</el-tag>
              <el-tag v-if="scope.row.status=='0'" size="small" type="info">未开始</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="状态" min-width="60" align="center">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.status=='1'" size="small">正常</el-tag>
              <el-tag v-if="scope.row.status=='0'" size="small" type="info">停用</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" min-width="220">
            <template slot-scope="scope">
              <el-button plain size="mini" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button plain size="mini" @click="handleEdit(scope.row)">复制链接</el-button>
              <!-- <el-button plain size="mini" @click="handleChangeStatus(scope.row)">查看</el-button> -->
              <el-button type="danger" size="mini" @click="handleDel(scope.row)">删除</el-button>
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
import {
  getActivityList
} from '@/api/marketing'
import config from '@/utils/config'

export default {
  name: 'Banner',
  data() {
    return {
      searchForm: {
        type: '',
        name: '',
        startTime: '',
        endTime: '',
        status: ''
      },
      tableData: [],
      pager: {
        current: 1,
        size: 10,
        total: 0
      },
      dialogFormVisible: false
    }
  },
  computed: {
    ...mapGetters(['roles', 'merCode']),
    uploadFileUrl() {
      return `${this.uploadFileURL}`
    },
    headers() {
      return { 'Authorization': this.$store.getters.token }
    },
    merCode() {
      return this.$store.state.user.merCode || ''
    },
    upLoadUrl() {
      return `${this.uploadFileURL}/${config.merGoods}/1.0/file/_upload?merCode=${this.merCode}`
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this._getTableData()
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
    handleTimeChange(val, type) {
      console.log(val, type)
      if (type === 1) {
        // 搜索栏
        if (val && val.length === 2) {
          this.searchForm.timeBeg = val[0]
          this.searchForm.timeEnd = val[1]
          this.search()
        } else {
          this.searchForm.timeBeg = ''
          this.searchForm.timeEnd = ''
        }
      } else if (type === 2) {
        // dialog
        if (val && val.length === 2) {
          this.xForm.startTime = val[0]
          this.xForm.endTime = val[1]
        } else {
          this.xForm.startTime = ''
          this.xForm.endTime = ''
        }
      }
    },
    // 查询
    search() {
      this._getTableData()
    },
    // 获取列表数据
    _getTableData() {
      const params = {
        type: 10,
        name: '',
        maxStartTime: '',
        minStartTime: '',
        status: '',
        currentPage: this.pager.currentPage,
        pageSize: this.pager.size

      }
      getActivityList(params).then(res => {
        if (res.code === '10000') {
          this.tableData = res.data.data || []
          this.pager.total = res.data.totalCount
        } else {
          this.$message({
            message: res.msg,
            type: 'error',
            duration: 5 * 1000
          })
        }
      })
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
</style>
