<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-button class="btn btn-add" type="primary" size="small" @click.stop="handleAdd()">添加公告</el-button>
      <section @keydown.enter="search()">
        <div class="search-form" style="margin-top:20px;margin-bottom:10px">
          <div class="search-item">
            <span class="label-name">有效时间</span>
            <el-date-picker
              v-model="searchForm.dateRange"
              size="small"
              type="datetimerange"
              value-format="yyyy-MM-dd HH:mm:ss"
              range-separator="至"
              :default-time="['00:00:00','23:59:59']"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              @change="handleTimeChange($event, 1)"
            />
          </div>
          <div class="search-item">
            <span class="label-name" style="width: 50px">状态</span>
            <el-select
              v-model="searchForm.status"
              size="small"
              placeholder="使用状态"
              @change="search()"
            >
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div class="search-item">
            <el-button size="small" @click="search()">查 询</el-button>
          </div>
        </div>
      </section>
      <section class="table-box">
        <el-table :data="tableData" style="width: 100%" size="small">
          <el-table-column label="序号" width="60" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.sortNumber || '' }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="announcement" label="展示内容" min-width="240" />
          <el-table-column prop="url" label="链接地址" min-width="240" />
          <el-table-column prop="startTime" label="开始时间" width="180" align="center" />
          <el-table-column prop="endTime" label="结束时间" width="180" align="center" />
          <el-table-column label="状态" width="100" align="center">
            >
            <template slot-scope="scope">
              <el-tag v-if="scope.row.status=='1'" size="small">正常</el-tag>
              <el-tag v-if="scope.row.status=='0'" size="small" type="info">停用</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="240">
            <template slot-scope="scope">
              <el-button
                slot="reference"
                title="编辑"
                icon="el-icon-edit"
                type="primary"
                circle
                size="mini"
                @click="handleEdit(scope.row)"
              />
              <el-button
                v-if="scope.row.status===0"
                slot="reference"
                title="启用"
                type="success"
                icon="el-icon-coordinate"
                circle
                size="mini"
                @click="handleChangeStatus(scope.row)"
              />
              <el-button
                v-if="scope.row.status===1"
                slot="reference"
                title="停用"
                type="warning"
                icon="el-icon-coordinate"
                circle
                size="mini"
                @click="handleChangeStatus(scope.row)"
              />
              <el-button
                slot="reference"
                title="删除"
                type="danger"
                icon="el-icon-delete"
                circle
                size="mini"
                @click="handleDel(scope.row)"
              />
            </template>
          </el-table-column>
        </el-table>
      </section>
      <section class="c-footer">
        <el-pagination
          background
          :current-page="pager.current"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="pager.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pager.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </section>
    </div>
    <el-dialog
      :title="`${xForm.id==''? '添加':'修改'}公告`"
      append-to-body
      :visible.sync="dialogFormVisible"
      width="800px"
      :close-on-click-modal="false"
      @close="dialogClose('xForm')"
    >
      <div class="x-dialog-body">
        <div class="form-box">
          <el-form ref="xForm" :model="xForm" :rules="xRules">
            <el-form-item label="公告文字" :label-width="formLabelWidth" prop="notice">
              <el-input
                v-model="xForm.notice"
                autocomplete="off"
                style="width: 350px"
                :maxlength="15"
                placeholder="最多输入15字"
              />
            </el-form-item>
            <el-form-item label="设置链接" :label-width="formLabelWidth" prop="linkUrl">
              <el-input
                v-model="xForm.linkUrl"
                size="small"
                autocomplete="off"
                style="width: 350px"
                :maxlength="150"
                placeholder="http:// 或 https://"
              />
            </el-form-item>
            <el-form-item label="时间段" :label-width="formLabelWidth" prop="startTime">
              <el-date-picker
                v-model="xForm.dateRange"
                style="width: 350px"
                size="small"
                type="datetimerange"
                value-format="yyyy-MM-dd HH:mm:ss"
                range-separator="至"
                :default-time="['00:00:00','23:59:59']"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                @change="handleTimeChange($event, 2)"
              />
            </el-form-item>
            <el-form-item label="序号" :label-width="formLabelWidth" prop="sort">
              <el-input v-model="xForm.sort" autocomplete="off" style="width: 350px" :maxlength="5" placeholder="正整数" />
            </el-form-item>
          </el-form>
        </div>
        <div class="preview-box">
          <p class="title">
            <label style="font-weight: bold">内容位置：</label> 首页-公告
          </p>
          <div class="prview-pic">
            <img src="../../assets/image/h5/priview_2.png" style="width:100%;height:100%">
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" size="small" @click="handleSubmit('xForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  getPageSets,
  getPageSetDetail,
  addPageSet,
  editPageSet,
  delPageSet,
  updatePageSetStatus
} from '../../api/wxmall'

