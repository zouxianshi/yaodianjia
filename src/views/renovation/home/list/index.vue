<template>
  <div class="index-model">
    <section class="list-operate">
      <div>
        <el-button type="primary" plain="" size="small" @click="handleBatchDel">批量删除</el-button>
        <el-button type="primary" plain size="small">批量修改分享信息</el-button>
      </div>
      <el-button type="primary" size="small">新建首页</el-button>
    </section>
    <section class="table-box webkit-scroll">
      <el-table
        v-loading="loading"
        :data="tableData"
        height="calc(100vh - 350px)"
        size="small"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column label="页面标题" min-width="180" align="center">
          <template slot-scope="scope">
            <span v-text="scope.row.title" />
            <el-tag v-if="scope.row.isUse===1" type="warning"><span class="el-icon-s-home" /> 当前页</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="模板名称" min-width="180" align="center" />
        <el-table-column label="最后修改时间" prop="modifyTime" min-width="120" align="center" />
        <el-table-column label="操作" fixed="right" align="center" min-width="190">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" plain @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="primary" plain @click="handlePreview(scope.row)">预览</el-button>
            <el-dropdown @command="handleCommand">
              <el-button type="primary" size="mini" plain>
                更多<i class="el-icon-arrow-down el-icon--right" />
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-if="scope.row.isUse===0" :command="{type:'home',data:scope.row}">设置为主页</el-dropdown-item>
                <el-dropdown-item :command="{type:'set',data:scope.row}">页面设置</el-dropdown-item>
                <el-dropdown-item :command="{type:'copy',data:scope.row}">复制</el-dropdown-item>
                <el-dropdown-item v-if="scope.row.isUse===0" :command="{type:'dele',data:scope.row}">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </section>
    <el-dialog title="效果预览" append-to-body="" :close-on-click-modal="false" width="400px" :visible.sync="previewShow">
      <preview />
    </el-dialog>
    <el-dialog title="页面设置" append-to-body="" :close-on-click-modal="false" width="500px" :visible.sync="visible">
      <Form ref="baseform" :info="formData" />
      <span slot="footer">
        <el-button size="small">取消</el-button>
        <el-button size="small" type="primary">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Preview from './_source/preview'
import RenovationService from '@/api/renovation'
import Form from './_source/form'
export default {
  name: 'HomeListIndex',
  components: { Preview, Form },
  data() {
    return {
      loading: false,
      tableData: [],
      previewShow: false,
      visible: false,
      multipleSelection: [],
      formData: {}
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /**
     *
     * @description  获取首页列表数据
     *
     */
    async getList() {
      try {
        const { data } = await RenovationService.getHomeList()
        this.tableData = data
      } catch (error) {
        console.log(error)
      }
    },
    //  点击更多 点击菜单项触发的事件回调
    handleCommand({ type, data }) {
      switch (type) {
        case 'home':

          break
        case 'set':
          break
        case 'copy':
          break
        default:
          this._Delete([data.id])
          break
      }
    },
    handleEdit(row) {
      this.visible = true
      this.$nextTick(_ => {
        this.$refs.baseform.initData(row)
      })
    },
    handlePreview() {

    },
    // 设置为首页模板
    async _SetHome() {
      await RenovationService.setHomeTem()
      this.$message({
        message: '设置成功',
        type: 'success'
      })
      this.getList()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleBatchDel() { // 批量删除
      if (this.multipleSelection.length === 0) {
        this.$message({
          message: '请选择你要删除的数据',
          type: 'warning'
        })
        return
      }
      const data = []
      this.multipleSelection.map(v => {
        data.push(v.id)
      })
      this._Delete(data)
    },
    _Delete(data) {
      this.$confirm(`是否确认删除`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await RenovationService.batchDelete(data)
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.getList()
      }).catch(() => {
        console.log('取消删除')
      })
    }
  },
  watch: {}
}
</script>

<style lang="scss" scoped>
  .index-model {
    background: #fff;
    padding: 24px 29px;
    .list-operate{
      display: flex;
      justify-content: space-between;
    }
  }
</style>
