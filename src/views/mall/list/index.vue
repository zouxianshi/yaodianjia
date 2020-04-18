<template>
  <div class="mall-list-model">
    <el-alert title="微页面新建上限为20个" type="warning" show-icon />
    <div style="margin: 16px 0;">
      <el-button type="primary" size="small" @click="() => $router.push('/mall/home-settings')">新建首页</el-button>
    </div>
    <div class="mlm-table-box">
      <el-table :data="list" style="width: 100%;" height="calc(100vh - 300px)">
        <el-table-column prop="name" label="标题">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}{{ scope.row.isUse === 1 ? '-这是首页' : '' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="modifyTime" label="最后修改时间" />
        <el-table-column prop="status" label="发布状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 1" type="success">已发布</el-tag>
            <el-tag v-if="scope.row.status === 0" type="danger">未发布</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300px">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="copyHome(scope.row)">复制</el-button>
            <el-button v-if="scope.row.isUse !== 1" type="primary" size="mini">编辑</el-button>
            <m-delete v-if="scope.row.isUse !== 1" :item="scope.row" @on-update="getData" />
            <el-button v-if="scope.row.isUse !== 1" type="primary" size="mini" @click="setStatus(scope.row)">{{ scope.row.status === 1 ? '取消发布' : '发布' }}</el-button>
            <el-button v-if="scope.row.isUse === 0 && scope.row.status === 1" type="primary" size="mini" @click="setHome(scope.row)">设为首页</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import mDelete from './_source/delete'
import { getMallList, setStatus, setHome, copyHome } from '@/api/mallService'
export default {
  name: 'Index',
  data() {
    return {
      list: [],
      visible: false
    }
  },
  props: {},
  methods: {
    copyHome({ id }) {
      copyHome({ id }).then(() => {
        this.getData()
        this.$message.success('复制成功')
      })
    },
    setHome({ id, status }) {
      setHome({ id, status }).then(() => {
        this.getData()
        this.$message.success('设为首页成功')
      })
    },
    setStatus({ id, status }) {
      setStatus({
        id,
        status: status === 1 ? 0 : 1
      }).then(() => {
        this.getData()
        this.$message.success('发布成功')
      })
    },
    getData() {
      getMallList().then(res => {
        this.list = res.data
      })
    }
  },
  watch: {},
  beforeCreate() {
  },
  created() {
    this.getData()
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
  components: { mDelete }
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
