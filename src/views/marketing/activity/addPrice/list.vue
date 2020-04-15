<template>
  <div class="dashboard-container">
    <div class="app-container">
      <a href="#/marketing/activity/aprice-create">
        <el-button class="btn btn-add" type="primary" size="small">新建活动</el-button>
      </a>
      <!-- 列表表单控件 -->
      <list-form @form-search="search" />
      <table-list :data="tableData" />
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
import tableList from './_source/table-list'

export default {
  components: {
    listForm,
    tableList
  },
  data() {
    return {
      searchForm: {}
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
