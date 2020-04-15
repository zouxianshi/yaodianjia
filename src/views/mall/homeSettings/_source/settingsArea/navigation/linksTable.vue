<template>
  <div class="select-link-model">
    <div class="slm-page-type">
      <el-radio-group v-model="pageType" size="small">
        <el-radio-button label="商城页面" />
        <el-radio-button label="活动页面" />
        <el-radio-button label="商品列表页" />
        <el-radio-button label="商品详情页" />
      </el-radio-group>
    </div>
    <div class="slm-page-content">
      <el-table :data="tableData" style="width: 100%" size="mini" class="scrollbar" height="calc(100vh - 208px)" @row-click="onRowClick">
        <el-table-column label="" width="50">
          <template slot-scope="scope">
            <el-radio v-model="selectId" :label="scope.row.id" />
          </template>
        </el-table-column>
        <el-table-column prop="date" label="日期" width="100" />
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="address" label="地址" />
      </el-table>
    </div>
    <div class="slm-page-ope">
      <el-button size="small" type="text">取消</el-button>
      <el-button type="primary" size="small">确定</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SelectLink',
  data() {
    return {
      pageType: '商城页面',
      selectId: 22,
      tableData: [
        {
          id: 22,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          id: 23,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ]
    }
  },
  props: {},
  methods: {
    onRowClick({ id }) {
      this.selectId = id
    }
  },
  watch: {},
  beforeCreate() {
  },
  created() {
  },
  beforeMount() {
  },
  mounted() {
  },
  beforeUpdate() {
  },
  updated() {
  },
  beforeDestroy() {
  },
  destroyed() {
  },
  computed: {},
  components: {}
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .select-link-model {
    .slm-page-type,.slm-page-content {
      padding: 0 20px;
    }
    .slm-page-content{
      overflow-y: scroll;
      margin: 20px 0;
      padding-right: 16px;
      .el-table thead th {
        height: 36px;
      }
    }
    .slm-page-ope {
      padding: 12px 20px;
      border-top: 1px solid #E5E5E5;
      text-align: right;
    }
  }
</style>
