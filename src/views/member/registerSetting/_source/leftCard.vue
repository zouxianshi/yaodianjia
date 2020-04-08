<template>
  <div class="left-index-model">
    <div class="left-header-model">
      <ul>
        <li>
          <i class="el-icon-arrow-left" />
        </li>
        <li>会员卡</li>
        <li>
          <i class="el-icon-more" />
        </li>
      </ul>
    </div>
    <div class="AemberCard-imagec-model">
      <div class="AemberCard-image-model" :style="{backgroundImage: member.cardBgType==2?'url('+ member.cardBgContent +')':'',background:(member.cardBgType==1?member.cardBgContent:'')}">
        <el-row>
          <el-col :span="6">
            <img :src="member.merLogoUrl" alt class="AemberCard-image-url">
          </el-col>
          <el-col :span="14" class="AemberCard-image-detail">
            <div>{{ member.cardTitle }}</div>
            <div>{{ member.cardType }}</div>
          </el-col>
          <el-col :span="4">
            <div class="AemberCard-qrcode-url" style="margin-top:10px">
              <img src="@/assets/icon/icon.png" alt="" class="AemberCard-qrcode-url">
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
        </el-row>
      </div>
    </div>
    <div class="AemberCard-word-model">
      <div>积分</div>
      <div>优惠券</div>
    </div>
    <div class="AemberCard-word-model AemberCard-color-model">
      <div v-text="count" />
      <div>查看</div>
    </div>
    <div class="AemberCard-imagec-model">
      <el-button type="primary" size="mini" disabled>微信支付</el-button>
    </div>
    <ul class="AemberCard-list-model">
      <li v-for="(item,index) in member.customCells" :key="index">{{ item.name }}</li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'LeftCard',
  components: {},
  props: {
    // 会员卡信息
    member: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      count: 0
    }
  },
  computed: {
  },
  watch: {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {
  },
  beforeUpdate() {},
  updated() {
  },
  methods: {}
}
</script>

<style lang="scss" rel="stylesheet/scss">
.left-index-model {
  padding: 5px;
  margin: 5px;
  background: #ffffff;
  .left-header-model ul {
    display: flex;
    padding: 7px 0;
    justify-content: space-between;
    margin-bottom:10px;
    border-bottom: 2px solid #eeeeee;
  }
  .AemberCard-imagec-model{
    display: flex;
    justify-content: center;
    margin-top: 10px;
    .AemberCard-image-model {
      background-size: cover;
      width: 220px;
      height: 130px;
      padding: 20px;
      border-radius: 10px;
      color: #ffffff;
      font-size: 10px;
      .AemberCard-qrcode-url{
        width: 25px;
        height: 25px;
        background: #ffffff;
      }
      .AemberCard-image-url {
        width: 40px;
        height: 40px;
        margin-right: 10px;
        border-radius: 100%;
      }
      .AemberCard-image-detail div {
        line-height: 20px;
      }
      .AemberCard-image-bottom {
        transform: translateY(40px);
        .AemberCard-number-bottom{
          display: inline-block;
          margin-right: 5px;
        }
      }
    }
  }
  .AemberCard-word-model{
    display: flex;
    justify-content: space-around;
    font-size: 14px;
    margin-top: 20px;
  }
  .AemberCard-color-model{
    color: rgba(10, 99, 231, 0.822);
  }
  .AemberCard-list-model{
    margin-top:10px;
    li{
      height: 50px;
      line-height: 50px;
      border-top:2px solid #eee;
      font-size: 14px;
    }
  }
}
</style>
