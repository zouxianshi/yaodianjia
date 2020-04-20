<template>
  <div class="add-model app-container">
    <el-radio-group v-model="radio" size="mini" @change="change">
      <el-radio-button label="免费领取" />
      <el-radio-button label="现金购买" />
      <el-radio-button label="积分兑换" />
    </el-radio-group>
    <div class="add-addItem-model">
      <span class="add-addLeft-model">领取时间:</span>
      <div class="add-addRight-model">
        <el-date-picker
          v-model="value1"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </div>
    </div>
    <div class="add-addItem-model">
      <span class="add-addLeft-model">选优惠券:</span>
      <div class="add-addRight-model">
        <el-button type="primary" size="mini" plain @click="handlecheck">选择会员券</el-button>
        <div style="margin-top:10px">已选择6张优惠券</div>
      </div>
    </div>
    <div v-show="checkedit" class="add-addItem-model">
      <span class="add-addLeft-model">选择优惠券:</span>
      <div class="add-addRight-model">
        <el-table :data="selectlist" height="250" style="width: 100%">
          <el-table-column prop="date" label="优惠券名称" />
          <el-table-column prop="name" label="优惠内容" />
          <el-table-column prop="date" label="使用时间" />
          <el-table-column prop="date" label="使用场景" />
          <el-table-column prop="name" label="适用门店" />
          <el-table-column label="券总数" width="100">
            <template slot-scope="scope">
              <div style="display:flex;align-items: center;">
                <el-input v-model="scope.row.date" placeholder />
                <i class="el-icon-edit" />
              </div>
            </template>
          </el-table-column>
          <el-table-column label="每人限领（张）" width="100">
            <template slot-scope="scope">
              <div style="display:flex;align-items: center;">
                <el-input v-model="scope.row.date" placeholder />
                <i class="el-icon-edit" />
              </div>
            </template>
          </el-table-column>
          <el-table-column v-if="radio==='积分兑换'" label="所需积分" width="130">
            <template slot-scope="scope">
              <div style="display:flex;align-items: center;">
                <el-input v-model.number="scope.row.date" type="number" placeholder />
                <i class="el-icon-edit" />
              </div>
            </template>
          </el-table-column>
          <el-table-column v-if="radio==='现金购买'" label="所需现金" width="100">
            <template slot-scope="scope">
              <div style="display:flex;align-items: center;">
                <el-input v-model="scope.row.date" placeholder />
                <i class="el-icon-edit" />
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click.native.prevent="deleteRow(scope.$index, selectlist)"
              >移除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-button size="mini">取 消</el-button>
    <el-button type="primary" size="mini">确 定</el-button>
    <checkCoupon ref="checkCoupons" @confincheck="confincheck" />
  </div>
</template>
<script>
import checkCoupon from './_source/checkCoupon'
export default {
  name: 'Add',
  components: {
    checkCoupon: checkCoupon
  },
  props: {},
  data() {
    return {
      checkedit: false,
      radio: '免费领取',
      selectlist: [
        {
          date: '2016-05-02',
          name: '王小虎1',
          address: '上海市普陀区金沙江路 1518 弄1'
        }
      ],
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      value2: ''
    }
  },
  computed: {},
  watch: {
    selectlist() {
      if (this.selectlist) {
        this.$nextTick(() => {
          console.log(this.selectlist)
          if (this.selectlist.length === 0) {
            this.checkedit = false
          } else {
            this.checkedit = true
          }
        })
      }
    }
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    handlecheck() {
      this.$refs.checkCoupons.defaultcheck(this.selectlist)
    },
    confincheck(val) {
      this.selectlist = val
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
    change() {}
    // handlechange(val) {
    //   console.log(val)
    //   this.selectlist = val
    // }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
.add-model {
  .add-addItem-model {
    margin: 40px 0;
    font-size: 14px;
    .add-addLeft-model {
      display: inline-block;
      vertical-align: top;
      width: 80px;
      margin: 0px 40px 0px 0px;
    }
    .add-addRight-model {
      display: inline-block;
      .el-table--medium th, .el-table--medium td {
        padding: 0px
      }
      .el-icon-edit {
        color: #147de8;
      }
    }
  }
}
</style>
