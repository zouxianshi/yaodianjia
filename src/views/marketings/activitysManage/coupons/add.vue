<template>
  <div class="add-model app-container">
    <el-radio-group v-model="radio" size="mini" @change="change">
      <el-radio-button label="免费领取" />
      <el-radio-button label="现金购买" />
      <el-radio-button label="积分兑换" />
    </el-radio-group>
    <div class="add-addItem-model">
      <span class="add-addLeft-model">选优惠券:</span>
      <div class="add-addRight-model">
        <el-button type="primary" size="mini" plain @click="dialogVisible = true">选择会员券</el-button>
        <div style="margin-top:10px">已选择6张优惠券</div>
      </div>
    </div>
    <div v-if="checkedit" class="add-addItem-model">
      <span class="add-addLeft-model">选择优惠券:</span>
      <div class="add-addRight-model">
        <el-table :data="selectList" height="250" style="width: 100%">
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
          <el-table-column v-if="radio==='所需积分'" label="所需积分" width="100">
            <template slot-scope="scope">
              <div style="display:flex;align-items: center;">
                <el-input v-model="scope.row.date" placeholder />
                <i class="el-icon-edit" />
              </div>
            </template>
          </el-table-column>
          <el-table-column v-if="radio==='所需现金'" label="所需现金" width="100">
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
                @click.native.prevent="deleteRow(scope.$index, selectList)"
              >移除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
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
    <el-button size="mini">取 消</el-button>
    <el-button type="primary" size="mini">确 定</el-button>
    <el-dialog
      title="选择优惠券"
      :visible.sync="dialogVisible"
      width="70%"
      append-to-body
      :before-close="handleClose"
    >
      <checkCoupon ref="checkCoupons" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="checkSure">确 定</el-button>
      </span>
    </el-dialog>
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
      dialogVisible: false,
      selectList: [],
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      value2: ''
    }
  },
  computed: {},
  watch: {
    selectList() {
      if (this.selectList.length === 0) {
        this.checkedit = false
      } else {
        this.checkedit = true
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
    handleClose() {
      this.dialogVisible = false
    },
    checkSure() {
      this.selectList = this.$refs.checkCoupons.selectlist
      this.dialogVisible = false
    },
    deleteRow(index, rows) {
      rows.splice(index, 1)
    },
    change() {}
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
    }
  }
}
</style>
