<template>
  <div class="dashboard-container">
    <div class="app-container">
      <section class="form-box">
        <el-form :model="xForm" size="small">
          <el-form-item label="活动类型">
            <el-radio-group v-model="xForm.type">
              <el-radio label="限时优惠" value="1" />
              <el-radio label="限时秒杀" value="2" />
            </el-radio-group>
          </el-form-item>
          <el-form-item label="活动名称" required>
            <el-input placeholder="不超过20字" />
          </el-form-item>
          <el-form-item label="活动描述">
            <el-input type="textarea" placeholder="不超过50字" />
          </el-form-item>
          <el-form-item label="生效时间" required>
            <el-time-picker v-model="xForm.startTime" placeholder="开始时间" />
            <el-time-picker v-model="xForm.startTime" placeholder="结束时间" />
          </el-form-item>
          <el-form-item label="优惠模式">
            <el-radio-group v-model="xForm.mode">
              <el-radio label="折扣" value="1" />
              <el-radio label="减价" value="2" />
            </el-radio-group>
          </el-form-item>
          <el-form-item label="活动范围">
            <el-radio-group v-model="xForm.range">
              <el-radio label="全部门店" value="1" />
              <el-radio label="部分门店" value="2" />
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否免运">
            <el-checkbox v-model="xForm.isBY" label="快递包邮" value="1" />
            <el-checkbox v-model="xForm.isPS" label="免配送费" value="1" />
            <el-checkbox v-model="xForm.isMY" label="否" value="1" />
          </el-form-item>
        </el-form>
        <div class="table-box">
          <div class="muti-set">
            <span>批量设置</span>
            <el-select v-model="xForm.mutiSetMode" placeholder="批量设置">
              <template>
                <el-option label="批量设置折扣" :value="1" />
                <el-option label="批量设置减价" :value="2" />
                <el-option label="批量设置限购" :value="3" />
                <el-option label="批量设置库存" :value="4" />
              </template>
            </el-select>
          </div>
          <el-table :data="tabData">
            <el-table-column label="序号" type="index" />
            <el-table-column label="商品名称" prop="name" min-width="150px" />
            <el-table-column label="规格" prop="name" min-width="100px" />
            <el-table-column label="生产厂家" prop="name" min-width="120px" />
            <el-table-column label="折扣" prop="name" min-width="100px">
              <template slot-scope="scope">
                <el-input v-model="scope.row.value" style="width: 40px" @blur="valueChange" />
                <span>折</span>
                <span>元</span>
              </template>
            </el-table-column>
            <el-table-column label="限购" prop="name" min-width="100px">
              <template slot-scope="scope">
                <el-input v-model="scope.row.num" style="width: 40px" />
              </template>
            </el-table-column>
            <el-table-column label="库存" prop="name" min-width="100px">
              <template slot-scope="scope">
                <el-input v-model="scope.row.store" style="width: 40px" />
              </template>
            </el-table-column>
            <el-table-column label="操作" prop="name" min-width="120px">
              <template slot-scope="scope">
                <el-button type="text" @click.stop="handleDel(scope.row, scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </section>
    </div>
    <dialog-goods ref="dialogGoods" />
    <dialog-store ref="dialogStore" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import dialogGoods from '@/components/Dialog/DialogGoods'
import dialogStore from '@/components/Dialog/DialogStore'
import {
  getPageSets,
  getPageSetDetail,
  addPageSet,
  editPageSet,
  delPageSet,
  updatePageSetStatus
} from '@/api/wxmall'
import config from '@/utils/config'

export default {
  name: 'Banner',
  components: {
    dialogGoods,
    dialogStore
  },
  data() {
    const checkWebsite = (rule, value, callback) => {
      console.log('value', value)
      if (value === '') {
        callback(new Error('请输入链接地址'))
      }
      if (!/(http|https):\/\/([\w.]+\/?)\S*/.test(value)) {
        callback(new Error('链接格式不正确，例：http://111.com'))
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
      tabData: [{
        value: 10,
        num: 6,
        store: 200
      }],
      xForm: {
        id: '',
        imgUrl: '',
        linkUrl: '',
        dateRange: '',
        startTime: '',
        endTime: '',
        isBY: 0,
        isPS: 0,
        isMY: 0
      },
      xRules: {
        imgUrl: [
          { required: true, message: '请上传图片', trigger: 'blur' }
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
    ...mapGetters(['roles', 'merCode']),
    uploadFileUrl() {
      return `${this.uploadFileURL}`
    },
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
    },
    handleTimeChange(val, type) {
      console.log(val, type)
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
    },
    valueChange() {
      console.log('list', this.tabData)
    },
    handleChangeStatus(row) {
      console.log('row', row)
      this._updateDataStatus(row)
    },
    handleDel(row, index) {
      console.log('row', row)
      console.log('index', index)
      this.tabData.splice(index, 1)
    },
    handleAdd() {
      this.$router.push({
        path: '/marketing/entrance'
      })
    },
    handleEdit(row) {
      this.editDetail = row
      // 信息查询
      this.xForm = {
        id: row.id,
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
        imgUrl: '',
        linkUrl: '',
        timeRange: '',
        startTime: '',
        endTime: '',
        sort: '',
        remark: ''
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
      if (res.code === '10000') {
        this.xForm.imgUrl = res.data || ''
        this.$refs.xForm.validate()
      } else {
        this.$message.error('上传失败!')
      }
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
        announcement: '',
        classId: '',
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
        announcement: '',
        classId: '',
        createName: '',
        endTime: this.xForm.endTime,
        id: this.xForm.id,
        imageUrl: this.xForm.imgUrl,
        merCode: '',
        positionCode: this.positionCode,
        remark: this.xForm.remark,
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
