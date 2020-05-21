<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-button class="btn btn-add" type="primary" size="small" @click="jumpeCreateUrl">新建活动</el-button>
      <!-- 列表表单控件 -->
      <list-form @form-search="search" />
      <section class="table-box webkit-scroll" style="height: calc(100% - 180px);overflow: auto">
        <el-table v-loading="loading" :data="tableData" style="width: 100%">
          <template v-for="col in cols">
            <el-table-column
              v-if="!col.render"
              :key="col.prop"
              :formatter="formatter"
              :label="col.label"
              :show-overflow-tooltip="true"
              :prop="col.prop"
              :width="col.width"
              :align="col.align"
            />
            <el-table-column
              v-else-if="col.prop==='validStatus'"
              :key="col.prop"
              :label="col.label"
              :width="col.width"
              :prop="col.prop"
            >
              <template slot-scope="scope">
                <el-tag v-if="scope.row.validStatus===0" size="small" type="info">未开始</el-tag>
                <el-tag v-else-if="scope.row.validStatus===1" size="small" type="success">进行中</el-tag>
                <el-tag v-else size="small" type="danger">已结束</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              v-else-if="col.prop==='status'"
              :key="col.prop"
              :label="col.label"
              :width="col.width"
              :prop="col.prop"
            >
              <template slot="header" slot-scope="scope">
                <span>{{ scope.column.label }}</span>
              </template>
              <template slot-scope="scope">
                <el-tag v-if="!!scope.row.status" size="small" type="primary">已生效</el-tag>
                <el-tag v-else size="small" type="danger">已失效</el-tag>
              </template>
            </el-table-column>
          </template>
          <el-table-column label="未生效数据" width="100" align="center">
            <template slot-scope="scope">
              <el-tag v-if="!!scope.row.errorPath" size="small" type="warning">
                <!-- v-if="!!scope.row.errorPath" -->
                <a :href="configOrderOss(scope.row.errorPath)" download>查看数据</a>
              </el-tag>
              <span v-else>无</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="180" align="center" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" @click="toLook(scope.row)">查看</el-button>
              <el-divider direction="vertical" />
              <el-dropdown trigger="hover" @command="handleCommand">
                <span class="el-dropdown-link">
                  更多
                  <i class="el-icon-arrow-down el-icon--right" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <!-- 拼团活动的编辑活动库存按钮进行中且为生效 -->
                  <el-dropdown-item
                    v-if="scope.row.validStatus === 1 && type==='13' && scope.row.status"
                  >
                    <product-kucun :row-item="scope.row" />
                  </el-dropdown-item>
                  <!-- 失效：进行中且不失效 -->
                  <el-dropdown-item
                    :command="{id: scope.row.id, type: 'end', disabled: scope.row.validStatus !==1 || !scope.row.status}"
                  >
                    <el-button
                      :disabled=" scope.row.validStatus !==1 || !scope.row.status"
                      type="text"
                    >失效</el-button>
                  </el-dropdown-item>
                  <!-- <el-dropdown-item
                    v-if="type === '14'"
                    :command="{id: scope.row.id, type: 'extend', disabled: (scope.row.validStatus ===2 || !scope.row.status)}"
                  >
                    <el-button
                      :disabled="scope.row.validStatus ===2 || !scope.row.status"
                      type="text"
                    >推广设置</el-button>
                  </el-dropdown-item> -->
                  <el-dropdown-item
                    :command="{id: scope.row.id, type: 'edit', disabled: scope.row.validStatus !== 0 || !scope.row.status}"
                  >
                    <!-- 失效或者结束不可编辑 -->
                    <el-button
                      type="text"
                      :disabled="scope.row.validStatus !== 0 || !scope.row.status"
                    >编辑</el-button>
                  </el-dropdown-item>
                  <!-- 禁止删除：状态为进行中的且为生效的 -->
                  <el-dropdown-item
                    :command="{id: scope.row.id, type: 'del', disabled: scope.row.validStatus ===1 && scope.row.status}"
                  >
                    <el-button
                      :disabled=" scope.row.validStatus ===1 && scope.row.status"
                      type="text"
                    >删除</el-button>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
          <div slot="empty">
            <no-data />
          </div>
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
    <!-- 推广设置 -->
    <acform ref="activityAcform" @complete="fetchData()" />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { delActInfo, endActInfo } from '@/api/activity'
import listForm from './_source/list-form'
import noData from '@/components/NoData'
import productKucun from './assemble/components/product-kucun'
import acform from './reduce-gift/_source/actform'

