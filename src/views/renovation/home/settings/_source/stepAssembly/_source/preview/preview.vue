<template>
  <div class="sa-preview-model">
    <div class="apm-header">
      <m-header />
    </div>
    <div class="scrollbar apm-drag-area">
      <div class="apm-banner">
        <m-banner />
      </div>
      <v-draggable ref="draggable" v-model="dragData" draggable=".item-component" v-bind="dragOptions" @change="onDragChange" @add="onDragAdd">
        <div v-for="(item) in dragData" :id="rtUUid(item.type)" :key="rtUUid(item.type)" class="item-component">
          <!--导航栏-->
          <m-navigation v-if="item.type === 'navigation'" :item="item" />
          <!--广告图-->
          <m-advertisement v-if="item.type === 'advertisement'" :item="item" />
          <!--商品-->
          <m-commodity v-if="item.type === 'commodity'" :item="item" />
          <!--标题-->
          <m-title v-if="item.type === 'title'" :item="item" />
          <!--公告-->
          <m-announcement v-if="item.type === 'announcement'" :item="item" />
          <!--为你推荐-->
          <m-recommend v-if="item.type === 'recommend'" :item="item" />
          <!--广告框-->
          <m-ad-frame v-if="item.type === 'adFrame'" :item="item" />
          <!--活动商品-->
          <m-activity-aggregate v-if="item.type === 'activityAggregate'" :item="item" />
          <!--限时活动-->
          <m-time-limited-activity v-if="item.type === 'timeLimitedActivity'" :item="item" />
          <!--优惠券-->
          <m-coupon v-if="item.type === 'coupon'" :item="item" />
        </div>
      </v-draggable>
    </div>
  </div>
</template>
<script>
import { uuid } from '@/utils'
import { items } from './../../default'
import vDraggable from 'vuedraggable'
import mHeader from './_source/header/header'
import mBanner from './_source/banner/banner'
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

