<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-button class="btn btn-add" type="primary" size="small">添加公告</el-button>
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
            <el-button size="small" @click="search()">查 询</el-button>
          </div>
        </div>
      </section>
      <section class="table-box">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="index" label="序号" width="60" align="center">
            <template slot-scope="scope">
              <span>{{ scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="img" label="所属分类" min-width="150" align="center" />
          <el-table-column prop="url" label="图片" min-width="120" align="center" />
          <el-table-column prop="url" label="链接地址" min-width="200" align="center" />
          <el-table-column prop="timeBeg" label="开始时间" width="200" align="center" />
          <el-table-column prop="timeEnd" label="结束时间" width="200" align="center" />
          <el-table-column label="状态" width="100" align="center">
            <template slot-scope="scope">
              <sapn v-if="scope.row.status==1">正常</sapn>
              <sapn v-if="scope.row.status==0">停用</sapn>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="280" align="center">
            <template slot-scope="scope">
              <el-button plain size="mini" type="primary" @click.stop="handleEdit(scope.row)">编辑</el-button>
              <el-button plain size="mini" type="warning" @click.stop="handleEdit(scope.row)">停用</el-button>
              <el-button plain size="mini" type="danger" @click.stop="handleEdit(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </section>
    </div>
    <el-dialog title="添加分类广告" append-to-body :visible.sync="dialogFormVisible" width="800px">
      <div class="x-dialog-body">
        <div class="form-box">
          <el-form :model="form">
            <el-form-item label="所属分类" />
            <el-form-item label="图片" :label-width="formLabelWidth">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
              <p class="note-grey">建议尺寸750*300像素，每张图片大小限制在80kb以内</p>
            </el-form-item>
            <el-form-item label="设置链接" :label-width="formLabelWidth">
              <el-input v-model="form.linkUrl" size="small" autocomplete="off" style="width: 350px" />
            </el-form-item>
            <el-form-item label="时间段" :label-width="formLabelWidth">
              <el-date-picker
                v-model="form.dateRange"
                style="width: 350px"
                size="small"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
            </el-form-item>
            <el-form-item label="序号" :label-width="formLabelWidth">
              <el-input v-model="form.index" autocomplete="off" style="width: 350px" />
            </el-form-item>
          </el-form>
        </div>
        <div class="preview-box">
          <p><strong>内容位置：</strong> 分类-轮播图</p>
          <div class="prview-pic">
            <img src="">
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" size="small" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

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
      dialogFormVisible: true,
      form: {
        id: '',
        imgUrl: '',
        linkUrl: '',
        dateRange: '',
        dateStart: '',
        dateEnd: '',
        index: false,
        type: [],
        notes: ''
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
    // 发卡机上岛咖啡
  },
  methods: {
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
    }
  }
}
</script>
<style lang="scss" scoped>
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
