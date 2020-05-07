<template>
  <div class="list-ListIndex-model app-container">
    <div style="margin:20px 10px">
      活动类型：
      <el-radio-group v-model="radioType" @change="onchange">
        <el-radio :label="1">渠道</el-radio>
        <el-radio :label="2">活动</el-radio>
      </el-radio-group>
    </div>
    <!-- <div style="position: absolute;right:20px;top:25px;z-index:300">
      <el-input
        v-model="input1"
        style="width:200px"
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
      />
    </div>-->
    <!-- <el-button type="primary" @click="() => $router.push({ path: '/marketings/activity-manage/coupons/list' })">领劵中心列表</el-button>
    <el-button type="primary" @click="() => $router.push({ path: '/marketings/activity-manage/coupons/add' })">添加优惠券</el-button>-->
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="会员营销" name="first">
        <div v-loading="loadingShow" class="header-nav">
          <div class="item-box">
            <div v-for="(item, index) in moduleData" :key="index" class="item-border">
              <m-gift-card :info="item" />
            </div>
          </div>
        </div>
        <div v-if="moduleData.length===0" style="text-align:center;color:#bdc3cd">暂无活动</div>
      </el-tab-pane>
      <el-tab-pane label="商品促销" name="second">
        <div v-loading="loadingShow" class="header-nav">
          <div class="item-box">
            <div v-for="(item, index) in moduleData" :key="index" class="item-border">
              <m-gift-card :info="item" />
            </div>
          </div>
        </div>
        <div v-if="moduleData.length===0" style="text-align:center;color:#bdc3cd">暂无活动</div>
      </el-tab-pane>
      <el-tab-pane label="精彩活动" name="third">
        <div v-loading="loadingShow" class="header-nav">
          <div class="item-box">
            <div v-for="(item, index) in moduleData" :key="index" class="item-border">
              <m-gift-card :info="item" />
            </div>
          </div>
        </div>
        <div v-if="moduleData.length===0" style="text-align:center;color:#bdc3cd">暂无活动</div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import mGiftCard from '../../_source/giftCard'
import { moduleList } from '@/api/coupon'
import payImage from '@/assets/image/marketings/pay.png'
import getcoupon from '@/assets/image/marketings/getcoupon.png'
import zhuan from '@/assets/image/marketings/zhuan.png'
import guagua from '@/assets/image/marketings/guagua.png'
export default {
  name: 'ListIndex',
  components: {
    mGiftCard
  },
  props: {},
  data() {
    return {
      input1: '',
      activeName: 'first',
      moduleData: [],
      radioType: 1,
      tabNum: 1,
      loadingShow: false
    }
  },
  computed: {},
  watch: {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {
    this.handleGetlist(1)
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    onchange(val) {
      this.handleGetlist(this.tabNum)
    },
    handleGetlist(id) {
      this.loadingShow = true
      var params = {
        id: id,
        type: this.radioType
      }
      moduleList(params).then(res => {
        this.moduleData = res.data
        for (const i of this.moduleData) {
          switch (i.activityTemplateName) {
            case '支付有礼':
              i.url = `/marketings/activity-manage/payment-gift/list`
              i.imgUrl = payImage
              break
            case '领券中心':
              i.url = `/marketings/activity-manage/coupons/list`
              i.imgUrl = getcoupon
              break
            case '大转盘':
              i.url = `/marketings/activity-manage/turntable/list`
              i.imgUrl = zhuan
              break
            case '刮刮乐':
              i.url = `/marketings/activity-manage/turntable/guaList`
              i.imgUrl = guagua
          }
          i.query = {
            code: i.activityTemplateCode,
            name: i.activityTemplateName
            // id: id
          }
        }
        this.loadingShow = false
      })
    },
    handleClick(val) {
      if (val.label === '会员营销') {
        this.tabNum = 1
        this.handleGetlist(1)
      } else if (val.label === '商品促销') {
        this.tabNum = 2
        this.handleGetlist(2)
      } else if (val.label === '精彩活动') {
        this.tabNum = 3
        this.handleGetlist(3)
      }
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
.list-ListIndex-model {
  position: relative;
  padding: 20 0px;
  .header-nav {
    .item-box {
      display: flex;
      // width: 900px;
      // justify-content: space-between;
      padding: 20px 0;
      flex-wrap: wrap;
      .item-border {
        width: 150px;
        border: 2x solid #ffffff;
        margin: 0px 5px 5px 0;
      }
      .item-border:hover {
        cursor: pointer;
        border: 2px solid #4397ed;
      }
      .gift-card-modal {
        flex: 0 0 150px;
        text-align: center;
        .el-card__body {
          img {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
