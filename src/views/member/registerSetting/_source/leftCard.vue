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
      <div class="AemberCard-image-model" :style="{background:(member.cardBgType==1?member.cardBgContent:'')}">
        <el-row>
          <el-col :span="8">
            <img src="@/assets/image/template_bg.png" alt class="AemberCard-image-url">
          </el-col>
          <el-col :span="16" class="AemberCard-image-detail">
            <div>{{ member.cardTitle }}</div>
            <div>{{ member.cardType }}</div>
          </el-col>
        </el-row>
        <el-row class="AemberCard-image-bottom">
          <el-col :span="18" class="AemberCard-image-number">
            <div>
              <span class="AemberCard-number-bottom">888</span>
              <span class="AemberCard-number-bottom">888</span>
              <span class="AemberCard-number-bottom">888</span>
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
      <li>个人中心</li>
      <li>会员卡详情</li>
      <li>公众号</li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'LeftCard',
  components: {},
  props: {
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
    .AemberCard-image-model {
      width: 220px;
      height: 130px;
      padding: 20px;
      border-radius: 10px;
      color: #ffffff;
      font-size: 10px;
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
