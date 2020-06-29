<template>
  <div class="sa-preview-model">
    <div class="apm-header">
      <m-header />
    </div>
    <div class="scrollbar apm-drag-area">
      <div class="apm-banner" @click="onBannerSet()">
        <m-banner :item-list="staticDragData.banner.itemList" />
      </div>
      <v-draggable ref="draggable" v-model="dragData" draggable=".item-component" v-bind="dragOptions" @change="onDragChange" @add="onDragAdd">
        <div v-for="(item) in dragData" :id="rtUUid(item.type)" :key="rtUUid(item.type)" class="item-component">
          <div class="ic-item-hover" />
          <el-popconfirm title="确定要删除组件吗？" placement="top-start">
            <div slot="reference" class="ic-item-delete">删除</div>
          </el-popconfirm>
          <div @click="onDragSet(item)">
            <!--错误提示-->
            <m-vrf-error v-if="item.error" :item="item" />

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
        </div>
      </v-draggable>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { uuid } from '@/utils'
import { bannerItem } from './../../default'
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
import { jumpSelectAss } from './utils'
import mVrfError from './vrfError'

export default {
  name: 'SaPreview',
  data() {
    return {
      bannerItem,
      dragData: [
        {
          uuid: `${uuid('coupon-')}${uuid()}${uuid()}${uuid()}`,
          type: 'coupon',
          typeName: '优惠券',
          subType: 'first',
          name: '一排单个',
          error: false,
          itemList: [],
          max: 10
        },
        {
          uuid: `${uuid('coupon-')}${uuid()}${uuid()}${uuid()}`,
          type: 'coupon',
          typeName: '优惠券',
          subType: 'second',
          name: '一排两个',
          error: false,
          itemList: [],
          max: 10
        },
        {
          uuid: `${uuid('coupon-')}${uuid()}${uuid()}${uuid()}`,
          type: 'coupon',
          typeName: '优惠券',
          subType: 'third',
          name: '一排多个',
          error: false,
          itemList: [],
          max: 10
        }
        /*

          {
            uuid: `${uuid('timeLimitedActivity-')}${uuid()}${uuid()}${uuid()}`,
            type: 'timeLimitedActivity',
            typeName: '限时活动',
            subType: 'first',
            name: '一排单个',
            error: false,
            itemList: items(1)
          },
          {
            uuid: `${uuid('timeLimitedActivity-')}${uuid()}${uuid()}${uuid()}`,
            type: 'timeLimitedActivity',
            typeName: '限时活动',
            subType: 'second',
            name: '一排两个',
            error: false,
            itemList: items(2)
          },
          {
            uuid: `${uuid('timeLimitedActivity-')}${uuid()}${uuid()}${uuid()}`,
            type: 'timeLimitedActivity',
            typeName: '限时活动',
            subType: 'third',
            name: '一排多个',
            error: false,
            itemList: items(6) // todo 不确定数量
          },
          {
            uuid: `${uuid('adFrame-')}${uuid()}${uuid()}${uuid()}`,
            type: 'adFrame',
            typeName: '广告框',
            subType: 'first',
            name: '默认样式',
            error: false,
            itemList: items(8) // todo 不确定数量
          },

          {
            uuid: `${uuid('commodity-')}${uuid()}${uuid()}${uuid()}`,
            type: 'commodity',
            typeName: '商品',
            subType: 'first',
            name: '一排单个',
            error: false,
            itemList: items(1)
          },
          {
            uuid: `${uuid('commodity-')}${uuid()}${uuid()}${uuid()}`,
            type: 'commodity',
            typeName: '商品',
            subType: 'second',
            name: '一排两个',
            error: false,
            itemList: items(2)
          },
          {
            uuid: `${uuid('commodity-')}${uuid()}${uuid()}${uuid()}`,
            type: 'commodity',
            typeName: '商品',
            subType: 'third',
            name: '一排三个',
            error: false,
            itemList: items(3)
          },
          {
            uuid: `${uuid('commodity-')}${uuid()}${uuid()}${uuid()}`,
            type: 'commodity',
            typeName: '商品',
            subType: 'four',
            name: '一排多个',
            error: false,
            itemList: items(8) // todo 不确定最大长度
          },
         */
      ]
    }
  },
  props: {},
  methods: {
    ...mapActions('renovation', ['saveHomeSetting']),
    ...mapMutations('renovation', ['setDragList']),
    onDragAdd() {
      this.setDragList(this.dragData)
    },
    onDragChange() {},
    onDragSet(item) {
      jumpSelectAss(this.$root, item)
    },
    onBannerSet() {
      this.onDragSet(this.staticDragData.banner)
    },
    rtUUid(type) {
      return `${uuid(`${type}-`)}${uuid()}${uuid()}${uuid()}`
    },
    $saveDragItem(item) {
      const i = _.findIndex(this.dragData, ['uuid', item.uuid])
      this.$set(this.dragData, i, item)

      this.onDragAdd()
      setTimeout(() => {
        this.saveHomeSetting()
      })
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
    ...mapState('renovation', ['staticDragData', 'dragList']),
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
  components: { vDraggable, mHeader, mBanner, mNavigation, mAdvertisement, mCommodity, mTitle, mAnnouncement, mRecommend, mAdFrame, mActivityAggregate, mTimeLimitedActivity, mCoupon, mVrfError }
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
        padding: 8px 8px;
        margin: 4px 0;
        &:hover {
          .ic-item-hover,.ic-item-delete {
            display: block;
          }
        }
        .ic-item-hover {
          width: 100%;
          height: 100%;
          border: 2px dotted #4F88FF;
          position: absolute;
          left: 0;
          top: 0;
          z-index: 0;
          display: none;
          box-shadow: 0px 2px 18px 0 rgba(0,0,0,0.2);
        }
        .ic-item-delete {
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
          display: none;
        }

      }
      .apm-banner {
        margin-bottom: 10px;
        border: 2px dotted transparent;
        padding: 0 4px;
        &:hover {
          border-color:#4F88FF
        }
      }
    }
  }
</style>
