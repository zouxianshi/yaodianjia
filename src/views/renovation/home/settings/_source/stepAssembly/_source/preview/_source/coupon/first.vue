<template>
  <div class="sap-coupon-first-model" :style="stylees">
    <div class="scfm-item-box">
      <div class="scfm-item">
        <div class="scfm-item-left">
          <div class="scfm-line-1" />
          <div class="scfm-line-2" />
          <div class="scfm-text-num">Aa</div>
          <div class="scfm-type" />
        </div>
        <div class="scfm-item-right">
          <div class="scfm-name" />
          <div class="scfm-desc" />
          <div class="scfm-btn">
            <el-button round size="mini">圆角按钮</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/**
   * 设计的大小没一点规律，搞得前端作死的写乱七八糟的样式，严重谴责设计人员不专业！！！
   */
import { globalBinding } from './../../../../mixins'
export default {
  name: 'SapCouponFirst',
  data() {
    return {}
  },
  mixins: [globalBinding],
  props: {},
  methods: {},
  watch: {},
  beforeCreate() {
  },
  created() {
  },
  beforeMount() {
  },
  mounted() {
  },
  beforeUpdate() {
  },
  updated() {
  },
  beforeDestroy() {
  },
  destroyed() {
  },
  computed: {},
  components: {}
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .sap-coupon-first-model {
    .scfm-item-box {
      .scfm-item {
        overflow: hidden;
        .scfm-item-left,.scfm-item-right {
          float: left;
          height: 104px;
        }
        .scfm-item-left {
          width: 84px;
          background: #C72D2D;
          position: relative;
          border-radius: 2px 0 0 2px;
          text-align: center;
          z-index: 1;
          .scfm-line-1,.scfm-line-2 {
            width: 12px;
            height: 12px;
            background: #FBFBFB;
            border-radius:100%;
            position: absolute;
            left: 78px;
          }
          .scfm-line-1 {
            top:-6px;
          }
          .scfm-line-2 {
            bottom:-6px
          }
          .scfm-text-num {
            font-size: 28px;
            color: #fff;
            margin-top: 26px;
          }
          .scfm-type {
            width:42px;
            height:15px;
            background:rgba(255,255,255,1);
            border-radius:2px;
            opacity:0.8;
            margin: 0 auto;
            margin-top: 10px;
          }
        }
        .scfm-item-right {
          width: calc(100% - 84px);
          border-radius: 0 2px 2px 0;
          background: -moz-linear-gradient(left,  rgba(243,37,37,0.94) 0%, rgba(243,37,37,0.94) 1%, rgba(238,63,63,1) 100%); /* FF3.6-15 */
          background: -webkit-linear-gradient(left,  rgba(243,37,37,0.94) 0%,rgba(243,37,37,0.94) 1%,rgba(238,63,63,1) 100%); /* Chrome10-25,Safari5.1-6 */
          background: linear-gradient(to right,  rgba(243,37,37,0.94) 0%,rgba(243,37,37,0.94) 1%,rgba(238,63,63,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
          filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f0f32525', endColorstr='#ee3f3f',GradientType=1 ); /* IE6-9 */
          position: relative;
          z-index: 0;
          .scfm-name,.scfm-desc {
            height: 18px;
            line-height: 18px;
            border-radius:2px;
          }
          .scfm-name {
            width: 70%;
            background:rgba(255,255,255,.8);
            margin:12px 0 0 12px;
          }
          .scfm-desc {
            background:#FF8887;
            position: absolute;
            left: 12px;
            bottom: 10px;
            width: 85%;
          }
          .scfm-btn {
            position: absolute;
            right: 10px;
            top: 39px;
            .el-button {
              border-color: #fff;
              color: #F32525;
            }
          }
        }
      }
    }
  }
</style>
