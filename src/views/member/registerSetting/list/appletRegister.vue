<template>
  <div class="applers-index-model">
    <div class="applers-header-model">微信小程序注册</div>
    <div class="applers-contain-model">
      <el-row>
        <el-col :span="24">小程序二维码:</el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <img src="./../../../../assets/image/template_bg.png" class="applers-image-model">
          <div class="applers-button-model">
            <el-button size="mini">下载二维码</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="applers-contain-model">
      <el-row>
        <el-col :span="24">小程序地址:</el-col>
      </el-row>
      <el-row class="applers-url-model">
        <el-col :span="12">
          <div>1</div>
        </el-col>
        <el-col :span="12">
          <el-button size="mini">复制连接</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="applers-contain-model">
      <el-row>
        <el-col :span="24">小程序注册说明:</el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="applers-Explain-model">
            <ul>
              <li>
                <span class="c-index">1</span>
                您可将小程序内链至微信公众号菜单，顾客关注公众号后，可通过菜单进入小程序
              </li>
              <li>
                <span class="c-index">2</span>
                您可将小程序内链至会员卡引导菜单，顾客领取微信会员卡，可通过引导菜单进入小程序
              </li>
              <li>
                <span class="c-index">3</span>
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
export default {
  name: 'AppleRs',
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  methods: {}
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
  }
  .applers-contain-model {
    padding: 10px 10px;
    font-size: 14px;
    .applers-image-model {
      width: 200px;
      height: 200px;
      padding: 10px;
    }
    .applers-button-model {
      padding-left: 60px;
    }
    .applers-url-model {
      margin-top: 5px;
      padding: 10px;
      background: #f5f7fa;
    }
    .applers-Explain-model {
      margin-top: 5px;
      padding: 10px;
      font-size: 14px;
      .c-index {
        display: inline-block;
        border-radius: 100%;
        padding: 1px 0;
        color: #fff;
        width: 14px;
        line-height: 100%;
        text-align: center;
        background-color: #8eb9f5;
      }
      li{
        line-height: 24px;
      }
    }
  }
}
</style>
