<template>
  <div class="AemberCard-index-model">
    <div class="AemberCard-header-model">
      <span class="AemberCard-title-model">微信会员卡</span>
    </div>
    <div class="AemberCard-contain-model AemberCard-card-model">
      <el-row>
        <el-col :span="19">
          <!-- :style="{backgroundImage:url(memberList.cardBgType==2?memberList.cardBgContent:''),background:(memberList.cardBgType==1?memberList.cardBgContent:'')}" -->
          <div class="AemberCard-image-model" :style="{background:(memberList.cardBgType==1?memberList.cardBgContent:'')}">
            <el-row>
              <el-col :span="6">
                <img src="@/assets/image/template_bg.png" alt="" class="AemberCard-image-url">
              </el-col>
              <el-col :span="18" class="AemberCard-image-detail">
                <div>{{ memberList.cardTitle }}</div>
                <div>{{ memberList.cardType }}</div>
              </el-col>
            </el-row>
            <el-row class="AemberCard-image-bottom">
              <el-col :span="18" class="AemberCard-image-number">
                <div>
                  <span class="AemberCard-number-bottom">8888</span>
                  <span class="AemberCard-number-bottom">8888</span>
                  <span class="AemberCard-number-bottom">8888</span>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="AemberCard-image-icon" />
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="5" class="applers-button-model applers-load-model">
          <span @click="handleEdit">编辑会员卡</span>
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
        <el-col :span="5" class="AemberCard-contain-adress"> 会员卡领卡地址：</el-col>
        <el-col :span="16">
          <div>https://middle.test.ydjia.cn/merchant/?t=1584597160000#/home</div>
        </el-col>
        <el-col :span="3" class="applers-button-model">
          复制连接
        </el-col>
      </el-row>
    </div>
    <div class="AemberCard-contain-model">
      <el-row>
        <el-col :span="24" class="AemberCard-contain-adress">公众号绑定说明：</el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="AemberCard-Explain-model">
            <ul>
              <li>
                <span>1.</span>
                您需要在【渠道管理-微信公众号】授权给我们，授权后可编辑会员卡信息。
              </li>
              <li>
                <span>2.</span>
                顾客通过微信公众号注册为会员，既可领取会员卡信息。
              </li>
              <li>
                <span>3.</span>
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
import { getMemberInfo, getColor } from '@/api/memberService'
import { mapGetters } from 'vuex'
export default {
  name: 'AemberCard',
  components: {},
  props: {},
  data() {
    return {
      memberList: '',
      colorList: ''
    }
  },
  computed: {
    ...mapGetters(['merCode'])
  },
  watch: {},
  beforeCreate() {},
  created() {
    getMemberInfo(this.merCode)
      .then(res => {
        this.memberList = res.data
        getColor().then(res => {
          this.colorList = res.data
          if (this.memberList.cardBgType === 1) {
            for (const i in this.colorList) {
              if (i.toLowerCase() === this.memberList.cardBgContent.toLowerCase()) {
                this.memberList.cardBgContent = this.colorList[i]
              }
            }
          }
        })
      })
  },
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
  .AemberCard-title-model{
    margin-right: 10px;
  }
  .AemberCard-header-model {
    font-size: 16px;
    border-bottom: 2px solid #eeeeee;
    padding-bottom: 10px;
    padding-left: 20px;
  }
  .AemberCard-contain-model {
    padding: 20px 0px 0px 96px;
    font-size: 14px;
    .applers-button-model {
      color: #1890FF;
    }
    .applers-button-model:hover{
      cursor:pointer
    }
    .applers-load-model{
      padding-top:170px;
      padding-left:10px;
    }
    .AemberCard-contain-adress{
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
    .AemberCard-image-model {
      width: 314px;
      height: 184px;
      padding: 26px;
      border-radius: 10px;
      color: #ffffff;
      font-size: 16px;
      padding-left:20px;
      .AemberCard-image-url {
        width: 60px;
        height: 60px;
        border-radius: 50%;
      }
      .AemberCard-image-detail div {
        line-height: 26px;
      }
      .AemberCard-image-bottom {
        transform: translate(20px,60px);
        .AemberCard-number-bottom{
          display: inline-block;
          margin-right: 10px;
          font-size: 18px;
        }
      }
    }
    .AemberCard-button-model {
      padding-left: 60px;
    }
    .AemberCard-url-model {
      margin-top: 5px;
      padding: 10px;
      display: flex;
      align-items: center;
    }
    .AemberCard-Explain-model {
      margin-top: 5px;
      padding: 10px;
      font-size: 14px;
      background: #F1F1F1;
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
  .AemberCard-card-model{
      padding-right: 96px;
      display: flex;
      justify-content: center;
    }
}
</style>
