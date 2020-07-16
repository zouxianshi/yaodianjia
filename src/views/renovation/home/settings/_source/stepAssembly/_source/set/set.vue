<template>
  <div class="scrollbar sa-set-model">
    <div class="ssm-comp-box">
      <div class="ssm-comp-title">
        <strong>{{ item.typeName }}组件</strong>
        <span>{{ item.name }}</span>
      </div>
      <component :is="mod" v-if="isComponent" :item="item" />
    </div>
  </div>
</template>
<script>
import mNavigation from './_source/navigation'
import mAdvertisement from './_source/advertisement'
import mCommodity from './_source/commodity'
import mTitle from './_source/title'
import mAnnouncement from './_source/announcement'
import mRecommend from './_source/recommend'
import mAdFrame from './_source/adFrame'
import mActivityAggregate from './_source/activityAggregate'
import mTimeLimitedActivity from './_source/timeLimitedActivity'
import mCoupon from './_source/coupon'
import mBanner from './_source/banner'
import mSearchHint from './_source/searchHint'
import { searchHintItem } from './../../default'

export default {
  name: 'SaSet',
  data() {
    return {
      item: _.cloneDeep(searchHintItem),
      isComponent: true
    }
  },
  props: {},
  methods: {
    selectAss(item) {
      this.isComponent = false
      this.item = item
      console.log(item)
      console.log('-----item')
      setTimeout(() => {
        this.isComponent = true
      }, 1)
    }
  },
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
  computed: {
    mod() {
      switch (this.item.type) {
        case 'banner':
          return mBanner
        case 'searchHint':
          return mSearchHint
        case 'navigation':
          return mNavigation
        case 'advertisement':
          return mAdvertisement
        case 'commodity':
          return mCommodity
        case 'title':
          return mTitle
        case 'announcement':
          return mAnnouncement
        case 'recommend':
          return mRecommend
        case 'adFrame':
          return mAdFrame
        case 'activityAggregate':
          return mActivityAggregate
        case 'timeLimitedActivity':
          return mTimeLimitedActivity
        case 'coupon':
          return mCoupon
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .sa-set-model {
    overflow-y: scroll;
    height: calc(100vh - 264px);
    padding: 3px;
    .ssm-comp-box {
      width: 420px;
      min-height: 280px;
      background:rgba(255,255,255,1);
      box-shadow:0px 0px 4px 0px rgba(0,0,0,0.15);
      border-radius:4px;
      padding: 16px;
      .ssm-comp-title {
        strong {
          font-size: 14px;
          color: #4A4A4A;
        }
        span {
          font-size: 12px;
          color: #9B9B9B;
          margin-left: 18px;
          display: inline-block;
        }
      }
    }
    .set-view-ass {
      margin: 0 auto;
      padding: 20px 0 0px 0;
    }
  }
</style>
