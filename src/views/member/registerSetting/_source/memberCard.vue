<template>
  <div v-loading="uploadLoading" class="AemberCard-index-model">
    <div class="AemberCard-header-model">
      <span class="AemberCard-title-model">微信会员卡</span>
      <el-alert v-if="showcode===2" style="display: inline" title="审核中" type="warning" :closable="false" />
      <el-alert v-if="showcode==3" style="display: inline" title="审核成功" type="success" :closable="false" />
      <el-alert v-if="showcode==4" style="display: inline" title="审核失败" type="error" :closable="false" />
    </div>
    <div class="AemberCard-contain-model AemberCard-card-model">
      <el-row>
        <el-col :span="19">
          <div
            class="AemberCard-image-model"
            :style="{backgroundImage: memberList.cardBgType==2?'url('+ memberList.cardBgContent +')':'',background:(memberList.cardBgType==1?memberList.cardBgContent:'')}"
          >
            <el-row>
              <el-col :span="6">
                <img :src="memberList.merLogoUrl" alt class="AemberCard-image-url">
              </el-col>
              <el-col :span="14" class="AemberCard-image-detail">
                <div>{{ memberList.cardTitle }}</div>
                <div>会员卡</div>
              </el-col>
              <el-col :span="4">
                <div class="AemberCard-qrcode-url" style="margin-top:10px">
                  <img src="@/assets/icon/icon.png" alt class="AemberCard-qrcode-url">
                </div>
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
          <el-button
            style="vertical-align: bottom"
            type="primary"
            plain
            size="mini"
            @click="handleEdit"
          >编辑会员卡</el-button>
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
      <div class="AemberCard-url-model">
        <div class="AemberCard-contain-adress">会员卡领卡地址:</div>
        <div class="AemberCard-link-model">{{ VUE_APP_MEMBER_CENTER }}</div>
        <div>
          <el-button
            v-clipboard:error="onError"
            v-clipboard:copy="VUE_APP_MEMBER_CENTER"
            v-clipboard:success="onCopy"
            type="primary"
            plain
            size="mini"
          >复制连接</el-button>
        </div>
      </div>
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
import { getColor } from '@/api/memberService'
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'AemberCard',
  components: {},
  props: {
    // 会员卡信息
    checkmemberlist: {
      type: Object,
      default: function() {
        return {}
      }
    },
    // 会员卡状态
    showcode: {
      type: Number,
      default: function() {
        return 0
      }
    }
  },
  data() {
    return {
      uploadLoading: false,
      memberList: '',
      colorList: ''
    }
  },
  computed: {
    ...mapGetters(['merCode']),
    ...mapState('channel', ['VUE_APP_MEMBER_CENTER'])
  },
  watch: {},
  beforeCreate() {},
  created() {
  },
  beforeMount() {},
  mounted() {
    this.uploadLoading = true
    this.memberList = this.checkmemberlist
    getColor().then(res => {
      this.colorList = res.data
      this.uploadLoading = false
      if (this.memberList.cardBgType === 1) {
        for (const i in this.colorList) {
          if (
            i.toLowerCase() === this.memberList.cardBgContent.toLowerCase()
          ) {
            this.memberList.cardBgContent = this.colorList[i]
          }
        }
      }
    })
  },
  beforeUpdate() {},
  updated() {},
  methods: {
    handleEdit() {
      this.$router.push({
        path: '/member/register-setting/editcard'
      })
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
.AemberCard-index-model {
  margin-top: 10px;
  background: #ffffff;
  padding: 10px;
  .AemberCard-title-model {
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
      color: #1890ff;
    }
    .AemberCard-link-model {
      width: 400px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .applers-button-model:hover {
      cursor: pointer;
    }
    .applers-load-model {
      padding-top: 170px;
      padding-left: 10px;
    }
    .AemberCard-contain-adress {
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
      background-size: cover;
      width: 314px;
      height: 184px;
      padding: 26px;
      border-radius: 10px;
      color: #ffffff;
      font-size: 16px;
      padding-left: 20px;
      display: inline-block;
      margin-right: 30px;
      .AemberCard-qrcode-url {
        width: 45px;
        height: 45px;
        background: #ffffff;
      }
      .AemberCard-image-url {
        width: 60px;
        height: 60px;
        border-radius: 50%;
      }
      .AemberCard-image-detail div {
        line-height: 26px;
      }
      .AemberCard-image-bottom {
        transform: translate(20px, 60px);
        .AemberCard-number-bottom {
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
      background: #f1f1f1;
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
        background-color: #497ffe;
      }
      li {
        line-height: 24px;
      }
    }
  }
  // .AemberCard-card-model{
  //     padding-right: 96px;
  //     display: flex;
  //     justify-content: center;
  //   }
}
</style>
