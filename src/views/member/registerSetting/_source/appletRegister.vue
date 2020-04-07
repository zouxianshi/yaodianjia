<template>
  <div class="applers-index-model">
    <div class="applers-header-model">微信小程序注册</div>
    <div class="applers-contain-model">
      <el-row>
        <el-col :span="5" class="applers-contain-adress">小程序二维码:</el-col>
        <el-col :span="9">
          <img v-show="programData.showImg" :src="programData.programImg" class="applers-image-model">
        </el-col>
        <el-col :span="8">
          <div class="applers-button-model applers-load-model" @click="downloadIamge">
            下载二维码
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="applers-contain-model">
      <el-row class="applers-url-model">
        <el-col :span="5" class="applers-contain-adress">小程序地址:</el-col>
        <el-col :span="16">
          <div>{{ programData.programUrl }}</div>
        </el-col>
        <el-col :span="3">
          <div v-clipboard:error="onError" v-clipboard:copy="programData.programUrl" v-clipboard:success="onCopy" class="applers-button-model">
            复制连接
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="applers-contain-model">
      <el-row>
        <el-col :span="24" class="applers-contain-adress">小程序注册说明:</el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="applers-Explain-model">
            <ul>
              <li>
                <span>1.</span>
                您可将小程序内链至微信公众号菜单，顾客关注公众号后，可通过菜单进入小程序
              </li>
              <li>
                <span>2.</span>
                您可将小程序内链至会员卡引导菜单，顾客领取微信会员卡，可通过引导菜单进入小程序
              </li>
              <li>
                <span>3.</span>
                您可下载小程序二维码，应用到顾客可扫指使用的场景
              </li>
            </ul>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import VueClipboard from 'vue-clipboard2'
import Vue from 'vue'
Vue.use(VueClipboard)
import { mapGetters } from 'vuex'
import { getQrcode } from '@/api/memberService'
export default {
  name: 'AppleRs',
  components: {},
  props: {},
  data() {
    return {
      programData: {
        programUrl: '',
        programImg: '',
        showImg: false
      }
    }
  },
  computed: {
    ...mapGetters(['merCode'])
  },
  watch: {},
  beforeCreate() {},
  created() {
    getQrcode({ merCode: this.merCode }).then(res => {
      this.programData.programUrl = res.data[0]
      this.programData.programImg = res.data[1]
      this.programData.showImg = true
    }).catch(() => {
    })
  },
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  methods: {
    // 下载二维码
    downloadIamge() {
      var alink = document.createElement('a')
      alink.href = this.programData.programImg
      alink.download = 'pic' // 图片名
      alink.click()
    },
    onCopy(e) {
      this.$message({
        message: '复制成功！',
        type: 'success'
      })
    },
    // 复制失败
    onError(e) {
      this.$message({
        message: '复制失败！',
        type: 'error'
      })
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
.applers-index-model {
  background: #ffffff;
  padding: 10px;
  .applers-header-model {
    font-size: 16px;
    border-bottom: 2px solid #eeeeee;
    padding-bottom: 10px;
    padding-left: 20px;
  }
  .applers-contain-model {
    padding: 20px 0px 0px 96px;
    font-size: 14px;
     .applers-contain-adress{
      margin:10px 0;
      font-weight: 600;
    }
    .applers-image-model {
      width: 200px;
      height: 200px;
      padding: 10px;
    }
    .applers-button-model {
      color: #1890FF;
    }
    .applers-load-model{
      padding-top:170px;
    }
    .applers-button-model:hover{
      cursor:pointer
    }
    .applers-url-model {
      margin-top: 5px;
      padding: 10px;
      display: flex;
      align-items: center;
    }
    .applers-Explain-model {
      margin-top: 5px;
      padding: 10px;
      font-size: 14px;
      background: #F1F1F1;
      .c-index {
        display: inline-block;
        border-radius: 100%;
        padding: 1px 0;
        color: #fff;
        font-size: 12px;
        width: 14px;
        line-height: 100%;
        text-align: center;
        background-color: #497FFE;
      }
      li{
        line-height: 24px;
      }
    }
  }
}
</style>
