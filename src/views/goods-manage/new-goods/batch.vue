<template>
  <div class="app-container">
    <div class="batch-wrapper">
      <div class="note_napl">因为批量创建新品无法上传图片，所以创建成功的中西医药、营养保健和医疗器械类新品会进入新品申请页面的
        <a href="#/goods-manage/apply-record">
          <button
            type="button"
            class="el-button el-button--text"
          >
            <span>未提交审核</span>
          </button>
        </a>
        列表中，需完善信息后再提交审核，通过审核后将导入产品库，其它品类的新品创建成功后会直接导入产品库。
      </div>
      <section class="batch-cnt-card">
        <div class="upfile">
          <el-upload
            ref="file"
            class="upload-demo"
            :action="uploadUrl"
            name="excelFile"
            :headers="headers"
            :on-success="handleFileSuccess"
            :on-error="handleFileError"
            :before-upload="beforeUpload"
          >
            <el-button
              size="small"
              type="primary"
              icon="el-icon-upload"
            >上传模板</el-button>
          </el-upload>
        </div>
        <ul class="template-list">
          <li class="zxy">
            <div class="m">
              <div class="name">中西医药模板.xls</div> <a
                href="https://centermerchant-prod.oss-cn-shanghai.aliyuncs.com/template/%E4%B8%AD%E8%A5%BF%E5%8C%BB%E8%8D%AF%E6%A8%A1%E6%9D%BF.xls"
                download="中西医药模板.xls"
              ><button
                type="button"
                class="el-button el-button--default el-button--small"
              >
                <span>点击下载</span></button></a>
            </div>
          </li>
          <li class="yxbj">
            <div class="m">
              <div class="name">营养保健模板.xls</div> <a
                href="https://centermerchant-prod.oss-cn-shanghai.aliyuncs.com/template/%E8%90%A5%E5%85%BB%E4%BF%9D%E5%81%A5%E6%A8%A1%E6%9D%BF.xls"
                download="营养保健模板.xls"
              ><button
                type="button"
                class="el-button el-button--default el-button--small"
              >

                <span>点击下载</span></button></a>
            </div>
          </li>
          <li class="yl">
            <div class="m">
              <div class="name">医疗器械模板.xls</div> <a
                href="https://centermerchant-prod.oss-cn-shanghai.aliyuncs.com/template/%E5%8C%BB%E7%96%97%E5%99%A8%E6%A2%B0%E6%A8%A1%E6%9D%BF.xls"
                download="医疗器械模板.xls"
              ><button
                type="button"
                class="el-button el-button--default el-button--small"
              >

                <span>点击下载</span></button></a>
            </div>
          </li>
          <li class="qt">
            <div class="m">
              <div class="name">其它模板.xls</div> <a
                href="https://centermerchant-prod.oss-cn-shanghai.aliyuncs.com/template/%E5%85%B6%E4%BB%96%E6%A8%A1%E6%9D%BF.xls"
                download="其它模板.xls"
              ><button
                type="button"
                class="el-button el-button--default el-button--small"
              >
                <span>点击下载</span></button></a>
            </div>
          </li>
        </ul>
        <div class="table-box">
          <p style="margin-bottom:12px;color:#333;display:flex;justify-content: space-between;">
            <span>本次批量创建结果如下：</span>
            <el-button type="primary" size="small" @click="_loadFileResultList">刷新</el-button>
          </p>
          <el-table :data="tableData">
            <el-table-column label="品类">
              <template slot-scope="scope">
                <span v-if="scope.row.firstTypeId==='1065279ca65a4a529109f82472f11053'">中西医药</span>
                <span v-else-if="scope.row.firstTypeId==='fb5e6c99d2a24eb79dae4350d9bfa837'">营养保健</span>
                <span v-else-if="scope.row.firstTypeId==='a99917a7c7254ac281e844acf1610657'">医疗器械</span>
                <span v-else>其他</span>
              </template>
            </el-table-column>
            <el-table-column label="创建结果">
              <template slot-scope="scope">
                <p>成功数量：{{ scope.row.success }}  <a v-if="scope.row.success>0" :href="'#/goods-manage/apply-record'"><el-button type="text" size="mini">去完善信息</el-button></a></p>
                <p>失败数量：{{ scope.row.fail }}</p>
              </template>
            </el-table-column>
            <el-table-column label="导入时间" prop="createTime" />
            <!-- <el-table-column label="失败原因" prop="reason" /> -->
            <el-table-column label="操作">
              <template slot-scope="scope">
                <template v-if="scope.row.failPath">
                  <el-button type="" size="mini" @click="handleDowload(scope.row)">失败结果下载</el-button>
                </template>
                <!-- <template v-else>
                  <a :href="'#/goods-manage/apply-record'"><el-button type="primary" size="mini">去完善信息</el-button></a>
                </template> -->
              </template>
            </el-table-column>
          </el-table>
          <pagination
            :total="total"
            :page.sync="listQuery.currentPage"
            :limit.sync="listQuery.pageSize"
            @pagination="_loadFileResultList"
          />
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import config from '@/utils/config'
import { getUploadFileList } from '@/api/new-goods'
import { mapGetters } from 'vuex'
import Pagination from '@/components/Pagination'
import mixins from '@/utils/mixin'
export default {
  components: { Pagination },
  mixins: [mixins],
  data() {
    return {
      tableData: [],
      listQuery: {
        currentPage: 1,
        pageSize: 20
      }
    }
  },
  beforeRouteLeave(to, from, next) { // 路由离开关闭标签
    this.$store
      .dispatch('tagsView/delView', from)
    next()
  },
  computed: {
    ...mapGetters(['merCode', 'token']),
    uploadUrl() {
      return `${this.uploadFileURL}${config.merGoods}/1.0/commodity/_batCreat?merCode=${this.merCode}`
    },
    headers() {
      return { 'Authorization': this.token }
    }
  },
  created() {
    this._loadFileResultList()
  },
  methods: {
    beforeUpload(file) {
      const type = file.name.split('.')
      if (type[1] !== 'xls') {
        this.$message({
          message: '请上传正确的模板',
          type: 'warning'
        })
        this.is_file = false
        return false
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传文件大小不能超过 2MB!')
        return false
      }
      return true
    },
    handleFileSuccess(res) {
      if (res.code === '10000') {
        this.$message({
          message: '上传成功',
          type: 'success'
        })
        this._loadFileResultList()
      } else {
        this.$message({
          message: res.msg,
          type: 'error'
        })
      }
      this.$refs.file.clearFiles()
    },
    handleFileError(row) {
      const data = JSON.parse(row.toString().replace('Error:', ''))
      if (data.code === 40301) {
        location.reload()
      } else {
        this.$message({
          message: '文件上传失败',
          type: 'error'
        })
        this.$refs.file.clearFiles()
      }
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleDowload(row) {
      var elemIF = document.createElement('iframe')
      elemIF.src = this.showImg(row.failPath)
      elemIF.style.display = 'none'
      document.body.appendChild(elemIF)
    },
    _loadFileResultList() {
      getUploadFileList(this.listQuery).then(res => {
        this.tableData = res.data.data
        this.total = res.data.totalCount
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.batch-wrapper {
  .note_napl {
    width: 100%;
    height: auto;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    color: #666;
    line-height: 20px;
    padding: 10px 15px;
    border-radius: 2px;
    font-size: 12px;
    button {
      font-size: 12px;
    }
  }
  .batch-cnt-card {
    margin-top: 12px;
    padding: 12px 20px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    .template-list {
      width: 100%;
      height: 120px;
      display: flex;
      margin-top: 15px;
      li {
        &:first-child {
          padding-left: 0;
          padding-right: 10px;
        }
        width: 25%;
        flex-grow: 1;
        padding: 0 5px;
        .m {
          width: 100%;
          height: 100%;
          text-align: center;
          padding-top: 14px;
        }
        .name {
          height: 44px;
          line-height: 44px;
          font-size: 20px;
          color: #fff;
        }
        a {
          display: block;
          margin-top: 8px;
        }
        &.zxy {
          .m {
            background: linear-gradient(45deg, #3396e9, #30c5e1);
          }
        }
        &.yxbj {
          .m {
            background: linear-gradient(45deg, #96c, #dc90d5);
          }
        }
        &.yl {
          .m {
            background: linear-gradient(45deg, #f5ca35, #f6cf4a);
          }
        }
        &.qt {
          .m {
            background: linear-gradient(45deg, #04cc75, #52da59);
          }
        }
      }
    }
  }
}
</style>
