<template>
  <div class="app-container activity">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="会员营销" name="members">
        <el-row gutter="20">
          <el-col v-for="o in 4" :key="o" :xs="12" :sm="8" :md="6">
            <card-item />
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="商品促销" name="goodsActivity">
        <el-row gutter="20">
          <el-col v-for="o in goodsActivity" :key="o.value" :xs="12" :sm="8" :md="6">
            <card-item :item="o" />
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="精彩活动" name="activity">精彩活动</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import cardItem from './components/card-item'
export default {
  components: { cardItem },
  data() {
    return {
      activeName: 'members',
      members: [], // 会员营销
      goodsActivity: [
        {
          value: 'reduceGift',
          lable: '满减满赠',
          desc: '满减送促销是在一定范围内的商品中选择某几个商品，当这些商品价格总值达到某一条件后可以享受一定的优惠，或由商品赠送某些赠品的促销手段。'
        }, {
          value: 'addPrice',
          lable: '加价购'
        }
      ], // 商品促销
      activity: [] // 精彩活动
    }
  },
  methods: {
    handleClick(val) {
      console.log('点击tab切换', val)
    }
  }
}
</script>

<style lang="scss">
.app-container.activity {
  background: #f7f7f7;
  padding: 0;
  .el-tabs__header {
    background: #fff;
    padding: 0 20px;
    padding-top: 40px;
  }
  .el-tabs__nav-wrap::after {
    height: 0;
  }
  .el-tabs__content {
    padding: 0 20px;
  }
}
</style>
