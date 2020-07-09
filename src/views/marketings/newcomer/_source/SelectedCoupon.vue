<template>
  <div class="selected-coupon-view">
    <el-table height="250" style="width: 100%" :data="selectedCoupons">
      <el-table-column label="优惠券类型">
        <template slot-scope="scope">
          {{ scope.row.ctype === 1 ? '折扣券' : scope.row.ctype === 2 ? '满减券' : '礼品券' }}
        </template>
      </el-table-column>
      <el-table-column prop="cname" label="优惠券名称" show-overflow-tooltip />
      <el-table-column label="优惠内容" width="120" show-overflow-tooltip>
        <template
          slot-scope="scope"
        >{{ handleshopRule(scope.row.ctype,scope.row.useRule,scope.row.denomination,scope.row.giftName,scope.row.cname) }}</template>
      </el-table-column>
      <el-table-column label="使用时间" show-overflow-tooltip>
        <template slot-scope="scope">{{ handletimeRule(scope.row.timeRule,scope.row.effectTime) }}</template>
      </el-table-column>
      <el-table-column label="使用场景">
        <template
          slot-scope="scope"
        >{{ scope.row.sceneRule ===1?'线上':'' || scope.row.sceneRule ===2?'线下':'' || scope.row.sceneRule ===3?'线上线下通用':'' }}</template>
      </el-table-column>
      <el-table-column label="适用门店" width="120">
        <template
          slot-scope="scope"
        >{{ scope.row.shopRule ===1?'全部门店':'' || scope.row.shopRule ===2?'部分门店':'' || scope.row.shopRule ===3?'部分门店不可用':'' }}</template>
      </el-table-column>
      <el-table-column label="适用商品" width="120">
        <template
          slot-scope="scope"
        >{{ scope.row.productRule ===1?'全部商品':'部分商品可用' }}</template>
      </el-table-column>
      <el-table-column label="每人发放数量" width="120">
        <template slot-scope="scope">
          <div style="display:flex;align-items: center;">
            <el-input-number
              v-model="scope.row.giftNum"
              style="width: 80px"
              :controls="false"
              :precision="0"
              size="mini"
              :min="1"
              :max="9999"
              label="请输入发放张数"
              @change="onChangeLimit($event, scope.row)"
            />
            <i class="el-icon-edit" />
          </div>
        </template>
      </el-table-column>
      <el-table-column v-if="pageStatus!=3" label="操作" width="60">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click.native.prevent="handleDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pageStatus: 1, // 1.新增 2.编辑 3.查看(特殊：编辑时，未开始到开始)
      selectedCoupons: []
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
      this.selectedCoupons.forEach(item => {
        item.giftNum = item.giftNum || 1
      })
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
    onChangeLimit($event, item) {
      this.$nextTick(() => {
        item.giftNum = $event || 1
      })
    },
    // 商品折扣处理
    handleshopRule(ctype, useRule, denomination, giftName, cname) {
      if (ctype === 1) {
        if (useRule === 0) {
          return `无门槛，${denomination}折`
        } else {
          return `满${useRule}可用,${denomination}折`
        }
      } else if (ctype === 2) {
        if (useRule === 0) {
          return `无门槛，减${denomination}`
        } else {
          return `满${useRule}可用,减${denomination}元`
        }
      } else if (ctype === 3) {
        return `${cname}`
      } else {
        if (giftName === 'null' || null) {
          return ''
        } else {
          return giftName
        }
      }
    },
    // 使用日期
    handletimeRule(timeRule, effectTime) {
      if (timeRule) {
        if (timeRule === 1) {
          return `自领取起${effectTime}天内有效`
        } else if (timeRule === 2) {
          return `自领取${effectTime.split(',')[0]}天后生效,生效后${
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
