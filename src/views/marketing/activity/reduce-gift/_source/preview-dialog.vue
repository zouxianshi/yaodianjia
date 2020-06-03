<template>
  <el-dialog
    title="推广设置"
    custom-class="preview-diaglog"
    center
    :append-to-body="true"
    :visible.sync="dialogVisible"
    width="500px"
  >
    <!-- 无海报的分享下载情况 -->
    <el-input v-model="activityUrl" placeholder="请输入内容" disabled class="input-with-select">
      <el-button slot="append" type="primary" @click="doCopy(activityUrl)">复制连接</el-button>
    </el-input>
    <div class="qcodeimg">
      <img :src="qcode">
    </div>
    <span slot="footer" class="dialog-footer">
      <a :href="qcode" download="二维码.png">
        <el-button plain type="primary">下载二维码</el-button>
      </a>
    </span>
  </el-dialog>
</template>

<script>
import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
// import html2canvas from 'html2canvas'
import poster from '@/assets/image/acvity/poster.png'
import storeIcon from '@/assets/image/acvity/store_icon.png'
// import { merchantDetail } from '@/api/merchant_Person_Api'
import QRCode from 'qrcode'
import { mapGetters } from 'vuex'
Vue.use(VueClipboard)
export default {
  data() {
    return {
      dialogVisible: false,
      downLoding: false,
      poster,
      storeIcon,
      qcode: '',
      // merName: '',
      type: '',
      activityUrl: ''
    }
  },
  computed: {
    ...mapGetters(['merCode'])
  },
  created() {
  },
  methods: {
    open(type) {
      this.type = type
      this.dialogVisible = true
      let activityUrl = ''
      if (type === 'reduceGift') {
        activityUrl = `${this.$store.state.user.h5Url}activity/discount/index?merCode=${this.merCode}&actFrom=plantform`
      } else if (type === 'spellGroup') {
        activityUrl = `${this.$store.state.user.h5Url}assemble/home/index?merCode=${this.merCode}&actFrom=plantform`
      }
      this.activityUrl = activityUrl
      QRCode.toDataURL(activityUrl)
        .then(url => {
          console.log(url)
          this.qcode = url
        })
        .catch(err => {
          console.error(err)
        })
      // merchantDetail().then(res => {
      //   console.log('获取了商家信息------------', res)
      //   this.merName = res.data.merName
      // })
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
    }
    // downPoster() {
    //   this.downLoding = true
    //   html2canvas(this.$refs.img_wrapper, {
    //     width: this.$refs.img_wrapper.clientWidth, // 设置canvas尺寸与所截图尺寸相同，防止白边
    //     height: this.$refs.img_wrapper.clientHeight // 防止白边
    //   })
    //     .then(canvas => {
    //       // this.postBase64 = canvas.toDataURL()
    //       const a = document.createElement('a') // 创建a标签
    //       a.setAttribute('download', '海报.png') // download属性
    //       a.setAttribute('href', canvas.toDataURL()) // href链接
    //       a.click() // 自执行点击事件
    //       this.downLoding = false
    //     })
    //     .catch(error => {
    //       console.log('error', error)
    //       this.downLoding = false
    //     })
    // }
  }
}
</script>

<style lang="scss">
.text-overflow-1 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.preview-diaglog {
  .el-input-group__append {
    background: #147de8;
    color: #fff;
  }
  .qcodeimg {
    text-align: center;
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
      overflow: hidden;
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
        max-width: 80%;
        top: 19px;
        left: 50%;
        transform: translate(-50%, 0);
        color: #fff;
        white-space: nowrap;
        display: flex;
        flex-direction: row;
        align-items: center;
        .icon {
          width: 30px;
          height: 30px;
          flex: 0 0 30px;
        }
        span {
          flex: 1;
          @extend .text-overflow-1;
        }
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
