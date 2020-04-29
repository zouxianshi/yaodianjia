<template>
  <div class="app-container turntable-index-model">
    <el-button
      type="primary"
      size="mini"
      @click="() => $router.push({path:'/marketings/activity-manage/turntable/add'})"
    >新建活动</el-button>
    <div class="explain">
      <!-- <el-alert
        title="领券中心可自由上架及下架优惠券，领券中心的优惠上架后用户可手工领取，您可根据活动营销方案定期上架以保持用户活跃"
        type="warning"
        :closable="false"
      />-->
    </div>
    <div class="search-form">
      <div class="search-item">
        <div class="search-item">
          <span class="label-name" style="width:100px">状态：</span>
          <el-select v-model="region" placeholder="活动区域">
            <el-option label="全部" value="" />
            <el-option label="进行中" value="1" />
            <el-option label="未开始" value="2" />
            <el-option label="已结束" value="3" />
          </el-select>
        </div>
        <div class="search-item">
          <span class="label-name" style="width:100px">参与门店</span>
          <el-select v-model="region" placeholder="活动区域">
            <el-option label="全部" value="1" />
            <el-option label="未开始" value="2" />
            <el-option label="进行中" value="3" />
            <el-option label="已结束" value="4" />
            <el-option label="已删除" value="5" />
          </el-select>
        </div>
        <span class="label-name" style="width:100px">活动名称：</span>
        <el-input v-model.trim="keyword" size="small" placeholder="请输入关键字" />
      </div>
      <div class="search-item">
        <el-button type="primary" size="small">查询</el-button>
      </div>
      <div class="search-item">
        <!-- <el-button type="primary" size="small" @click="exportFun">
          导出
          <i class="el-icon-download el-icon--right" />
        </el-button>-->
      </div>
    </div>
    <el-table :data="tableData" style="width: 100%" empty-text="大转盘暂未上架任何活动">
      <el-table-column prop="date" label="活动类型" width="120">
        <template slot-scope="scope">
          <div>
            {{ scope.row.name }}
            <el-tag effect="dark" type="success" size="mini">满</el-tag>
          </div>
          <div>{{ scope.row.name }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="活动名称" />
      <el-table-column prop="name" label="活动方式" />
      <el-table-column prop="name" label="活动开始时间" />
      <el-table-column prop="name" label="活动结束时间" />
      <el-table-column prop="name" label="时间状态" />
      <el-table-column prop="name" label="状态" />
      <el-table-column fixed="right" label="操作" width="130">
        <template slot-scope="scope">
          <div style="display:flex">
            <el-button
              type="text"
              size="small"
              style="margin-right:5px"
              @click.native.prevent="deleteRow(scope.$index, tableData)"
            >查看</el-button>
            <el-select v-model="selectValue" placeholder="更多">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        :total="10"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script>
import _ from 'lodash'
import { normalActivityList } from '@/api/coupon'
import { mapGetters } from 'vuex'
export default {
  name: 'TurntableIndex',
  components: {},
  props: {},
  data() {
    return {
      searchParams: {
        activeName: '',
        activityTemplateCode: '',
        currentPage: 0,
        pageSize: 0,
        state: 0,
        storeCode: ''
      },
      selectValue: '',
      currentPage: 4,
      region: '1',
      radio: '全部',
      keyword: '',
      options: [
        {
          value: '选项1',
          label: '更多'
        },
        {
          value: '选项2',
          label: '编辑'
        },
        {
          value: '选项3',
          label: '删除'
        },
        {
          value: '选项4',
          label: '失效'
        }
      ],
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['merCode'])
  },
  watch: {},
  beforeCreate() {},
  created() {
    // this.searchParams =

    this.getData()
  },
  beforeMount() {},
  mounted() {
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    getData(searchParams) {
      const p = _.assign(this.searchParams, searchParams)
      normalActivityList(p).then(res => {
        console.log(res)
      })
    },
    deleteRow(index, rows) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          rows.splice(index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    changeOption(val) {
      console.log(val)
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  }

}
</script>

<style lang="scss" rel="stylesheet/scss">
.turntable-index-model {
  .explain {
    margin: 20px 0;
    font-size: 13px;
  }
  .el-table--medium th,
  .el-table--medium td {
    padding: 2px;
  }
  .el-table thead th {
    height: 50px;
  }
  .search-form {
    margin-top: 10px;
    .search-item {
      .el-input {
        width: 180px;
      }
    }
  }
  .block {
    margin-top: 30px;
  }
  .el-pagination {
    text-align: right;
  }
}
</style>
