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
          <div class="item-hover" @click="onDragSet(item)">
            <el-popconfirm title="确定要删除组件吗？" placement="top-start">
              <div slot="reference" class="item-delete">删除</div>
            </el-popconfirm>
          </div>
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
import { uuid, findComponentsDownward } from '@/utils'
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
        /* {
          uuid: `${uuid('advertisement-')}${uuid()}${uuid()}${uuid()}`,
          type: 'advertisement',
          typeName: '广告图',
          subType: 'first',
          name: '单图样式',
          error: false,
          itemList: items(1)
        },
        {
          uuid: `${uuid('advertisement-')}${uuid()}${uuid()}${uuid()}`,
          type: 'advertisement',
          typeName: '广告图',
          subType: 'second',
          name: '多图样式1',
          error: false,
          itemList: items(3)
        },
        {
          uuid: `${uuid('advertisement-')}${uuid()}${uuid()}${uuid()}`,
          type: 'advertisement',
          typeName: '广告图',
          subType: 'third',
          name: '多图样式2',
          error: false,
          itemList: items(4)
        },
        {
          uuid: `${uuid('advertisement-')}${uuid()}${uuid()}${uuid()}`,
          type: 'advertisement',
          typeName: '广告图',
          subType: 'four',
          name: '单图不限高',
          error: false,
          itemList: items(1)
        },
        {
          uuid: `${uuid('advertisement-')}${uuid()}${uuid()}${uuid()}`,
          type: 'advertisement',
          typeName: '广告图',
          subType: 'five',
          name: '多图轮播',
          error: false,
          itemList: items(1) // todo 不确定最大长度
        },*/
        {
          uuid: `${uuid('navigation-')}${uuid()}${uuid()}${uuid()}`,
          type: 'navigation',
          typeName: '导航栏',
          subType: 'first',
          name: '一排四个',
          error: false,
          itemList: items(4)
        },
        {
          uuid: `${uuid('navigation-')}${uuid()}${uuid()}${uuid()}`,
          type: 'navigation',
          typeName: '导航栏',
          subType: 'second',
          name: '一排五个',
          error: false,
          itemList: items(5)
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
    onDragSet(item) {
      const instance = findComponentsDownward(this.$root, 'SaSet')[0]
      instance.selectAss(item)
    },
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
      .item-component {
        cursor: pointer;
        position: relative;
        padding: 8px 0;
        margin: 4px 0;
        .item-hover {
          width: 100%;
          height: 100%;
          border: 2px dotted #4F88FF;
          position: absolute;
          left: 0;
          top: 0;
          z-index: 10;
          display: none;
          box-shadow: 0px 2px 18px 0 rgba(0,0,0,0.2);
          .item-delete {
            width:48px;
            height:26px;
            line-height: 26px;
            font-size: 14px;
            background:rgba(79,136,255,1);
            position: absolute;
            right: 0;
            top: 0;
            z-index: 2;
            text-align: center;
            color: #fff;
          }
        }
        &:hover {
          .item-hover {
            display: block;
          }
        }
      }
      .apm-banner {
        margin-bottom: 10px
      }
    }
  }
</style>
