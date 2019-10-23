<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-button class="btn btn-add" type="primary" @click.stop="handleAdd()">添加轮播图</el-button>
      <section @keydown.enter="search()">
        <div class="search-form" style="margin-top:20px;margin-bottom:10px">
          <div class="search-item">
            <span class="label-name">有效时间</span>
            <el-date-picker
              v-model="dateRange"
              size="small"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </div>
          <div class="search-item">
            <span class="label-name" style="width: 50px">状态</span>
            <el-select
              v-model="searchForm.status"
              size="small"
              placeholder="使用状态"
              style="width: 120px"
            >
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              />
            </el-select>
          </div>
          <div class="search-item">
            <span class="label-name" style="width: 50px">备注</span>
            <el-input v-model.trim="searchForm.notes" size="small" style="width: 200px" />
          </div>
          <div class="search-item">
            <el-button size="small" @click="search()">查 询</el-button>
          </div>
        </div>
      </section>
      <section class="table-box">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="index" label="序号" width="50">
            <template slot-scope="scope">
              <span>{{ scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="img" label="图片" width="180">
            <template slot-scope="scope">
              <img :src="scope.img">
            </template>
          </el-table-column>
          <el-table-column prop="url" label="链接地址" width="300" />
          <el-table-column prop="timeBeg" label="开始时间" width="200" />
          <el-table-column prop="timeEnd" label="结束时间" width="200" />
          <el-table-column label="状态" width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.status==1">正常</span>
              <span v-if="scope.row.status==0">停用</span>
            </template>
          </el-table-column>
          <el-table-column prop="notes" label="备注" width="200" />
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click.stop="handleEdit(scope.row)">编辑</el-button>
              <el-button type="danger" size="small" @click.stop="handleEdit(scope.row)">停用</el-button>
              <el-button type="danger" size="small" @click.stop="handleEdit(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </section>
    </div>
    <el-dialog title="添加轮播图" append-to-body :visible.sync="dialogFormVisible" width="800px">
      <div class="x-dialog-body">
        <div class="form-box">
          <el-form :model="xForm">
            <el-form-item label="图片" :label-width="formLabelWidth">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleUploadSuccess"
                :before-upload="beforeUpload"
              >
                <img v-if="xForm.imageUrl" :src="xForm.imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
              <p class="note-grey">建议尺寸750*300像素，每张图片大小限制在80kb以内</p>
            </el-form-item>
            <el-form-item label="设置链接" :label-width="formLabelWidth">
              <el-input v-model="xForm.linkUrl" size="small" autocomplete="off" style="width: 350px" />
            </el-form-item>
            <el-form-item label="时间段" :label-width="formLabelWidth">
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
                @change="handleTimeChange"
              />
            </el-form-item>
            <el-form-item label="序号" :label-width="formLabelWidth">
              <el-input v-model="xForm.sort" size="small" autocomplete="off" style="width: 350px" />
            </el-form-item>
            <el-form-item label="备注" :label-width="formLabelWidth">
              <el-input v-model="xForm.remark" size="small" autocomplete="off" placeholder="备注" style="width: 350px" />
            </el-form-item>
          </el-form>
        </div>
        <div class="preview-box">
          <p><strong>内容位置：</strong> 首页-轮播图</p>
          <div class="prview-pic">
            <img src="">
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" size="small" @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getTableList, getPageSetDetail, addPageSet } from '../../api/wxmall'

export default {
  name: 'Home',
  data() {
    return {
      currentRole: 'adminDashboard',
      dateRange: '',
      statusOptions: [
        { id: 1, name: '使用', value: '1' },
        { id: 0, name: '停用', value: '0' }
      ],
      searchForm: {
        timeBeg: '', // 开始时间
        timeEnd: '', // 结束时间
        status: '', // 使用状态
        notes: '' // 备注
      },
      tableData: [
        {
          img: '../img.png',
          url: 'http://wwww.yaodianjia.com?sid=1111',
          timeBeg: '2016-05-02 00:00:00',
          timeEnd: '2016-05-03 00:00:00',
          status: 1,
          notes: '品牌XX广告'
        },
        {
          img: '../img.png',
          url: 'http://wwww.yaodianjia.com?sid=1111',
          timeBeg: '2016-05-02 00:00:00',
          timeEnd: '2016-05-03 00:00:00',
          status: 0,
          notes: '品牌XX广告'
        },
        {
          img: '../img.png',
          url: 'http://wwww.yaodianjia.com?sid=1111',
          timeBeg: '2016-05-02 00:00:00',
          timeEnd: '2016-05-03 00:00:00',
          status: 0,
          notes: '品牌XX广告'
        },
        {
          img: '../img.png',
          url: 'http://wwww.yaodianjia.com?sid=1111',
          timeBeg: '2016-05-02 00:00:00',
          timeEnd: '2016-05-03 00:00:00',
          status: 1,
          notes: '品牌XX广告'
        }
      ],
      dialogFormVisible: false,
      classId: '1-02', // 轮播类型
      xForm: {
        id: '',
        imgUrl: '',
        linkUrl: '',
        dateRange: '',
        startTime: '',
        endTime: '',
        sort: '',
        remark: ''
      },
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
      this._getTableList()
    },
    handleTimeChange(val) {
      if (val && val.length === 2) {
        this.xForm.startTime = val[0]
        this.xForm.endTime = val[1]
      }
    },
    // 表单重置
    formReset() {
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
    },
    handleAdd() {
      this.formReset()
      this.dialogFormVisible = true
    },
    handleSubmit() {
      // 表单验证
      if (this.xForm.id === '') {
        // 新增
        this._addData()
      } else {
        // 修改
        this._editData()
      }
    },
    // 获取列表数据
    _getTableList() {
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
      getTableList(params).then(res => {
        console.log('res-1', res)
      }).catch(err => {
        console.log('err', err)
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
      getPageSetDetail(params).then(res => {
        console.log('res-1', res)
      }).catch(err => {
        console.log('err', err)
      })
    },
    // 新增数据
    _addData() {
      const params = {
        announcement: '',
        classId: this.classId,
        createName: '',
        endTime: this.xForm.endTime,
        id: '',
        imageUrl: '',
        merCode: '',
        positionCode: '',
        remark: this.xForm.remark,
        // productId: null, // 2-03 类型必填
        sortNumber: this.xForm.sort,
        startTime: this.xForm.startTime,
        url: this.xForm.linkUrl
      }
      console.log('add params', params)
      addPageSet(params).then(res => {
        console.log('res-1', res)
      }).catch(err => {
        console.log('err', err)
      })
    },
    // 修改数据
    _editData() {
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
      addPageSet(params).then(res => {
        console.log('res-1', res)
      }).catch(err => {
        console.log('err', err)
      })
    },
    // 查询
    search() {
      // getGoodsList(this.searchForm).then(res => {
      //   this.tableData = res.data
      // }).catch(() => {
      // })
    },
    getScopeData(scope) {
      console.log('scope', scope)
    },
    handleEdit(row) {
      console.log('row', row)
      this.dialogFormVisible = true
    },
    handleUploadSuccess($event) {
      console.log($event)
      // this.imageUrl = URL.createObjectURL(file.raw)
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
    }
  }
}
</script>
<style lang="scss">
.app-container{
  position: relative;
  z-index: 100;
}
.x-dialog-body {
  width: 100%;
  display: flex;
  .form-box{
    flex: 1;
  }
  .preview-box {
    flex: 0 0 300px;
    .prview-pic{
      margin-top: 20px;
      width: 100%;
      height: 500px;
      background: blueviolet;
    }
  }
  .test-1{
    color: red;
  }
}
</style>
