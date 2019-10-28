<template>
  <div class="app-container">
    <div class="batch-wrapper">
      <div class="note_napl">因为批量创建新品无法上传图片，所以创建成功的中西医药、营养保健和医疗器械类新品会进入新品申请页面的
        <a href="#/new_apply_jl/wtj">
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
                href="static/doc/xp_zhongxiyi.xls"
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
                href="static/doc/xp_yingyang.xls"
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
                href="static/doc/xp_yiliao.xls"
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
                href="static/doc/xp_qita.xls"
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
          <p style="margin-bottom:12px;color:#333">本次批量创建结果如下：</p>
          <el-table :data="tableData">
            <el-table-column label="品类" />
            <el-table-column label="创建结果" />
            <el-table-column label="数量" />
            <el-table-column label="操作" />
          </el-table>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import config from '@/utils/config'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      tableData: []
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

  },
  methods: {
    handleFileSuccess(res) {
      if (res.code === '10000') {
        this.$message({
          message: '上传成功',
          type: 'success'
        })
      } else {
        this.$message({
          message: res.msg,
          type: 'error'
        })
      }
      this.$refs.file.clearFiles()
    },
    handleFileError(res) {
      this.$message({
        message: '文件上传失败',
        type: 'error'
      })
      this.$refs.file.clearFiles()
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
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