export default {
  name: 'Notice',
  data() {
    const checkWebsite = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入链接地址'))
      }
      if (!/(http|https):\/\/([\w.]+\/?)\S*/.test(value)) {
        callback(new Error('请输入正确的地址'))
      }
      callback()
    }
    const checkNum = (rule, value, callback) => {
      if (value !== '' && !/^[1-9]([0-9])*$/.test(value)) {
        callback(new Error('请输入正整数'))
      }
      callback()
    }
    return {
      currentRole: 'adminDashboard',
      // I-01	轮播图
      // I-02	公告
      // I-03	精彩活动一加三广告位
      // I-F1-1	精彩活动单张广告位
      // I-F1-2	精彩活动商品广告位
      // C-01	分类广告位
      // I-00	主页名称
      // I-F2-1	精彩活动单张广告位
      // I-F2-2	精彩活动商品广告位
      positionCode: 'I-02',
      statusOptions: [
        { id: 1, label: '全部', value: '' },
        { id: 2, label: '正常', value: '1' },
        { id: 3, label: '停用', value: '0' }
      ],
      searchForm: {
        dateRange: '',
        timeBeg: '', // 开始时间
        timeEnd: '', // 结束时间
        status: '', // 使用状态:0停用1启用
        remark: '' // 备注
      },
      tableData: [],
      pager: {
        current: 1,
        size: 10,
        total: 200
      },
      dialogFormVisible: false,
      xForm: {
        id: '',
        notice: '',
        linkUrl: '',
        dateRange: '',
        startTime: '',
        endTime: '',
        sort: ''
      },
      xRules: {
        notice: [
          { required: true, message: '请输入公告文字', trigger: 'blur' }
        ],
        linkUrl: [
          { required: true, validator: checkWebsite, trigger: 'blur' }
        ],
        startTime: [
          { required: true, message: '请选择时间段', trigger: 'change' }
        ],
        sort: [
          { validator: checkNum, trigger: 'blur' }
        ]
      },
      editDetail: null, // 编辑详情
      formLabelWidth: '80px'
    }
  },
  computed: {
    ...mapGetters(['roles']),
    uploadFileUrl() {
      return `${this.uploadFileURL}`
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this._getTableData()
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pager.size = val
      this._getTableData()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.pager.current = val
      this._getTableData()
    },
    handleTimeChange(val, type) {
      if (type === 1) {
        // 搜索栏
        if (val && val.length === 2) {
          this.searchForm.timeBeg = val[0]
          this.searchForm.timeEnd = val[1]
          this.search()
        } else {
          this.searchForm.timeBeg = ''
          this.searchForm.timeEnd = ''
        }
      } else if (type === 2) {
        // dialog
        if (val && val.length === 2) {
          this.xForm.startTime = val[0]
          this.xForm.endTime = val[1]
        } else {
          this.xForm.startTime = ''
          this.xForm.endTime = ''
        }
      }
      console.log('this.searchForm', this.searchForm)
      console.log('this.xForm', this.xForm)
    },
    // 查询
    search() {
      this._getTableData()
    },
    handleChangeStatus(row) {
      console.log('row', row)
      this._updateDataStatus(row)
    },
    handleDel(row) {
      console.log('delete row', row)
      this.$confirm('确认删除吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this._delData(row.id)
      })
    },
    handleAdd() {
      this.dialogFormVisible = true
    },
    handleEdit(row) {
      this.editDetail = row
      // 信息查询
      this.xForm = {
        id: row.id,
        notice: row.announcement,
        linkUrl: row.url,
        dateRange: [row.startTime, row.endTime],
        startTime: row.startTime,
        endTime: row.endTime,
        sort: row.sortNumber
      }
      this.dialogFormVisible = true
    },
    dialogClose(formName) {
      this.resetForm(formName)
    },
    resetForm(formName) {
      // 表单重置
      this.xForm = {
        id: '',
        notice: '',
        linkUrl: '',
        dateRange: '',
        startTime: '',
        endTime: '',
        sort: ''
      }
      this.$refs[formName].resetFields()
    },
    handleSubmit(formName) {
      // 表单验证
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.xForm.id === '') {
            // 新增
            this._addData()
          } else {
            // 修改
            this._editData()
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleUploadSuccess($event) {
      console.log($event)
    },
    beforeUpload(file) {
      const isType = file.type === 'image/jpeg' || 'image/jpg' || 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isType) {
        this.$message.error('上传图片只支持 JPG,PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isType && isLt2M
    },
    // 获取列表数据
    _getTableData() {
      const params = {
        classId: '',
        displayTime: '',
        startTime: this.searchForm.timeBeg,
        endTime: this.searchForm.timeEnd,
        positionCode: this.positionCode,
        remark: this.searchForm.remark,
        sortOrder: 0,
        status: this.searchForm.status,
        currentPage: this.pager.current,
        pageSize: this.pager.size,
        pageFlag: true
      }
      getPageSets(params).then(res => {
        if (res.code === '10000') {
          this.tableData = res.data.data || []
          this.pager.total = res.data.totalCount
        } else {
          this.$message({
            message: res.msg,
            type: 'error',
            duration: 5 * 1000
          })
        }
        console.log('res-1', res)
      })
    },
    // 获取数据详情
    _getDataDetail() {
      const params = {
        classId: '',
        displayTime: '2019-10-23 10:00:00',
        startTime: '2019-10-20 12:00:00',
        endTime: '2019-11-24 10:00:00',
        merCode: '888888',
        positionCode: '1',
        remark: '',
        sortOrder: 0,
        status: 0
      }
      getPageSetDetail(params)
        .then(res => {
          console.log('res-1', res)
        })
        .catch(err => {
          console.log('err', err)
        })
    },
    // 新增数据
    _addData() {
      const params = {
        announcement: this.xForm.notice,
        classId: '',
        createName: '',
        endTime: this.xForm.endTime,
        id: '',
        imageUrl: '',
        merCode: '',
        positionCode: this.positionCode,
        remark: '',
        productId: null, // 2-03 类型必填
        sortNumber: this.xForm.sort,
        startTime: this.xForm.startTime,
        url: this.xForm.linkUrl
      }
      console.log('add params', params)
      addPageSet(params).then(res => {
        if (res.code === '10000') {
          this.$message({
            message: '新增成功',
            type: 'success'
          })
          this.dialogFormVisible = false
          // 更新table
          this._getTableData()
        } else {
          this.$message({
            message: res.msg,
            type: 'error',
            duration: 5 * 1000
          })
        }
      })
    },
    // 修改数据
    _editData() {
      const params = {
        announcement: this.xForm.notice,
        classId: '',
        createName: '',
        endTime: this.xForm.endTime,
        id: this.xForm.id,
        imageUrl: '1',
        merCode: '',
        positionCode: this.positionCode,
        remark: '',
        productId: null, // 2-03 类型必填
        sortNumber: this.xForm.sort,
        startTime: this.xForm.startTime,
        url: this.xForm.linkUrl
      }
      editPageSet(params).then(res => {
        if (res.code === '10000') {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.dialogFormVisible = false
          // 更新table
          this._getTableData()
        } else {
          this.$message({
            message: res.msg,
            type: 'error',
            duration: 5 * 1000
          })
        }
      })
    },
    // 删除数据
    _delData(dataId) {
      const params = {
        id: dataId
      }
      delPageSet(params).then(res => {
        if (res.code === '10000') {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          // 更新列表
          this._getTableData()
        } else {
          this.$message({
            message: res.msg,
            type: 'error',
            duration: 5 * 1000
          })
        }
      })
    },
    // 停用，启用数据
    _updateDataStatus(row) {
      const params = {
        id: row.id,
        merCode: '',
        modifyName: '',
        positionCode: this.positionCode,
        status: row.status === 1 ? 0 : 1
      }
      updatePageSetStatus(params).then(res => {
        if (res.code === '10000') {
          this.$message({
            message: row.status === 1 ? '已停用' : '已启用',
            type: 'success'
          })
          // 更新列表
          this._getTableData()
        } else {
          this.$message({
            message: res.msg,
            type: 'error',
            duration: 5 * 1000
          })
        }
      })
    }
  }
}
</script>
<style lang="scss">
.scope-img-wrap {
  width: 60px;
  height: 40px;
  background: #f5f5f5;
  margin: auto;
  img {
    width: 100%;
    height: 100%;
  }
}
.x-dialog-body {
  width: 100%;
  display: flex;
  .form-box {
    flex: 1;
  }
  .preview-box {
    margin-right: 15px;
    flex: 0 0 250px;
    .title {
      font-size: 18px;
    }
    .prview-pic {
      margin-top: 20px;
      width: 100%;
      height: 450px;
    }
  }
  .test-1 {
    color: red;
  }
}
.note-grey {
  font-size: 14px;
  line-height: 1.1;
  color: #999999;
}
</style>
