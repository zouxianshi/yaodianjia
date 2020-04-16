<template>
  <div class="mall-list-model">
    <el-alert title="微页面新建上限为20个" type="warning" show-icon />
    <div style="margin: 16px 0;">
      <el-button type="primary" size="small" @click="() => $router.push('/mall/home-settings')">新建首页</el-button>
    </div>
    <div class="mlm-table-box">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="标题" />
        <el-table-column prop="date" label="最后修改时间" />
        <el-table-column prop="date" label="发布状态">
          <template>
            <el-tag type="success">已发布</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300px">
          <template>
            <!--slot-scope="scope"-->
            <el-button type="primary" size="mini">复制</el-button>
            <el-button type="primary" size="mini">编辑</el-button>
            <el-button type="primary" size="mini">删除</el-button>
            <el-button type="primary" size="mini">取消发布</el-button>
            <el-button type="primary" size="mini">设为首页</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Index',
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  props: {},
  methods: {},
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
  .mall-list-model {
    padding: 20px;
    .mlm-table-box {
      .el-button {
        margin-right: -10px;
        padding-left: 8px;
        padding-right: 8px;
      }
    }
  }
</style>
