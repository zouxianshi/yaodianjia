<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-button class="btn btn-add" type="primary" size="small" @click.stop="handleAdd()">添加轮播图</el-button>
      <section @keydown.enter="search()">
        <div class="search-form" style="margin-top:20px;margin-bottom:10px">
          <!-- <div class="search-item">
            <span class="label-name">有效时间</span>
            <el-date-picker
              v-model="searchForm.timeBeg"
              size="small"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="开始时间"
              @change="handleTimeChange($event, 1)"
            /> -
            <el-date-picker
              v-model="searchForm.timeEnd"
              size="small"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="结束时间"
              @change="handleTimeChange($event, 2)"
            />
          </div>-->
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
      <section class="table-box webkit-scroll" style="height: calc(100% - 180px);overflow: auto">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="序号" width="60" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.sortNumber || '' }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="img" label="图片" min-width="100" align="center">
            <template slot-scope="scope">
              <div v-if="scope.row.imageUrl && scope.row.imageUrl!==''" class="x-img-mini">
                <div class="x-image__preview">
                  <el-image
                    style="width: 50px;height: 50px;"
                    fit="contain"
                    :src="showImg(scope.row.imageUrl)"
                    :preview-src-list="[showImg(scope.row.imageUrl)]"
                  />
                </div>
              </div>
              <div v-else style="line-height: 32px">暂未上传</div>
            </template>
          </el-table-column>
          <el-table-column prop="url" label="链接地址" min-width="240">
            <template v-if="scope.row.url && scope.row.url!==''" slot-scope="scope">
              <a
                class="x-a-text"
                title="跳转链接"
                :href="scope.row.url || ''"
                target="_blank"
                v-text="scope.row.url || ''"
              />
            </template>
          </el-table-column>
          <!-- <el-table-column prop="startTime" label="开始时间" min-width="180" align="center" />
          <el-table-column prop="endTime" label="结束时间" min-width="180" align="center" />-->
          <el-table-column label="状态" min-width="80" align="center">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.status=='1'" size="small">正常</el-tag>
              <el-tag v-if="scope.row.status=='0'" size="small" type="info">停用</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="备注" min-width="120" align="center" />
          <el-table-column label="操作" align="center" min-width="240">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button
                v-if="scope.row.status===0"
                type="primary"
                size="mini"
                @click="handleChangeStatus(scope.row)"
              >启用</el-button>
              <el-button
                v-if="scope.row.status===1"
                type="info"
                size="mini"
                @click="handleChangeStatus(scope.row)"
              >停用</el-button>
              <el-button type="danger" size="mini" @click="handleDel(scope.row)">删除</el-button>
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
      :title="`${xForm.id==''? '添加':'修改'}轮播图`"
      append-to-body
      :visible.sync="dialogFormVisible"
      width="800px"
      :close-on-click-modal="false"
      @closed="dialogClose('xForm')"
    >
      <div v-loading="uploadLoading" element-loading-text="图片上传中" class="x-dialog-body">
        <div class="form-box">
          <el-form ref="xForm" :model="xForm" :rules="xRules">
            <el-form-item label="图片" :label-width="formLabelWidth" prop="imgUrl">
              <el-upload
                class="avatar-uploader x-uploader"
                :headers="headers"
                :action="upLoadUrl"
                :show-file-list="false"
                :on-success="handleUploadSuccess"
                :on-error="handleUploadError"
                :before-upload="beforeUpload"
              >
                <div v-if="xForm.imgUrl" class="el-img-box">
                  <img :src="showImg(xForm.imgUrl)" class="image">
                  <div class="img-actions" @click.stop>
                    <i class="icon el-icon-upload2" title="上传" @click.stop="handleUpload" />
                    <i class="icon el-icon-delete" title="删除" @click.stop="handleRemove" />
                  </div>
                </div>
                <i v-else class="el-icon-plus icon-add" />
              </el-upload>
              <p class="note-grey">建议尺寸750*300像素，每张图片大小限制在80kb以内</p>
            </el-form-item>
            <el-form-item label="设置链接" :label-width="formLabelWidth" prop="linkUrl">
              <el-tooltip class="item" effect="dark" :content="xForm.linkUrl" placement="left-start">
                <el-input
                  v-model="xForm.linkUrl"
                  size="small"
                  autocomplete="off"
                  style="width: 280px"
                  :maxlength="1000"
                  placeholder="http:// 或 https://"
                />
              </el-tooltip>
              <el-button icon="el-icon-link" size="small" @click="dialogUrlVisible = true">选择链接</el-button>
            </el-form-item>
            <el-form-item label="启用状态" :label-width="formLabelWidth">
              <el-switch v-model="xForm.status" />
            </el-form-item>
            <!-- <el-form-item label="时间段" :label-width="formLabelWidth" prop="startTime">
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
                @change="handleTimeChange($event, 3)"
              />
            </el-form-item>-->
            <el-form-item label="序号" :label-width="formLabelWidth" prop="sort">
              <el-input
                v-model="xForm.sort"
                size="small"
                autocomplete="off"
                style="width: 380px"
                :maxlength="5"
                placeholder="正整数"
              />
            </el-form-item>
            <el-form-item label="备注" :label-width="formLabelWidth">
              <el-input
                v-model="xForm.remark"
                size="small"
                autocomplete="off"
                placeholder="10字以内"
                :maxlength="10"
                style="width: 380px"
              />
            </el-form-item>
          </el-form>
          <el-drawer
            :wrapper-closable="false"
            destroy-on-close
            append-to-body
            size="600px"
            :visible.sync="dialogUrlVisible"
          >
            <div slot="title">选择链接</div>
            <m-links-table v-if="dialogUrlVisible" :url="xForm.linkUrl" @on-link="_onLink" />
          </el-drawer>
        </div>
        <div class="preview-box">
          <p class="title">
            <label style="font-weight: bold">内容位置：</label> 首页-轮播图
          </p>
          <div class="prview-pic">
            <img src="../../assets/image/h5/priview_1.png" style="width:100%;height:100%">
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          size="small"
          :loading="saveLoading"
          @click="handleSubmit('xForm')"
        >确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="showImg(dialogImageUrl)" alt>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import mLinksTable from '../mall/homeSettings/_source/settingsArea/_source/linksTable'
