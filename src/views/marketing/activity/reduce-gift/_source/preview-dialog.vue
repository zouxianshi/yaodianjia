<template>
  <span>
    <el-button type="text" @click="dialogVisible=true">预览</el-button>
    <el-dialog
      title="预览"
      custom-class="preview-diaglog"
      center
      :append-to-body="true"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-input v-model="item.input3" placeholder="请输入内容" disabled class="input-with-select">
        <el-button slot="append" type="primary" @click="doCopy('www.baidu.com')">复制连接</el-button>
      </el-input>
      <div class="post-img-wrap">
        <div ref="img_wrapper">
          <img :src="require('@/assets/image/acvity/limit-preferential.png')">
          <div class="qcodeimg">
            <img :src="item.qcode">
            <div class="title">扫码参加活动</div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <a :href="item.qcode" download="二维码.png">
          <el-button plain type="primary">下载二维码</el-button>
        </a>
        <el-button plain :loading="downLoding" type="primary" @click="downPoster">下载海报</el-button>
      </span>
    </el-dialog>
  </span>
</template>

<script>
import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
import html2canvas from 'html2canvas'
Vue.use(VueClipboard)
export default {
  props: {
    item: {
      type: Object,
      default() {
        return {
          input3: 'www.baidu.com',
          qcode:
            'data:image/jpg;base64,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'
        }
      }
    }
  },
  data() {
    return {
      dialogVisible: false,
      downLoding: false
    }
  },
  methods: {
    // 复制
    doCopy(row) {
      this.$copyText(row).then(
        e => {
          console.log(e)
          this.$message.success('复制成功')
        },
        e => {
          console.log(e)
          this.$message.warning('复制失败')
        }
      )
    },
    downPoster() {
      this.downLoding = true
      html2canvas(this.$refs.img_wrapper, {
        width: this.$refs.img_wrapper.clientWidth, // 设置canvas尺寸与所截图尺寸相同，防止白边
        height: this.$refs.img_wrapper.clientHeight // 防止白边
      })
        .then(canvas => {
          // this.postBase64 = canvas.toDataURL()
          const a = document.createElement('a') // 创建a标签
          a.setAttribute('download', '海报.png') // download属性
          a.setAttribute('href', canvas.toDataURL()) // href链接
          a.click() // 自执行点击事件
          this.downLoding = false
        })
        .catch(error => {
          console.log('error', error)
          this.downLoding = false
        })
    }
  }
}
</script>

<style lang="scss">
.preview-diaglog {
  .el-input-group__append {
    background: #147de8;
    color: #fff;
  }
  .post-img-wrap {
    margin: 20px 0;
    padding: 10px;
    border: 1px solid #ddd;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
    .qcodeimg {
      position: absolute;
      left: 50%;
      bottom: 20px;
      transform: translate(-50%, 0);
      img {
        width: 100px;
        height: 100px;
      }
      .title {
        color: #fff;
        line-height: 30px;
        text-align: center;
      }
    }
  }
}
</style>
