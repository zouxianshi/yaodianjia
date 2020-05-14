<template>
  <div class="message-model">
    <el-radio-group v-model="radio" size="mini">
      <el-radio-button label="卡券提醒" />
      <el-radio-button label="订单提醒" />
      <el-radio-button label="活动消息" />
    </el-radio-group>
    <div class="message-warning">
      <el-alert
        title="模板消息推送功能可以通过微信公众号，给顾客或商家推送交易和物流相关的提醒消息，以提升顾客的购物体验，获得更高的订单转化率和复购率。"
        type="warning"
      />
    </div>
    <div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column fixed prop="date" label="消息模板类型" width="200" />
        <el-table-co prop="name" label="推送消息" />
        <el-table-column prop="province" label="模板编号" />
        <el-table-column prop="city" label="消息标题" />
        <el-table-column prop="address" label="页面跳转" />
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
    </div>
  </div>
</template>
<script>
export default {
  name: 'Message',
  props: {},
  data() {
    return {
      radio: '卡券提醒',
      tableData: [
        {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },
        {
          date: '2016-05-08',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },
        {
          date: '2016-05-06',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },
        {
          date: '2016-05-07',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
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
    deleteRow(index, rows) {
      rows.splice(index, 1)
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
.message-model {
  height: calc(100vh - 250px);
  overflow-y: scroll;
  .message-warning {
    margin: 20px 0;
  }
}
</style>
