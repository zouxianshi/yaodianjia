<template>
  <div style="position:relative;width: 96%;margin: 20px auto 0;">
    <div class="expenses-record-model">
      <div class="list-owner">
        会员：张三
      </div>
      <div class="list-body">
        <el-table
          :data="tableData"
          border
          style="width: 100%"
        >
          <el-table-column
            prop="conDate"
            label="消费时间"
          />
          <el-table-column
            prop="conList"
            label="商品清单"
          />
          <el-table-column
            prop="price"
            label="单价"
          />
          <el-table-column
            prop="num"
            label="数量"
          />
          <el-table-column
            prop="conType"
            label="消费类型"
          />
          <el-table-column
            prop="conChannel"
            label="消费渠道/门店"
          />
          <el-table-column
            prop="total"
            label="消费金额"
          />
        </el-table>
      </div>
      <div class="pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="1000"
        />
      </div>
    </div>
    <div class="return-btn"><el-button size="mini">返回列表</el-button></div>
  </div>
</template>
<script>
export default {
  name: 'ExpensesRecord',
  components: {},
  props: {},
  data() {
    return {
      tableData: [{
        conDate: '2016-05-02',
        conList: `鸿洋神牌维生素C咀嚼片(菠萝味)/艾褓佳 \n 复方金银花颗粒/德菲尔10g*10袋`,
        price: `￥20.00 \n ￥19.00`,
        num: `1 \n 1`,
        conType: '线下消费',
        conChannel: '五矿点',
        total: '￥39.00'
      }, {
        conDate: '2016-05-02',
        conList: `鸿洋神牌维生素C咀嚼片(菠萝味)/艾褓佳 \n 复方金银花颗粒/德菲尔10g*10袋`,
        price: `￥20.00 \n ￥19.00`,
        num: `1 \n 1`,
        conType: '线下消费',
        conChannel: '五矿点',
        total: '￥39.00'
      }, {
        conDate: '2016-05-02',
        conList: `鸿洋神牌维生素C咀嚼片(菠萝味)/艾褓佳 \n 复方金银花颗粒/德菲尔10g*10袋`,
        price: `￥20.00 \n ￥19.00`,
        num: `1 \n 1`,
        conType: '线下消费',
        conChannel: '五矿点',
        total: '￥39.00'
      }]
    }
  },
  methods: {}
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .expenses-record-model {
    background-color: #fff;height: calc(100vh - 300px);border-radius: 6px;
    position: relative;padding-bottom: 42px;
    .list-owner{
      text-align: right;height: 40px;line-height: 40px;padding: 0 32px;
    }
    .list-body{
      width: 96%;margin: 0 auto;
    }
    .pagination{
      text-align: right;position: absolute;bottom: 10px;right: 1%;
    }
  }
  .return-btn{
    position: fixed;z-index: 2000;bottom: 35px;transform: translateX(50px);
  }
</style>
