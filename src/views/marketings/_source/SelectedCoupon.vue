<template>
  <div class="selected-coupon-view">
    <el-table :data="selectedCoupons" height="250" style="width: 100%">
      <el-table-column prop="cname" label="优惠券名称" />
      <el-table-column label="优惠内容">
        <template
          slot-scope="scope"
        >{{ handleshopRule(scope.row.ctype,scope.row.useRule,scope.row.denomination) }}</template>
      </el-table-column>
      <el-table-column label="使用时间" show-overflow-tooltip>
        <template slot-scope="scope">{{ handletimeRule(scope.row.timeRule,scope.row.effectTime) }}</template>
      </el-table-column>
      <el-table-column label="使用场景" width="90">
        <template
          slot-scope="scope"
        >{{ scope.row.shopRule ===1?'线上':'' || scope.row.shopRule ===2?'线下':'' || scope.row.shopRule ===3?'线上线下通用':'' }}</template>
      </el-table-column>
      <el-table-column label="适用门店" width="100">
        <template
          slot-scope="scope"
        >{{ scope.row.productRule ===1?'全部门店':'' || scope.row.shopRule ===2?'部分门店':'' || scope.row.shopRule ===3?'部分门店不可用':'' }}</template>
      </el-table-column>
      <!-- <el-table-column label="券总数" width="100">
            <template slot-scope="scope">
              <div style="display:flex;align-items: center;">
                <el-input
                  v-model.number="scope.row.totalCoupons"
                  @change="onChangeCoupons($event,scope.row,scope.$index)"
                />
                <i class="el-icon-edit" />
              </div>
            </template>
      </el-table-column>-->
      <el-table-column label="发放张数" width="100">
        <template slot-scope="scope">
          <div style="display:flex;align-items: center;">
            <el-input
              v-model.number="scope.row.totalLimit"
              @change="onChangeLimit($event,scope.row,scope.$index)"
            />
            <i class="el-icon-edit" />
          </div>
        </template>
      </el-table-column>
      <!-- <el-table-column v-if="radio==='积分兑换'" label="所需积分" width="100">
            <template slot-scope="scope">
              <div style="display:flex;align-items: center;">
                <el-input
                  v-model.number="scope.row.totalNeed"
                  @change="onChangeNeed($event,scope.row,scope.$index)"
                />
                <i class="el-icon-edit" />
              </div>
            </template>
      </el-table-column>-->
      <!-- <el-table-column v-if="radio==='现金购买'" label="所需现金" width="100">
            <template slot-scope="scope">
              <div style="display:flex;align-items: center;">
                <el-input
                  v-model.number="scope.row.totalNeed"
                  @change="onChangeNeed($event,scope.row,scope.$index)"
                />
                <i class="el-icon-edit" />
              </div>
            </template>
      </el-table-column>-->
      <el-table-column v-if="pageStatus!=3" label="操作" width="60">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click.native.prevent="handleDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="pageInfo.currentPage"
      :page-size="pageInfo.pageSize"
      layout="prev, pager, next"
      :total="selectedCoupons.length"
      @current-change="handleSizeChange"
    />
    <div class="amTips">已选优惠券{{ selectedCoupons.length }}张</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pageStatus: 1, // 1.新增 2.编辑 3.查看(特殊：编辑时，未开始到开始)
      selectedCoupons: [],
      pageInfo: {
        currentPage: 1,
        pageSize: 5
      }
    }
  },
  methods: {
    show(selectedCoupons) {
      this.selectedCoupons = selectedCoupons
      console.log('应该要显示了')
    },
    showPage(selectedCoupons, pageStatus) {
      this.pageStatus = pageStatus
      this.selectedCoupons = selectedCoupons
    },
    handleDel(row) {
      this.$confirm('确认删除吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.selectedCoupons = this.selectedCoupons.filter(item => item !== row)
        this.$emit('onDel', this.selectedCoupons)
      })
    },
    onChangeLimit(event, row, $index) {
      // const { totalLimit } = row
      // this.$set(this.write[$index], 'totalLimit', totalLimit)
    },
    // 商品折扣处理
    handleshopRule(ctype, useRule, denomination) {
      if (ctype === 1) {
        if (useRule === 0) {
          return `无门槛，${denomination}折`
        } else {
          return `满${useRule}可用,${denomination}折`
        }
      } else if (ctype === 2) {
        if (useRule === 0) {
          return '无门槛，满减券'
        } else {
          return `满${useRule}可用,减${denomination}元`
        }
      } else {
        return '指定礼品'
      }
    },
    // 分页
    handleSizeChange(e) {
      this.pageInfo.currentPage = e
    },
    // 使用日期
    handletimeRule(timeRule, effectTime) {
      if (timeRule) {
        if (timeRule === 1) {
          return `自领取${effectTime}天有效`
        } else if (timeRule === 2) {
          return `自领取${effectTime.split(',')[0]}天有效,${
            effectTime.split(',')[1]
          }天失效`
        } else {
          return `${effectTime.split(',')[0]} - ${effectTime.split(',')[1]}`
        }
      }
    }
  }
}
</script>
<style lang="scss">
.selected-coupon-view {
  width: 700px;
  .el-pagination {
    text-align: right;
    margin-top: 15px;
  }
  .amTips {
    color: #606266;
  }
}
</style>
