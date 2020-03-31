<template>
  <div class="AemberCard-index-model">
    <div class="AemberCard-header-model">
      微信会员卡
      <el-button size="mini" @click="handleEdit">编辑会员卡</el-button>
    </div>
    <div class="AemberCard-contain-model">
      <el-row>
        <el-col :span="16">
          <div class="AemberCard-image-model">
            <el-row>
              <el-col :span="6">
                <img src="./../../../../assets/image/template_bg.png" alt="" class="AemberCard-image-url">
              </el-col>
              <el-col :span="18" class="AemberCard-image-detail">
                <div>海典智慧药店-直营店</div>
                <div>演示会员</div>
              </el-col>
            </el-row>
            <el-row class="AemberCard-image-bottom">
              <el-col :span="18" class="AemberCard-image-number">
                <div>888 888 88</div>
              </el-col>
              <el-col :span="6">
                <div class="AemberCard-image-icon">1</div>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <!-- <el-col :span="8">
          <ul>
            <li>
              海典智慧药店-直营店
              <el-button size="mini">编辑</el-button>
            </li>
            <li>会员卡标题：演示会员</li>
            <li>默认发卡机构：海典智慧药店总店</li>
            <li>使用须知：</li>
            <li>1、这里是使用须知内容文字，文字内容自定义</li>
            <li>2、这里是使用须知内容文字，文字内容自定义 </li>
            <li>3、这里是使用须知内容文字，文字内容自定义</li>
          </ul>
        </el-col>-->
      </el-row>
    </div>
    <div class="AemberCard-contain-model">
      <el-row class="AemberCard-url-model">
        <el-col :span="12">
          <div>1</div>
        </el-col>
        <el-col :span="12">
          <el-button size="mini">复制连接</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="AemberCard-contain-model">
      <el-row>
        <el-col :span="24">微信会员卡开卡说明:</el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="AemberCard-Explain-model">
            <ul>
              <li>
                <span class="c-index">1</span>
                您需要在【渠道管理-微信公众号】授权给我们，授权后可编辑会员卡信息。
              </li>
              <li>
                <span class="c-index">2</span>
                顾客通过微信公众号注册为会员，既可领取会员卡信息。
              </li>
              <li>
                <span class="c-index">3</span>
                您可将会员领卡地址内链至微信公众号菜单，会员可通过菜单领取会员卡至微信卡包.
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
  name: 'AemberCard',
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
  methods: {
    handleEdit() {
      this.$router.push({
        path: '/member/register-setting/editcard'
      })
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
.AemberCard-index-model {
  margin-top: 10px;
  background: #ffffff;
  padding: 10px;
  .AemberCard-header-model {
    font-size: 16px;
    border-bottom: 2px solid #eeeeee;
    padding-bottom: 10px;
  }
  .AemberCard-contain-model {
    padding: 10px 10px;
    font-size: 14px;
    ul li:nth-child(1) {
      font-size: 18px;
      line-height: 25px;
    }
    ul li:not(:first-child) {
      font-size: 14px;
      line-height: 25px;
    }
    .AemberCard-image-model {
      width: 400px;
      height: 260px;
      padding: 40px;
      background: #497ffe;
      border-radius: 10px;
      color: #ffffff;
      font-size: 16px;
      .AemberCard-image-url {
        width: 60px;
        height: 60px;
      }
      .AemberCard-image-detail div {
        line-height: 26px;
      }
      .AemberCard-image-bottom {
        transform: translateY(100px);
      }
    }
    .AemberCard-button-model {
      padding-left: 60px;
    }
    .AemberCard-url-model {
      margin-top: 5px;
      padding: 10px;
      background: #f5f7fa;
    }
    .AemberCard-Explain-model {
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
        font-size: 12px;
        text-align: center;
        background-color: #8eb9f5;
      }
      li {
        line-height: 24px;
      }
    }
  }
}
</style>
