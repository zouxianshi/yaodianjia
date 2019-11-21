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
              <el-option label="电子DM单" :value="10" />
              <el-option label="限时优惠" :value="11" />
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
              <el-option label="进行中" :value="1" />
              <el-option label="未开始" :value="0" />
              <el-option label="已结束" :value="-1" />
            </el-select>
          </div>
          <div class="search-item">
            <span class="label-name">有效时间</span>
            <el-date-picker
              v-model="searchForm.timeBeg"
              size="small"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="开始时间"
              @change="handleTimeChange($event, 1)"
            /> -
            <el-date-picker
              v-model="searchForm.timeEnd"
              size="small"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="结束时间"
              @change="handleTimeChange($event, 2)"
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
        type: '', // 活动类型 (10: 电子DM单, 11: 限时特惠, 12: 限时秒杀)
        name: '',
        startTime: '',
        endTime: '',
        timeStatus: ''
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
      if (type === 1 || type === 2) { // 搜索栏 1.开始时间 2.结束时间
        if (!val) {
          type === 1 ? this.searchForm.timeBeg = '' : this.searchForm.timeEnd = ''
        } else {
          console.log('this.searchForm', this.searchForm)
          if (this.searchForm.timeBeg && this.searchForm.timeEnd && this.searchForm.timeBeg !== '' && this.searchForm.timeEnd !== '') {
            // 比较时间
            const start = this.searchForm.timeBeg.replace(/[- :]/g, '')
            const end = this.searchForm.timeEnd.replace(/[- :]/g, '')
            if (parseInt(start) > parseInt(end)) {
              this.$message('结束时间必须大于开始时间')
              type === 1 ? this.searchForm.timeBeg = '' : this.searchForm.timeEnd = ''
              return
            }
          }
        }
        this.search()
        // if (this.searchForm.timeBeg !== '' && this.searchForm.timeEnd !== '') {
        //   this.search()
        // } else {
        //   this.searchForm.timeBeg = ''
        //   this.searchForm.timeEnd = ''
        // }
      } else if (type === 3) { // dialog
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
        type: this.searchForm.type,
        name: this.searchForm.name,
        minStartTime: this.searchForm.startTime,
        maxStartTime: this.searchForm.endTime,
        timeStatus: this.searchForm.timeStatus,
        currentPage: this.pager.current,
        pageSize: this.pager.size

      }
      console.log('params', params)
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