import {
  queryCenterStore,
  getPageSets,
  getPageSetDetail,
  addPageSet,
  editPageSet,
  delPageSet,
  updatePageSetStatus
} from '../../api/wxmall'
import config from '../../utils/config'

export default {
  name: 'Banner',
  components: { mLinksTable },
  data() {
    const checkWebsite = (rule, value, callback) => {
      if (value === '') {
        // callback(new Error('请输入链接地址'))
        callback()
      }
      // if (!/(http|https):\/\/([\w.]+\/?)\S*/.test(value)) {
      //   callback(new Error('链接格式不正确，例：http://111.com'))
      // }
      callback()
    }
    const checkNum = (rule, value, callback) => {
      if (value !== '' && !/^[1-9]([0-9])*$/.test(value)) {
        callback(new Error('请输入正整数'))
      }
      callback()
    }
    return {
      dialogUrlVisible: false,
      saveLoading: false,
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
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
      positionCode: 'I-01',
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
        size: 20,
        total: 0
      },
      dialogFormVisible: false,
      xForm: {
        id: '',
        imgUrl: '',
        linkUrl: '',
        sort: '',
        remark: '',
        status: true
      },
      xRules: {
        imgUrl: [{ required: true, message: '请上传图片', trigger: 'blur' }],
        linkUrl: [{ validator: checkWebsite, trigger: 'blur' }],
        startTime: [
          { required: true, message: '请选择时间段', trigger: 'change' }
        ],
        sort: [{ validator: checkNum, trigger: 'blur' }]
      },
      editDetail: null, // 编辑详情
      formLabelWidth: '80px',
      uploadLoading: false
    }
  },
  computed: {
    ...mapGetters(['roles', 'merCode']),
    uploadFileUrl() {
      return `${this.uploadFileURL}`
    },
    headers() {
      return { Authorization: this.$store.getters.token }
    },
    merCode() {
      return this.$store.state.user.merCode || ''
    },
    upLoadUrl() {
      return `${this.uploadFileURL}${config.merGoods}/1.0/file/_upload?merCode=${this.merCode}`
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    _onLink({ url }) {
      this.xForm.linkUrl = url
    },
    fetchData() {
      this._queryCenterStore().then(res => {
        if (res.code === '10000' && res.data) {
          this._getTableData()
        } else {
          this.toSetCenterStore()
        }
      })
    },
    toSetCenterStore() {
      this.$confirm('还未设置旗舰店，请先维护旗舰店, 去设置？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.push('/storeSetting/chainSetting')
      })
    },
    handleUpload() {
      $('.el-img-box').click()
    },
    handleRemove() {
      this.xForm.imgUrl = ''
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
      if (type === 1 || type === 2) {
        // 搜索栏 1.开始时间 2.结束时间
        if (!val) {
          type === 1
            ? (this.searchForm.timeBeg = '')
            : (this.searchForm.timeEnd = '')
        } else {
          if (
            this.searchForm.timeBeg &&
            this.searchForm.timeEnd &&
            this.searchForm.timeBeg !== '' &&
            this.searchForm.timeEnd !== ''
          ) {
            // 比较时间
            const start = this.searchForm.timeBeg.replace(/[- :]/g, '')
            const end = this.searchForm.timeEnd.replace(/[- :]/g, '')
            if (parseInt(start) > parseInt(end)) {
              this.$message('结束时间必须大于开始时间')
              type === 1
                ? (this.searchForm.timeBeg = '')
                : (this.searchForm.timeEnd = '')
              return
            }
          }
        }
        this.search()
        // if (this.searchForm.timeBeg !== '' && this.searchForm.timeEnd !== '') {
        //   this.search()
        // } else {
        //   this.searchForm.timeBeg = ''
        //   this.searchForm.timeEnd = ''
        // }
      } else if (type === 3) {
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
    // 查询
    search() {
      this.pager.current = 1
      this.pager.total = 0
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
        imgUrl: row.imageUrl,
        linkUrl: row.url,
        status: row.status === 1,
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
        sort: '',
        remark: '',
        status: true
      }
      this.$refs[formName].resetFields()
    },
    handleSubmit(formName) {
      // 表单验证
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 验证结束时间
          // const start_time = new Date(this.xForm.startTime).getTime()
          // const end_time = new Date(this.xForm.endTime).getTime()
          // const current_time = new Date().getTime()
          // if (start_time >= end_time) {
          //   this.$message.warning('结束时间必要大于开始时间')
          //   return false
          // }
          // if (current_time >= end_time) {
          //   this.$message.warning('结束时间必要大于当前时间')
          //   return false
          // }

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
    handleUploadError() {
      this.uploadLoading = false
    },
    handleUploadSuccess(res, file) {
      if (res.code === '10000') {
        this.xForm.imgUrl = res.data || ''
        this.$refs.xForm.clearValidate('imgUrl')
      } else {
        this.$message.error(res.msg)
      }
      this.uploadLoading = false
    },
    beforeUpload(file) {
      const isType =
        file.type === 'image/jpeg' ||
        file.type === 'image/jpg' ||
        file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isType) {
        this.$message.warning('请上传 JPG、JPEG、PNG 格式的图片！')
        return false
      }
      if (!isLt2M) {
        this.$message.warning('请上传不超过 2M 的图片！')
        return false
      }
      this.uploadLoading = true
      return isType && isLt2M
    },
    // 查询中心店（旗舰店）
    _queryCenterStore() {
      return new Promise((resolve, reject) => {
        queryCenterStore({ merCode: this.merCode })
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
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
          console.log('_getDataDetail', res)
        })
        .catch(err => {
          console.log('err', err)
        })
    },
    // 新增数据
    _addData() {
      this.saveLoading = true
      const params = {
        announcement: '',
        classId: '',
        createName: '',
        id: '',
        status: this.xForm.status ? 1 : 0,
        imageUrl: this.xForm.imgUrl,
        merCode: '',
        positionCode: this.positionCode,
        remark: this.xForm.remark,
        productId: null, // 2-03 类型必填
        sortNumber: this.xForm.sort === '' ? null : this.xForm.sort,
        url: this.xForm.linkUrl
      }
      console.log('add params', params)
      addPageSet(params)
        .then(res => {
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
          setTimeout(() => {
            this.saveLoading = false
          }, 500)
        })
        .catch(err => {
          console.log('err', err)
          this.saveLoading = false
        })
    },
    // 修改数据
    _editData() {
      this.saveLoading = true
      const params = {
        announcement: '',
        classId: '',
        createName: '',
        status: this.xForm.status ? 1 : 0,
        id: this.xForm.id,
        imageUrl: this.xForm.imgUrl,
        merCode: '',
        positionCode: this.positionCode,
        remark: this.xForm.remark,
        productId: null, // 2-03 类型必填
        sortNumber: this.xForm.sort === '' ? null : this.xForm.sort,
        url: this.xForm.linkUrl
      }
      editPageSet(params)
        .then(res => {
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
          setTimeout(() => {
            this.saveLoading = false
          }, 500)
        })
        .catch(err => {
          console.log('err', err)
          this.saveLoading = false
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
