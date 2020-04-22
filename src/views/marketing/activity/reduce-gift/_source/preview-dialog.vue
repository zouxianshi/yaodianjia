<template>
  <el-dialog
    title="预览"
    custom-class="preview-diaglog"
    center
    :append-to-body="true"
    :visible.sync="dialogVisible"
    width="500px"
  >
    <!-- <el-input v-model="item.input3" placeholder="请输入内容" disabled class="input-with-select">
      <el-button slot="append" type="primary" @click="doCopy('www.baidu.com')">复制连接</el-button>
    </el-input>-->
    <div class="post-img-wrap">
      <div ref="img_wrapper" class="img_wrapper">
        <img :src="poster">
        <div class="activity-store">益丰大药房</div>
        <div class="activity-title">满减专场</div>
        <div class="activity-desc">爆款商品限时限量优惠</div>
        <!-- <div class="activity-time">活动时间：2020.02.11至2020.04.18</div> -->
        <div class="qcodeimg">
          <img :src="qcode">
        </div>
        <div class="activity-info">扫码参加活动</div>
      </div>
      <div class="action">
        <el-button
          style="margin-bottom: 10px"
          plain
          :loading="downLoding"
          type="primary"
          @click="downPoster"
        >下载海报</el-button>
        <a :href="qcode" download="二维码.png">
          <el-button plain type="primary">下载二维码</el-button>
        </a>
        <el-button
          slot="append"
          style="margin-top: 10px"
          type="success"
          @click="doCopy(activityUrl)"
        >复制活动连接</el-button>
      </div>
    </div>
    <!-- <span slot="footer" class="dialog-footer">
      <a :href="item.qcode" download="二维码.png">
        <el-button plain type="primary">下载二维码</el-button>
      </a>
      <el-button plain :loading="downLoding" type="primary" @click="downPoster">下载海报</el-button>
    </span>-->
  </el-dialog>
</template>

<script>
import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
import html2canvas from 'html2canvas'
import poster from '@/assets/image/acvity/poster.png'
import QRCode from 'qrcode'
import { mapGetters } from 'vuex'
Vue.use(VueClipboard)
export default {
  computed: {
    ...mapGetters(['merCode'])
  },
  data() {
    return {
      dialogVisible: false,
      downLoding: false,
      poster,
      qcode: '',
      activityUrl: `${this.h5Base}activity/discount/index?merCode=${this.merCode}&from=plantform`
    }
  },
  created() {
    QRCode.toDataURL(`${this.h5Base}activity/discount/index?merCode=${this.merCode}&from=plantform`)
      .then(url => {
        console.log(url)
        this.qcode = url
      })
      .catch(err => {
        console.error(err)
      })
  },
  methods: {
    open() {
      console.log('1111111111111')
      this.dialogVisible = true
    },
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
    // margin: 20px 0;
    // padding: 10px;
    // border: 1px solid #ddd;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    .img_wrapper {
      position: relative;
      img {
        width: 100%;
        height: 100%;
        display: block;
      }
      .qcodeimg {
        position: absolute;
        left: 50%;
        bottom: 60px;
        transform: translate(-50%, 0);
        img {
          width: 160px;
          height: 160px;
        }
      }
      .activity-store {
        font-size: 18px;
        font-weight: 500;
        position: absolute;
        top: 19px;
        left: 50%;
        transform: translate(-24%, 0);
        color: #fff;
      }
      .activity-title {
        position: absolute;
        top: 104px;
        left: 50%;
        transform: translate(-50%, 0);
        font-size: 24px;
        color: #fc6963;
        white-space: nowrap;
      }
      .activity-desc {
        position: absolute;
        top: 140px;
        left: 50%;
        transform: translate(-50%, 0);
        font-size: 14px;
        color: #dd9b7e;
        white-space: nowrap;
      }
      .activity-time {
        position: absolute;
        top: 170px;
        left: 50%;
        transform: translate(-50%, 0);
        line-height: 24px;
        padding: 0 10px;
        font-size: 12px;
        color: #999;
        white-space: nowrap;
        border: 1px solid rgba(255, 239, 232, 1);
      }
      .activity-info {
        color: #ffd0d0;
        line-height: 30px;
        font-size: 14px;
        text-align: center;
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translate(-50%, 0);
      }
    }
    .action {
      margin-left: 10px;
    }
  }
}
</style>