export default {
  name: 'SaPreview',
  data() {
    return {
      dragData: [
        {
          uuid: `${uuid('advertisement-')}${uuid()}${uuid()}${uuid()}`,
          type: 'advertisement',
          subType: 'first',
          name: '单图样式',
          error: false,
          itemList: items(1)
        },
        {
          uuid: `${uuid('coupon-')}${uuid()}${uuid()}${uuid()}`,
          type: 'coupon',
          subType: 'first',
          name: '一排单个',
          error: false,
          itemList: items(1)
        },
        {
          uuid: `${uuid('timeLimitedActivity-')}${uuid()}${uuid()}${uuid()}`,
          type: 'timeLimitedActivity',
          subType: 'third',
          name: '一排多个',
          error: false,
          itemList: items(6) // todo 不确定数量
        },
        {
          uuid: `${uuid('timeLimitedActivity-')}${uuid()}${uuid()}${uuid()}`,
          type: 'timeLimitedActivity',
          subType: 'second',
          name: '一排两个',
          error: false,
          itemList: items(2)
        },
        {
          uuid: `${uuid('timeLimitedActivity-')}${uuid()}${uuid()}${uuid()}`,
          type: 'timeLimitedActivity',
          subType: 'first',
          name: '一排单个',
          error: false,
          itemList: items(1)
        },
        {
          uuid: `${uuid('adFrame-')}${uuid()}${uuid()}${uuid()}`,
          type: 'adFrame',
          subType: 'first',
          name: '默认样式',
          error: false,
          itemList: items(8) // todo 不确定数量
        },
        {
          uuid: `${uuid('recommend-')}${uuid()}${uuid()}${uuid()}`,
          type: 'recommend',
          subType: 'second',
          name: '一排三个',
          error: false,
          itemList: items(10) // todo 不确定长度
        },
        {
          uuid: `${uuid('recommend-')}${uuid()}${uuid()}${uuid()}`,
          type: 'recommend',
          subType: 'first',
          name: '一排两个',
          error: false,
          itemList: items(10) // todo 不确定长度
        },
        /* {
            uuid: `${uuid('announcement-')}${uuid()}${uuid()}${uuid()}`,
            type: 'announcement',
            subType: 'first',
            name: '默认样式',
            error: false,
            itemList: items(1)
          },
          {
            uuid: `${uuid('announcement-')}${uuid()}${uuid()}${uuid()}`,
            type: 'announcement',
            subType: 'second',
            name: '样式风格1',
            error: false,
            itemList: items(1)
          },
          {
            uuid: `${uuid('announcement-')}${uuid()}${uuid()}${uuid()}`,
            type: 'announcement',
            subType: 'third',
            name: '样式风格2',
            error: false,
            itemList: items(1)
          },
          {
            uuid: `${uuid('announcement-')}${uuid()}${uuid()}${uuid()}`,
            type: 'announcement',
            subType: 'four',
            name: '样式风格3',
            error: false,
            itemList: items(1)
          },*/
        {
          uuid: `${uuid('title-')}${uuid()}${uuid()}${uuid()}`,
          type: 'title',
          subType: 'second',
          name: '样式风格1',
          error: false,
          itemList: items(1)
        },
        {
          uuid: `${uuid('title-')}${uuid()}${uuid()}${uuid()}`,
          type: 'title',
          subType: 'third',
          name: '样式风格2',
          error: false,
          itemList: items(1)
        },
        {
          uuid: `${uuid('title-')}${uuid()}${uuid()}${uuid()}`,
          type: 'title',
          subType: 'four',
          name: '样式风格3',
          error: false,
          itemList: items(1)
        },
        {
          uuid: `${uuid('title-')}${uuid()}${uuid()}${uuid()}`,
          type: 'title',
          subType: 'five',
          name: '样式风格4',
          error: false,
          itemList: items(1)
        },
        {
          uuid: `${uuid('title-')}${uuid()}${uuid()}${uuid()}`,
          type: 'title',
          subType: 'six',
          name: '样式风格5',
          error: false,
          itemList: items(1)
        },
        {
          uuid: `${uuid('title-')}${uuid()}${uuid()}${uuid()}`,
          type: 'title',
          subType: 'seven',
          name: '样式风格6',
          error: false,
          itemList: items(1)
        },
        {
          uuid: `${uuid('title-')}${uuid()}${uuid()}${uuid()}`,
          type: 'title',
          subType: 'first',
          name: '默认样式',
          error: false,
          itemList: items(1)
        },
        {
          uuid: `${uuid('commodity-')}${uuid()}${uuid()}${uuid()}`,
          type: 'commodity',
          subType: 'four',
          name: '一排多个',
          error: false,
          itemList: items(8) // todo 不确定最大长度
        },
        {
          uuid: `${uuid('commodity-')}${uuid()}${uuid()}${uuid()}`,
          type: 'commodity',
          subType: 'third',
          name: '一排三个',
          error: false,
          itemList: items(3)
        },
        {
          uuid: `${uuid('commodity-')}${uuid()}${uuid()}${uuid()}`,
          type: 'commodity',
          subType: 'second',
          name: '一排两个',
          error: false,
          itemList: items(2)
        },
        {
          uuid: `${uuid('commodity-')}${uuid()}${uuid()}${uuid()}`,
          type: 'commodity',
          subType: 'first',
          name: '一排单个',
          error: false,
          itemList: items(1)
        },
        {
          uuid: `${uuid('advertisement-')}${uuid()}${uuid()}${uuid()}`,
          type: 'advertisement',
          subType: 'five',
          name: '多图轮播',
          error: false,
          itemList: items(1) // todo 不确定最大长度
        },
        {
          uuid: `${uuid('advertisement-')}${uuid()}${uuid()}${uuid()}`,
          type: 'advertisement',
          subType: 'four',
          name: '单图不限高',
          error: false,
          itemList: items(1)
        },
        {
          uuid: `${uuid('advertisement-')}${uuid()}${uuid()}${uuid()}`,
          type: 'advertisement',
          subType: 'third',
          name: '多图样式2',
          error: false,
          itemList: items(4)
        },
        {
          uuid: `${uuid('advertisement-')}${uuid()}${uuid()}${uuid()}`,
          type: 'advertisement',
          subType: 'second',
          name: '多图样式1',
          error: false,
          itemList: items(3)
        },
        {
          uuid: `${uuid('navigation-')}${uuid()}${uuid()}${uuid()}`,
          type: 'navigation',
          subType: 'first',
          name: '一排四个',
          error: false,
          itemList: items(7)
        },
        {
          uuid: `${uuid('navigation-')}${uuid()}${uuid()}${uuid()}`,
          type: 'navigation',
          subType: 'second',
          name: '一排五个',
          error: false,
          itemList: items(9)
        }
      ]
    }
  },
  props: {},
  methods: {
    onDragAdd(v) {
      console.log(v)
      console.log('------')
    },
    onDragChange() {},
    rtUUid(type) {
      return `${uuid(`${type}-`)}${uuid()}${uuid()}${uuid()}`
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
    dragOptions() {
      return {
        sort: true,
        animation: 150,
        group: 'shared',
        disabled: false,
        preventOnFilter: true,
        ghostClass: 'ghost',
        bannerItemList: []
      }
    }
  },
  components: { vDraggable, mHeader, mBanner, mNavigation, mAdvertisement, mCommodity, mTitle, mAnnouncement, mRecommend, mAdFrame, mActivityAggregate, mTimeLimitedActivity, mCoupon }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .sa-preview-model {
    height: calc(100vh - 264px);
    border:1px solid #CFCFCF;
    background: #FBFBFB;
    overflow: hidden;
    .apm-header {
      margin-bottom: 10px;
    }
    .apm-drag-area {
      height: calc(100vh - 400px);
      background: blue;
      .item-component {
        cursor: pointer;
      }
      .apm-banner {
        margin-bottom: 10px
      }
    }
  }
</style>