export default {
  components: {
    listForm,
    noData,
    productKucun,
    acform
  },
  data() {
    return {
      searchForm: {},
      cols: [
        // {
        //   prop: 'id',
        //   label: '活动编号',
        //   width: '150'
        // },
        {
          prop: 'activityType',
          label: '活动类型',
          width: '120'
        },
        {
          prop: 'pmtName',
          label: '活动名称'
        },
        {
          prop: 'countStore',
          label: '参与门店',
          width: '150',
          align: 'center'
        },
        {
          prop: 'startTime',
          label: '活动开始时间',
          width: '200',
          align: 'center'
        },
        {
          prop: 'endTime',
          label: '活动结束时间',
          width: '200',
          align: 'center'
        },
        {
          prop: 'validStatus',
          label: '时间状态',
          width: '120',
          // align: 'center',
          render: true
        },
        {
          prop: 'status',
          label: '状态',
          width: '120',
          align: 'center',
          render: true
        }
      ],
      promotionType: [
        {
          id: '11',
          label: '限时特惠',
          createUrl: '/marketing/activity/limit-edit?l_type=11',
          name: 'LimitEdit'
        },
        {
          id: '12',
          label: '限时秒杀',
          createUrl: '/marketing/activity/limit-edit?l_type=12',
          name: 'LimitEdit'
        },
        {
          id: '13',
          label: '拼团',
          createUrl: '/marketing/activity/assemble-edit',
          name: 'AssembleEdit'
        },
        {
          id: '14',
          label: '满减满赠',
          createUrl: '/marketing/activity/reduce-gift-list-edit',
          name: 'ReduceGift'
        },
        {
          id: '15',
          label: '加价购',
          createUrl: '/marketing/activity/aprice-edit',
          name: 'AddPriceCreate'
        }
      ],
      createdUrl: '',
      promotionTypeLable: '',
      type: ''
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
    },
    loading() {
      return this.activity.tabloading
    }
  },
  watch: {
    $route() {
      this.type = this.$route.query.params
    }
  },
  created() {
    console.log('this.$router--------', this.$route)
    const filterType = this.promotionType.filter(
      item => item.id === this.$route.params.type
    )
    this.createdUrl =
      Array.isArray(filterType) && filterType.length
        ? filterType[0].createUrl
        : ''
    this.name =
      Array.isArray(filterType) && filterType.length ? filterType[0].name : ''
    this.promotionTypeLable =
      Array.isArray(filterType) && filterType.length ? filterType[0].label : ''
    this.type = this.$route.params.type || ''
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
        size: val
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
        size: 20,
        total: 0
      })
      this.searchForm = { ...params }
      this._getTableData()
    },
    // 查看
    toLook(row) {
      this.$store.dispatch('tagsView/delCachedView', {
        name: this.name
      })
      setTimeout(() => {
        if (this.type === '11' || this.type === '12') {
          this.$router.push(`${this.createdUrl}&id=${row.id}&_ck=1`)
        } else {
          this.$router.push(`${this.createdUrl}?id=${row.id}&_ck=1`)
        }
      }, 0)
    },
    // 编辑
    toEdit(row) {
      this.$store.dispatch('tagsView/delCachedView', {
        name: this.name
      })
      setTimeout(() => {
        console.log('111111111', this.$router, this.createdUrl)
        if (this.type === '11' || this.type === '12') {
          this.$router.push(`${this.createdUrl}&id=${row}`)
        } else {
          this.$router.push(`${this.createdUrl}?id=${row}`)
        }
      }, 0)
    },
    // 删除
    handleDel(id) {
      this.$confirm('确认删除吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this._delData(id)
      })
    },
    // 失效操作
    endActivity(id) {
      this.$confirm('确认将此活动设置为失效状态吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        endActInfo(id).then(res => {
          if (res.code === '10000') {
            this.$message.success('设置成功')
            // 更新列表
            this._getTableData()
          } else {
            this.$message.error(res.msg)
          }
        })
        console.log('此活动已失效')
        this._getTableData()
      })
    },
    /**
     * 推广设置：进行中已生效  未开始已生效 均可编辑
       查看：所有阶段均可查看
       编辑：未开始且生效状态可编辑
       删除：除进行中已生效外都可删除
       失效：进行中已生效的才可以失效；
     */
    handleCommand(val) {
      if (val) {
        if (val.type === 'edit' && !val.disabled) {
          console.log('handleComang----', val)
          this.toEdit(val.id)
        } else if (val.type === 'end' && !val.disabled) {
          this.endActivity(val.id)
        } else if (val.type === 'failList' && !val.disabled) {
          console.log('失败列表-----&&&&&&&')
          // this.endActivity(val.id)
        } else if (val.type === 'extend' && !val.disabled) {
          this.$refs.activityAcform.open(val.id)
        } else if (val.type === 'del' && !val.disabled) {
          this.handleDel(val.id)
        }
      }
    },

    // 获取列表数据
    _getTableData() {
      const params = {
        promotionType: this.$route.params.type,
        pmtName: this.searchForm.pmtName,
        currentPage: this.pager.current,
        pageSize: this.pager.size,
        storeId: this.searchForm.storeId,
        validStatus: this.searchForm.validStatus,
        isStoreCount: true // 是否需要统计门店数量，true-需要，false或不传-不需要
      }
      this.$store.dispatch('activity/getTablist', params)
    },
    _delData(id) {
      const params = [`${id}`]
      delActInfo(params).then(res => {
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
        return this.promotionTypeLable
      } else {
        return cellValue
      }
    },
    jumpeCreateUrl() {
      this.$store.dispatch('tagsView/delCachedView', {
        name: this.name
      })
      setTimeout(() => {
        this.$router.push(this.createdUrl)
      }, 0)
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
.dashboard-container {
  .table-box {
    .el-dropdown-link {
      color: #147de8;
    }
  }
}
</style>
