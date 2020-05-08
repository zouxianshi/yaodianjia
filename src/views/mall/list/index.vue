<template>
  <div class="mall-list-model">
    <el-alert title="微页面新建上限为20个" type="warning" show-icon />
    <div style="margin: 16px 0;">
      <el-button type="primary" size="small" :disabled="list.length > 19" @click="() => $router.push('/mall/home-settings')">新建首页</el-button>
    </div>
    <div v-loading="loading" class="mlm-table-box">
      <el-table :data="list" style="width: 100%;" height="calc(100vh - 300px)">
        <el-table-column prop="name" label="模板名称">
          <template slot-scope="scope">
            <span>{{ scope.row.name }} <i v-if="scope.row.isUse === 1" class="el-icon-s-home" style="color: #147de8" /></span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="商城名称">
          <template slot-scope="scope">
            <span>{{ scope.row.title || '-' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="modifyTime" label="最后修改时间" />
        <el-table-column label="操作" width="140">
          <template slot-scope="scope">
            <el-button type="text" @click="onPreview(scope.row)">预览</el-button>
            <span style="padding: 0 10px;color:#999">|</span>
            <el-dropdown @command="onDropdown($event,scope.row)">
              <span class="el-dropdown-link" style="color: #147de8;">
                更多<i class="el-icon-arrow-down el-icon--right" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="copy">
                  <el-button type="text">复制</el-button>
                </el-dropdown-item>
                <el-dropdown-item command="edit">
                  <el-button type="text">编辑</el-button>
                </el-dropdown-item>
                <el-dropdown-item command="delete">
                  <el-button type="text" :disabled="scope.row.isUse === 1">删除</el-button>
                </el-dropdown-item>
                <el-dropdown-item command="setHome">
                  <el-button type="text" :disabled="scope.row.isUse !== 0">设为首页</el-button>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <!--<el-button type="primary" size="mini" @click="onPreview(scope.row)">预览</el-button>
            <el-button type="primary" size="mini" @click="copyHome(scope.row)">复制</el-button>
            <el-button type="primary" size="mini" @click="() => $router.push(`/mall/home-settings/${scope.row.id}`)">编辑</el-button>
            <m-delete v-if="scope.row.isUse !== 1" :item="scope.row" @on-update="getData" />
            <el-button v-if="scope.row.isUse === 0 && scope.row.status === 1" type="primary" size="mini" @click="setHome(scope.row)">设为首页</el-button>-->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="效果预览" append-to-body :visible.sync="isPreview" width="740px">
      <m-preview v-if="isPreview" :dimension-id="dimensionId" @on-close="() => isPreview = false" />
    </el-dialog>
  </div>
</template>
<script>
import { delMallHome } from '@/api/mallService'
import mPreview from './../homeSettings/_source/_source/preview'
import { getMallList, setStatus, setHome, copyHome } from '@/api/mallService'
export default {
  name: 'Index',
  data() {
    return {
      list: [],
      visible: false,
      loading: false,
      isPreview: false,
      dimensionId: null
    }
  },
  props: {},
  methods: {

    onDropdown(v, item) {
      switch (v) {
        case 'copy':
          this.copyHome(item)
          break
        case 'edit':
          this.$router.push(`/mall/home-settings/${item.id}`)
          break
        case 'delete':
          if (item.isUse !== 1) {
            this.onDelete(item)
          }
          break
        case 'setHome':
          if (item.isUse !== 1) {
            this.setHome(item)
          }
          break
      }
    },
    onDelete({ id }) {
      this.$confirm('确认删除吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delMallHome(id).then(() => {
          this.$message.success('删除成功！')
          this.getData()
        }).catch(() => {
        })
      })
    },
    onPreview({ id }) {
      this.dimensionId = id
      this.isPreview = true
    },
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
      this.loading = true
      getMallList().then(res => {
        this.list = res.data
        setTimeout(() => {
          this.loading = false
        }, 800)
      }).catch(() => {
        this.loading = false
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
  components: { mPreview }
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
