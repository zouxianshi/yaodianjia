<template>
  <div class="app-container">
    <div class="group-wrapper">
      <el-alert
        title="商家可根据自身要求，自定义多个分组，适用于不同节日的营销设置不同的商城分组导航分组"
        type="warning"
        :closable="false"
      />
      <div style="margin-top:10px">
        <el-button
          type="primary"
          size="small"
          @click="handleAddType"
        >新建分组维度</el-button>
      </div>
      <div class="table-box">
        <el-table
          :data="tableData"
          style="width: 100%"
        >
          <el-table-column
            prop="date"
            label="序号"
            type="index"
            width="60"
          />
          <el-table-column
            prop="name"
            label="分组标题"
            min-width="130"
          >
            <template slot-scope="scope">
              <div class="desc">
                <span v-text="scope.row.name" />
                <i class="el-icon-edit" @click="handleEditType(scope.row)" />
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="childNum"
            label="子分类数"
          />
          <el-table-column
            prop="createName"
            label="创建人"
          />
          <el-table-column
            prop="createTime"
            label="创建时间"
            min-width="130"
          />
          <el-table-column
            prop="modifyName"
            min-width="130"
            label="修改人"
          />
          <el-table-column
            prop="modifyTime"
            label="修改时间"
            min-width="130"
          />
          <el-table-column
            prop="address"
            label="状态"
          >
            <template slot-scope="scope">
              <el-tag v-if="scope.row.useStatus===1" type="success" size="mini">启用</el-tag>
              <el-tag v-else type="info" size="mini">停用</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="130">
            <template slot-scope="scope">
              <a :href="`#/goods-manage/group-create/${scope.row.id}?name=${scope.row.name}`">
                <el-button type="" size="mini">编辑</el-button>
              </a>
              <el-button v-if="scope.row.useStatus!==1" type="success" size="mini" @click="handleChangeStatau(scope.row)">启用</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- <pagination
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getList"
      /> -->
    </div>
    <el-dialog
      :title="modalForm.id?'编辑分组':'新建分组'"
      append-to-body
      :close-on-click-modal="false"
      width="30%"
      :visible.sync="dialogVisible"
    >
      <div class="modal-body">
        <el-form
          ref="modalForm"
          :model="modalForm"
          :rules="rules"
          label-width="80px"
          :status-icon="true"
          size="small"
        >
          <el-form-item
            label="分组名称"
            prop="name"
          >
            <el-input
              v-model="modalForm.name"
              placeholder="输入分组名称"
            />
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer">
        <el-button
          type=""
          size="small"
          @click="dialogVisible=false"
        >取 消</el-button>
        <el-button
          type="primary"
          size="small"
          @click="handleSubmit"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
// import Pagination from '@/components/Pagination'
// import mixins from '@/utils/mixin'
import { getTypeDimension, setAddTypeDimension, setUpdateTypeDimension, setTypeDimensionStatus } from '@/api/group'
import { mapGetters } from 'vuex'
export default {
  // components: { Pagination },
  // mixins: [mixins],
  data() {
    return {
      total: 0,
      tableData: [],
      dialogVisible: false,
      modalForm: {
        name: '',
        useStatus: 0
      },
      rules: {
        name: [{ required: true, message: '请输入分类维度名称', trigger: 'blur' }]
      },
      subLoading: false
    }
  },
  computed: {
    ...mapGetters(['merCode'])
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.loading = true
      getTypeDimension(this.merCode).then(res => {
        this.loading = false
        this.tableData = res.data
      }).catch(() => {
        this.loading = false
      })
    },
    handleAddType() {
      this.dialogVisible = true
      this.modalForm = { name: '' }
      this.$nextTick(_ => {
        this.$refs.modalForm.clearValidate()
      })
    },
    handleEditType(row) {
      this.modalForm = JSON.parse(JSON.stringify(row))
      this.dialogVisible = true
      this.$nextTick(_ => {
        this.$refs.modalForm.clearValidate()
      })
    },
    handleSubmit() { // 保存创建
      this.subLoading = true
      this.$refs.modalForm.validate((valid) => {
        if (valid) {
          if (this.modalForm.id) {
            this._Editrequest()
          } else {
            this._Addrequest()
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    _Addrequest() {
      setAddTypeDimension(this.modalForm).then(res => {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        this.dialogVisible = false
        this.getList()
        this.subLoading = false
      }).catch(() => {
        this.subLoading = false
      })
    },
    _Editrequest() {
      setUpdateTypeDimension(this.modalForm).then(res => {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        this.dialogVisible = false
        this.getList()
        this.subLoading = false
      }).catch(() => {
        this.subLoading = false
      })
    },
    handleChangeStatau(row) { // 修改状态
      setTypeDimensionStatus(row.id, this.merCode).then(res => {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        this.getList()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.desc {
  i {
    cursor: pointer;
    &:hover {
      color: #409eff;
    }
  }
}
</style>

