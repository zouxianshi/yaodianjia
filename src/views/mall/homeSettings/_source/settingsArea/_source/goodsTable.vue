<template>
  <div class="goods-table-model">
    <div class="gtm-conditions">
      <el-select v-model="value" placeholder="商品分组" size="mini" style="width: 160px;">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-input placeholder="商品品牌" size="mini" style="width: 214px;" />
      <el-input placeholder="商品编码/名称" size="mini" style="width: 214px;" />
      <el-button type="primary" size="mini">查询</el-button>
    </div>
    <div class="gtm-content">
      <el-table :data="tableData" :row-key="getRowKeys" style="width: 100%" size="mini" class="scrollbar" height="calc(100vh - 258px)">
        <el-table-column :reserve-selection="true" type="selection" width="55" />
        <el-table-column label="" width="50">
          <template>sadsadad</template>
        </el-table-column>
        <el-table-column prop="date" label="日期" width="100" />
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="address" label="地址" />
      </el-table>
      <div class="gtm-pages">
        <el-pagination :current-page="4" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400" />
      </div>
    </div>
    <div class="gtm-ope">
      <el-button size="small" type="text">取消</el-button>
      <el-button type="primary" size="small">确定</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'GoodsTable',
  data() {
    return {
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      value: '',
      tableData: [
        {
          id: 22,
          photo: '-',
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          id: 23,
          photo: '-',
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ]
    }
  },
  props: {},
  methods: {
    getRowKeys(row) {
      return row.id
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
  .goods-table-model {
    .gtm-conditions,.gtm-content {
      padding: 0 20px;
    }
    .gtm-content{
      overflow-y: scroll;
      margin: 20px 0;
      padding-right: 16px;
      height: calc(100vh - 208px);
      .gtm-pages {
        text-align: center;
        margin-top: 16px;
      }
      .el-table thead th {
        height: 36px;
      }
    }
    .gtm-ope {
      padding: 12px 20px;
      border-top: 1px solid #E5E5E5;
      text-align: right;
    }
  }
</style>
