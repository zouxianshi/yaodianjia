<template>
  <el-dialog
    title="选择优惠券"
    :visible.sync="dialogVisible"
    width="70%"
    append-to-body
    :before-close="handleClose"
  >
    <div class="checkCoupon-model">
      <div class="search-form">
        <div class="search-item">
          <div class="search-item">
            <span class="label-name" style="width:100px">优惠券状态：</span>
            <el-select v-model="region" placeholder="活动区域">
              <el-option label="全部" value="1" />
              <el-option label="满减券" value="2" />
              <el-option label="折扣券" value="3" />
              <el-option label="礼品券" value="4" />
            </el-select>
          </div>
          <span class="label-name" style="width:100px">券名称：</span>
          <el-input v-model.trim="keyword" size="small" placeholder="请输入关键字" />
        </div>
        <div class="search-item">
          <el-button type="primary" size="small" @click="getList">查询</el-button>
        </div>
      </div>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        height="350"
        @selection-change="handleSelectionChange"
      >
        <el-table-column label="日期" width="120">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column prop="name" label="优惠券名称" />
        <el-table-column prop="address" label="适用商品" />
        <el-table-column prop="address" label="优惠内容" />
        <el-table-column prop="address" label="使用时间" show-overflow-tooltip />
        <el-table-column prop="address" label="使用场景" />
        <el-table-column prop="address" label="适用门店" />
        <el-table-column type="selection" width="55" />
      </el-table>
      <div class="block">
        <el-pagination
          :page-size="10"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="checkSure">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: 'CheckCoupon',
  components: {},
  props: {
    selectlist: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      dialogVisible: false,
      currentPage: 1,
      region: '1',
      keyword: '',
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎1',
          address: '上海市普陀区金沙江路 1518 弄1'
        },
        {
          date: '2016-05-04',
          name: '王小虎2',
          address: '上海市普陀区金沙江路 1517 弄2'
        },
        {
          date: '2016-05-01',
          name: '王小虎3',
          address: '上海市普陀区金沙江路 1519 弄3'
        }
      ],
      checklist: []
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
    handleClose() {
      this.dialogVisible = false
    },
    checkSure() {
      this.$emit('confincheck', this.checklist)
      this.$refs.multipleTable.clearSelection()
      this.dialogVisible = false
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    handleSelectionChange(val) {
      this.checklist = val
    },
    getList() {},
    defaultcheck(rows) {
      this.dialogVisible = true
      if (rows) {
        var name = []
        rows.map(item => {
          name.push(item.name)
        })
        this.$nextTick(() => {
          // this.$refs.multipleTable.clearSelection()
          this.tableData.forEach(row => {
            if (name.indexOf(row.name) >= 0) {
              this.$refs.multipleTable.toggleRowSelection(row, true)
            }
          })
        })
      }
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
.checkCoupon-model {
  .search-form {
    .search-item {
      .el-input {
        width: 180px;
      }
    }
  }
  .block {
    text-align: right;
    margin-top: 40px;
  }
}
</style>
