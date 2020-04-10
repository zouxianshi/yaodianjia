<template>
  <div class="dashboard-container">
    <div class="app-container">
      <a href="#/marketing/activity/assemble-edit">
        <el-button class="btn btn-add" type="primary" size="small">新建活动</el-button>
      </a>
      <!-- 列表表单控件 -->
      <list-form @form-search="search" />
      <section class="table-box webkit-scroll" style="height: calc(100% - 180px);overflow: auto">
        <el-table v-loading="this.activity.tabloading" :data="tableData" style="width: 100%">
          <template v-for="col in cols">
            <el-table-column v-if="!col.render" :key="col.prop" :formatter="formatter" :label="col.label" :show-overflow-tooltip="true" :prop="col.prop" :min-width="col.width" />
            <el-table-column v-else :key="col.prop" :label="col.label" :prop="col.prop">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.schedule===0" size="small" type="info">未开始</el-tag>
                <el-tag v-else-if="scope.row.schedule===1" size="small" type="success">进行中</el-tag>
                <el-tag v-else size="small" type="danger">已结束</el-tag>
              </template>
            </el-table-column>
          </template>
          <el-table-column label="操作" width="202">
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.schedule===0"
                plain
                size="mini"
                @click="toEdit(scope.row)"
              >编辑</el-button>
              <!-- <el-button v-if="scope.row.schedule===0||scope.row.schedule===1" plain size="mini" @click="toEdit(scope.row, 1)">查看数据</el-button> -->
              <template v-if="scope.row.schedule===0||scope.row.schedule===2">
                <el-button type="danger" size="mini" @click="handleDel(scope.row)">删除</el-button>
              </template>
              <!-- <product-kucun v-if="scope.row.schedule===1" :row-item="scope.row" /> -->
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
import { mapGetters, mapMutations } from 'vuex'
import { delAssembleActivity } from '@/api/marketing'
import listForm from '../_source/list-form'

export default {
  components: {
    listForm
  },
  data() {
    return {
      searchForm: {},
      cols: [
        {
          prop: 'id',
          label: '活动编号',
          width: '150'
        },
        {
          prop: 'activityType',
          label: '活动类型',
          width: '80'
        },
        {
          prop: 'name',
          label: '标题',
          width: '150'
        },
        {
          prop: 'startTime',
          label: '活动开始时间',
          width: '120',
          align: 'center'
        },
        {
          prop: 'endTime',
          label: '活动结束时间',
          width: '120',
          align: 'center'
        },
        {
          prop: 'schedule',
          label: '时间状态',
          width: '80',
          align: 'center',
          render: true
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['roles', 'merCode', 'activity']),
    merCode() {
      return this.$store.state.user.merCode || ''
    },
    tableData() {
      return this.activity.tablist
    },
    pager() {
      return this.activity.pager
    }
  },
  created() {
    // this._loadStoreList() // 加载活动店铺
    this.fetchData()
  },
  methods: {
    ...mapMutations({
      updatePager: 'activity/SET_TABLE_PAGATION'
    }),
    fetchData() {
      this._getTableData()
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.updatePager({
        size: val || 20
      })
      this._getTableData()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.pager.current = val
      this.updatePager({
        current: val
      })
      this._getTableData()
    },
    // 查询
    search(params) {
      console.log('search------', params)
      // 更新pager数据
      this.updatePager({
        current: 1,
        size: 10,
        total: 0
      })
      this.searchForm = { ...params }
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
        storeId: Array.isArray(this.searchForm.storeId)
          ? this.searchForm.storeId.join(',')
          : '',
        schedule: this.searchForm.timeStatus
      }
      this.$store.dispatch('activity/getTablist', params)
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
    formatter(row, column, cellValue) {
      if (column.property === 'activityType') {
        return '满减满赠'
      } else {
        return cellValue
      }
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
.table-footer {
  margin-top: 10px;
  display: flex;
  // justify-content: center
  justify-content: space-between;
}
.goods-info {
  display: flex;
  .goods-txt {
    margin-left: 10px;
    flex: 1;
  }
  .price {
    font-size: 18px;
    color: red;
  }
}
.custom-input {
  display: flex;
  .custom-input-box {
    border-top-right-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
    border-right: none !important;
    &:focus {
      outline: none;
      border-color: #147de8;
    }
  }
  .operate {
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
    span {
      width: 100%;
      height: 50%;
      text-align: center;
      &:last-child {
        border-top: 1px solid #dcdfe6;
      }
    }
  }
}
.table-opeater {
  display: flex;
  align-items: center;
}
</style>
