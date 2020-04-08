<template>
  <div class="nobindingCard-index-model">
    <div class="nobindingCard-header-model">
      <span class="nobindingCard-title-model">微信会员卡</span>
    </div>
    <div class="nobindingCard-contain-model nobindingCard-card-model">
      <el-row>
        <el-col :span="19">
          <div class="nobindingCard-image-model nobindingCard-stop-mode">
            <div>
              还未绑定公众号
            </div>
          </div>
          <div class="nobindingCard-image-model">
            <el-row>
              <el-col :span="6">
                <div class="nobindingCard-image-url" />
              </el-col>
              <el-col :span="15" class="nobindingCard-image-detail">
                <div>海典智慧药店-直营店</div>
                <div>演示会员</div>
              </el-col>
              <el-col :span="3">
                <div class="AemberCard-qrcode-url" style="margin-top:10px">
                  <img src="@/assets/icon/icon.png" alt="" class="AemberCard-qrcode-url">
                </div>
              </el-col>
            </el-row>
            <el-row class="nobindingCard-image-bottom">
              <el-col :span="18" class="nobindingCard-image-number">
                <div>
                  <span class="nobindingCard-number-bottom">8888</span>
                  <span class="nobindingCard-number-bottom">8888</span>
                  <span class="nobindingCard-number-bottom">8888</span>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="nobindingCard-image-icon" />
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="5">
          <!-- <div class="nobindingCard-button-model">还未绑定公众号</div> -->
        </el-col>
      </el-row>
    </div>
    <div class="nobindingCard-contain-model">
      <ul style="padding-left:50px">
        <li>绑定公众号后解锁功能:</li>
        <li>1、开通微信会员卡功能（会员在微信卡包内，查看电子会员卡）；</li>
        <li>2、开通支付即会员功能（顾客微信支付后，可直接注册领取微信会员卡）；</li>
      </ul>
    </div>
    <div class="nobindingCard-contain-model">
      <el-row>
        <el-col :span="24" class="nobindingCard-contain-adress">公众号绑定说明：</el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <div class="nobindingCard-Explain-model">
            <div>
              <ul>
                <li>
                  1.成功绑定公众号后，您将解锁以下功能:
                </li>
                <li>
                  2.微信会员卡功能——会员在个人微信卡包内查看电子会员卡.
                </li>
                <li>
                  3.支付即会员功能——顾客微信支付后，直接注册领取微信会员卡.
                </li>
              </ul>
            </div>
            <div class="nobindingCard-button-model" style="margin:40px 0px 0px 20px" @click="gobang">马上去绑定</div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  name: 'NobindingCard',
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
    },
    gobang() {
      this.$router.push({
        path: '/channel/wx-official-account'
      })
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
.nobindingCard-index-model {
  margin-top: 10px;
  background: #ffffff;
  padding: 10px;
  .nobindingCard-title-model{
    margin-right: 10px;
  }
  .nobindingCard-header-model {
    font-size: 16px;
    border-bottom: 2px solid #eeeeee;
    padding-bottom: 10px;
    padding-left: 20px;
  }
  .nobindingCard-contain-model {
    padding: 20px 0px 0px 96px;
    font-size: 14px;
    .nobindingCard-button-model {
      color: #1890FF;
      margin-top: 150px;
    }
    .nobindingCard-button-model:hover{
      cursor:pointer
    }
    .nobindingCard-load-model{
      padding-top:170px;
      padding-left:10px;
    }
    .nobindingCard-contain-adress{
      font-weight: 600;
      margin: 10px 0;
    }
    ul li:nth-child(1) {
      //font-size: 18px;
      line-height: 25px;
    }
    ul li:not(:first-child) {
      font-size: 14px;
      line-height: 25px;
    }
    .nobindingCard-stop-mode{
        position: absolute;
        z-index: 2;
        background:#ffff !important;
        opacity: 0.7;
        display: flex;
        align-items: center;
        justify-content: center;
        div{
          background:#938c8c;
          z-index: 200;
          border-radius:2px;
          width: 100%;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          left: 0;
          color: #fff;
        }
      }
    .nobindingCard-image-model {
      width: 314px;
      height: 184px;
      padding: 26px;
      border-radius: 10px;
      color: #303133;
      font-size: 16px;
      padding-left:20px;
      background: #000;
      // text-shadow: 1px 5px 5px rgba(26, 23, 23, 0.7);
      .AemberCard-qrcode-url{
        width: 45px;
        height: 45px;
        background: #ffffff;
      }
      .nobindingCard-image-url {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: #4e4f51;
      }
      .nobindingCard-image-detail div {
        line-height: 26px;
      }
      .nobindingCard-image-bottom {
        transform: translate(20px,60px);
        .nobindingCard-number-bottom{
          display: inline-block;
          margin-right: 10px;
          font-size: 18px;
        }
      }
    }
    .nobindingCard-button-model {
      padding-left: 10px;
    }
    .nobindingCard-url-model {
      margin-top: 5px;
      padding: 10px;
      display: flex;
      align-items: center;
    }
    .nobindingCard-Explain-model {
      margin-top: 5px;
      padding: 10px;
      font-size: 14px;
      background: #F1F1F1;
      display: flex;
      .c-index {
        display: inline-block;
        border-radius: 100%;
        padding: 1px 0;
        color: #fff;
        width: 14px;
        font-size: 12px;
        line-height: 100%;
        font-size: 12px;
        text-align: center;
        background-color: #497FFE;
      }
      li {
        line-height: 24px;
      }
    }
  }
  .nobindingCard-card-model{
      margin-right: 56px;
      display: flex;
      justify-content: center;
    }
}
</style>
