<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-button class="btn btn-add" type="primary" size="small" @click.stop="handleAdd()">添加分类广告</el-button>
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
            <span class="label-name" style="width: 50px">备注</span>
            <el-input v-model.trim="searchForm.remark" size="small" style="width: 200px" />
          </div>
          <div class="search-item">
            <el-button size="small" @click="search()">查 询</el-button>
          </div>
        </div>
      </section>
      <section class="table-box">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="序号" width="60" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.sortNumber || '' }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="备注" width="200" align="center" />
          <el-table-column prop="img" label="图片" width="180" align="center">
            <template slot-scope="scope">
              <div class="scope-img-wrap">
                <img :src="scope.row.imageUrl">
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="url" label="链接地址" min-width="240" />
          <el-table-column prop="startTime" label="开始时间" width="180" align="center" />
          <el-table-column prop="endTime" label="结束时间" width="180" align="center" />
          <el-table-column label="状态" width="100" align="center">
            >
            <template slot-scope="scope">
              <span v-if="scope.row.status=='1'">正常</span>
              <span v-if="scope.row.status=='0'">停用</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="240">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click.stop="handleEdit(scope.row)">编辑</el-button>
              <el-button type="danger" size="small" @click.stop="handleChangeStatus(scope.row)">
                <span v-if="scope.row.status==1">停用</span>
                <span v-if="scope.row.status==0">启用</span>
              </el-button>
              <el-button type="danger" size="small" @click.stop="handleDel(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </section>
      <!-- <section class="c-footer">
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
      </section>-->
    </div>
    <el-dialog
      :title="`${xForm.id==''? '添加':'修改'}分列广告`"
      append-to-body
      :visible.sync="dialogFormVisible"
      width="800px"
      :close-on-click-modal="false"
      @close="dialogClose('xForm')"
    >
      <div class="x-dialog-body">
        <div class="form-box">
          <el-form ref="xForm" :model="xForm" :rules="xRules">
            <el-form-item label="所属分类" :label-width="formLabelWidth" prop="classId">
              <el-select
                v-model="xForm.classId"
                filterable
                allow-create
                default-first-option
                placeholder="请选择分类"
              >
                <el-option
                  v-for="item in classOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="广告图片" :label-width="formLabelWidth" prop="imgUrl">
              <el-upload
                class="avatar-uploader"
                :headers="headers"
                :action="upLoadUrl"
                :show-file-list="false"
                :on-success="handleUploadSuccess"
                :before-upload="beforeUpload"
              >
                <img v-if="xForm.imgUrl" :src="xForm.imgUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
              <p class="note-grey">建议尺寸750*300像素，每张图片大小限制在80kb以内</p>
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
              <el-input v-model="xForm.sort" size="small" autocomplete="off" style="width: 350px" :maxlength="5" placeholder="正整数" />
            </el-form-item>
          </el-form>
        </div>
        <div class="preview-box">
          <p class="title">
            <label style="font-weight: bold">内容位置：</label> 分类-广告
          </p>
          <div class="prview-pic">
            <img src="../../assets/image/h5/priview_1.png" style="width:100%;height:100%">
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
  updatePageSetStatus,
  getADClass
} from '../../api/wxmall'
import config from '../../utils/config'

export default {
  name: 'ADPosition',
  data() {
    const checkNum = (rule, value, callback) => {
      console.log('rule', rule)
      if (value === '') {
        callback(new Error('请输入序号'))
      }
      if (/[^1-9]/.test(value)) {
        console.log(1111)
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
      positionCode: 'C-01',
      statusOptions: [
        { id: 1, label: '全部', value: '' },
        { id: 2, label: '使用', value: '1' },
        { id: 3, label: '停用', value: '0' }
      ],
      searchForm: {
        dateRange: '',
        timeBeg: '', // 开始时间
        timeEnd: '', // 结束时间
        status: '' // 使用状态:0停用1启用
      },
      tableData: [],
      pager: {
        current: 1,
        size: 10,
        total: 200
      },
      dialogFormVisible: false,
      classOptions: [],
      xForm: {
        id: '',
        classId: '',
        imgUrl: '',
        linkUrl: '',
        dateRange: '',
        startTime: '',
        endTime: '',
        sort: ''
      },
      xRules: {
        classId: [
          { required: true, message: '请选择分类', trigger: 'blur' }
        ],
        imgUrl: [
          { required: true, message: '请上传图片', trigger: 'blur' }
        ],
        linkUrl: [
          { required: true, message: '请输入链接地址', trigger: 'blur' }
        ],
        startTime: [
          { required: true, message: '请选择时间段', trigger: 'change' }
        ],
        sort: [
          { required: true, validator: checkNum, trigger: 'blur' }
        ]
      },
      editDetail: null, // 编辑详情
      formLabelWidth: '80px'
    }
  },
  computed: {
    ...mapGetters(['roles']),
    headers() {
      return { 'Authorization': this.$store.getters.token }
    },
    merCode() {
      return this.$store.state.user.merCode || ''
    },
    upLoadUrl() {
      return `${this.uploadFileURL}/${config.merGoods}/1.0/file/_upload?merCode=${this.merCode}`
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this._getTableData()
      this._getADClass() // 获取广告分分类列表
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
        classId: row.classId,
        imgUrl: row.imageUrl,
        linkUrl: row.url,
        dateRange: [row.startTime, row.endTime],
        startTime: row.startTime,
        endTime: row.endTime,
        sort: row.sortNumber,
        remark: row.remark
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
        classId: '',
        imgUrl: '',
        linkUrl: '',
        timeRange: '',
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
    handleUploadSuccess(res, file) {
      this.xForm.imgUrl = res.data || ''
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
        sortOrder: 1,
        status: this.searchForm.status,
        currentPage: this.pager.current,
        pageSize: this.pager.size
      }
      getPageSets(params).then(res => {
        if (res.code === '10000') {
          this.tableData = res.data || []
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
        merCode: '',
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
    // 获取广告分类
    _getADClass() {
      const params = {
        merCode: this.merCode,
        useStatus: 1
      }
      getADClass(params).then(res => {
        console.log('class res', res)
        if (res.code === '10000') {
          this.classOptions = res.data || []
        } else {
          this.$message({
            message: res.msg,
            type: 'error',
            duration: 5 * 1000
          })
        }
      })
    },
    // 新增数据
    _addData() {
      const params = {
        announcement: '',
        classId: this.xForm.classId,
        createName: '',
        endTime: this.xForm.endTime,
        id: '',
        imageUrl: this.xForm.imgUrl,
        merCode: '',
        positionCode: this.positionCode,
        remark: this.xForm.remark,
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
            type: 'success',
            duration: 5 * 1000
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
        announcement: '',
        classId: this.xForm.classId,
        createName: '',
        endTime: this.xForm.endTime,
        id: this.xForm.id,
        imageUrl: this.xForm.imgUrl,
        merCode: '',
        positionCode: this.positionCode,
        remark: this.xForm.remark,
        productId: '', // 2-03 类型必填
        sortNumber: this.xForm.sort,
        startTime: this.xForm.startTime,
        url: this.xForm.linkUrl
      }
      editPageSet(params).then(res => {
        if (res.code === '10000') {
          this.$message({
            message: '修改成功',
            type: 'success',
            duration: 5 * 1000
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
            type: 'success',
            duration: 5 * 1000
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
            type: 'success',
            duration: 5 * 1000
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
    flex: 0 0 280px;
    .title {
      font-size: 18px;
    }
    .prview-pic {
      margin-top: 20px;
      width: 100%;
      height: 500px;
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
