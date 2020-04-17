<template>
  <div class="app-container coupons-index-model">
    <el-button
      type="primary"
      size="mini"
      @click="() => $router.push({ path: '/marketings/activity-manage/coupons/add' })"
    >添加优惠券</el-button>
    <div class="explain">
      <el-alert title="领券中心可自由上架及下架优惠券，领券中心的优惠上架后用户可手工领取，您可根据活动营销方案定期上架以保持用户活跃" type="warning" :closable="false" />
    </div>
    <div class="search-form">
      <div class="search-item">
        <div class="search-item">
          <span class="label-name" style="width:100px">优惠券状态：</span>
          <el-select v-model="region" placeholder="活动区域">
            <el-option label="全部" value="1" />
            <el-option label="未开始" value="2" />
            <el-option label="进行中" value="3" />
            <el-option label="已结束" value="4" />
            <el-option label="已删除" value="5" />
          </el-select>
        </div>
        <span class="label-name" style="width:100px">优惠券名称：</span>
        <el-input v-model.trim="keyword" size="small" placeholder="请输入关键字" />
      </div>
      <div class="search-item">
        <el-button type="primary" size="small" @click="getList">查询</el-button>
      </div>
      <div class="search-item">
        <el-button type="primary" size="small" @click="exportFun">
          导出
          <i class="el-icon-download el-icon--right" />
        </el-button>
      </div>
    </div>
    <div style="margin-bottom:20px">
      <el-radio-group v-model="radio" size="mini" @change="changeOption">
        <el-radio-button label="全部" />
        <el-radio-button label="免费领取" />
        <el-radio-button label="积分兑换" />
        <el-radio-button label="现金购买" />
      </el-radio-group>
    </div>
    <el-table :data="tableData" style="width: 100%" empty-text="领券中心暂未上架任何优惠券">
      <el-table-column prop="date" label="优惠券信息" width="120">
        <template slot-scope="scope">
          <div>
            {{ scope.row.name }}
            <el-tag effect="dark" type="success" size="mini">满</el-tag>
          </div>
          <div>{{ scope.row.name }}</div>
        </template>
      </el-table-column>
      <el-table-column v-if="radio === '全部'" prop="name" label="领取方式" />
      <el-table-column prop="name" label="券总数" />
      <el-table-column prop="name" label="使用时间" />
      <el-table-column prop="name" label="优惠内容" />
      <el-table-column prop="name" label="限额" />
      <el-table-column v-if="radio === '积分兑换'" prop="name" label="所需积分" />
      <el-table-column v-if="radio === '现金购买'" prop="name" label="所需现金" />
      <el-table-column prop="name" label="领券时间" />
      <el-table-column prop="name" label="活动状态" />
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click.native.prevent="deleteRow(scope.$index, tableData)"
          >移除</el-button>
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
export default {
  name: 'CouponsIndex',
  components: {},
  props: {},
  data() {
    return {
      currentPage: 4,
      region: '1',
      radio: '全部',
      keyword: '',
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
  computed: {},
  watch: {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    getList() {
      console.log('查')
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
    },
    exportFun() {}
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
.coupons-index-model {
  .explain {
    margin: 20px 0;
    font-size: 13px;
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
