<template>
  <div class="noActiveCard-index-model">
    <div class="noActiveCard-header-model">
      <span class="noActiveCard-title-model">微信会员卡</span>
    </div>
    <div class="noActiveCard-contain-model noActiveCard-card-model">
      <el-row>
        <el-col :span="19">
          <div style="display:inline-block;margin-right:30px">
            <div class="noActiveCard-image-model noActiveCard-stop-mode">
              <div>
                还未激活会员卡
              </div>
            </div>
            <div class="noActiveCard-image-model">
              <el-row>
                <el-col :span="6">
                  <div class="noActiveCard-image-url" />
                </el-col>
                <el-col :span="15" class="noActiveCard-image-detail">
                  <div>海典智慧药店-直营店</div>
                  <div>演示会员</div>
                </el-col>
                <el-col :span="3">
                  <div class="AemberCard-qrcode-url" style="margin-top:10px">
                    <img src="@/assets/icon/icon.png" alt="" class="AemberCard-qrcode-url">
                  </div>
                </el-col>
              </el-row>
              <el-row class="noActiveCard-image-bottom">
                <el-col :span="18" class="noActiveCard-image-number">
                  <div>
                    <span class="noActiveCard-number-bottom">8888</span>
                    <span class="noActiveCard-number-bottom">8888</span>
                    <span class="noActiveCard-number-bottom">8888</span>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="noActiveCard-image-icon" />
                </el-col>
              </el-row>
            </div>
          </div>
          <el-button type="primary" plain size="mini" @click="goActive">激活会员卡</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="noActiveCard-contain-model">
      <el-row>
        <el-col :span="24" class="noActiveCard-contain-adress">会员卡激活说明:</el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="noActiveCard-Explain-model">
            <ul>
              <li>
                <span class="c-index">1</span>
                您需要在【渠道管理-微信公众号】授权给我们，授权后方可激活会员卡信息
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
  name: 'NoActiveCard',
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
    goActive() {
      this.$router.push({
        path: '/member/register-setting/editcard'
      })
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
.noActiveCard-index-model {
  margin-top: 10px;
  background: #ffffff;
  padding: 10px;
  .noActiveCard-title-model{
    margin-right: 10px;
  }
  .noActiveCard-header-model {
    font-size: 16px;
    border-bottom: 2px solid #eeeeee;
    padding-bottom: 10px;
    padding-left: 20px;
  }
  .noActiveCard-contain-model {
    padding: 20px 0px 0px 96px;
    font-size: 14px;
    .noActiveCard-button-model {
      color: #1890FF;
      margin-top: 150px;
    }
    .noActiveCard-button-model:hover{
      cursor:pointer
    }
    .noActiveCard-load-model{
      padding-top:170px;
      padding-left:10px;
    }
    .noActiveCard-contain-adress{
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
    .noActiveCard-stop-mode{
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
    .noActiveCard-image-model {
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
      .noActiveCard-image-url {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: #4e4f51;
      }
      .noActiveCard-image-detail div {
        line-height: 26px;
      }
      .noActiveCard-image-bottom {
        transform: translate(20px,60px);
        .noActiveCard-number-bottom{
          display: inline-block;
          margin-right: 10px;
          font-size: 18px;
        }
      }
    }
    .noActiveCard-button-model {
      padding-left: 10px;
    }
    .noActiveCard-url-model {
      margin-top: 5px;
      padding: 10px;
      display: flex;
      align-items: center;
    }
    .noActiveCard-Explain-model {
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
  // .noActiveCard-card-model{
  //     margin-right: 56px;
  //   }
}
</style>
