<template>
  <div class="sa-preview-model">
    <div class="apm-header-bg" :style="{'background':`${basics.backgroundColor}`}" />
    <div class="apm-header">
      <m-header />
    </div>
    <div class="scrollbar apm-drag-area">
      <div class="apm-banner" @click="onBannerSet()">
        <m-vrf-error v-if="staticDragData.banner.error" :item="staticDragData.banner" />
        <m-banner :item-list="staticDragData.banner.itemList" />
      </div>

      <v-draggable ref="draggable" v-model="dragData" draggable=".item-component" v-bind="dragOptions" @change="onDragChange" @add="onDragAdd" @move="onDragMove">
        <template v-if="dragData.length">
          <div v-for="(item,$index) in dragData" :id="rtUUid(item.type)" :key="rtUUid(item.type)" class="item-component">
            <div class="ic-item-hover" />
            <el-popconfirm title="确定要删除组件吗？" placement="top-start" @onConfirm="onConfirm($index)">
              <div slot="reference" class="ic-item-delete">删除</div>
            </el-popconfirm>
            <div @click="onDragSet(item)">
              <!--错误提示 -->
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
        </template>
        <div v-else style="height: 120px;line-height: 120px;margin: 0px 6px;background: rgb(236, 245, 255);border: 2px dotted #4F88FF;">
          <p style="font-size: 14px;color: #4F88FF;text-align: center">请拖拽组件到此区域</p>
        </div>
      </v-draggable>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import { uuid } from '@/utils'
import { items,bannerItem,searchHintItem } from './../../default' // eslint-disable-line
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
      ]
    }
  },
  props: {},
  methods: {
    ...mapMutations('renovation', ['setDragList']),
    onDragMove(v) {
      console.log(v)
    },
    onConfirm(index) {
      this.dragData = _.filter(this.dragData, (v, i) => i !== index)
      this.onDragAdd()
      jumpSelectAss(this.$root, searchHintItem)
    },
    $setVifDragData(dragData) {
      this.dragData = dragData
    },
    onDragAdd() {
      let dragData = this.dragData
      const itemRecommend = _.find(dragData, ['type', 'recommend'])
      if (!_.isEmpty(itemRecommend)) {
        dragData = _.reject(dragData, ['type', 'recommend'])
        dragData.push(itemRecommend)
      }
      this.setDragList(dragData)
    },
    onDragChange() {
      this.onDragAdd()
    },
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
    }
  },
  watch: {
    'dragList': {
      immediate: true,
      handler(v) {
        this.dragData = _.cloneDeep(v)
      }
    }
  },
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
    ...mapState('renovation', ['staticDragData', 'dragList', 'basics']),
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
    background: #F5F7F8;
    overflow: hidden;
    position: relative;
    .apm-header-bg {
      width: 358px;
      height: 358px;
      background: #F5F7F8;
      border-radius: 34px;
      position: absolute;
      left: 0;
      top: -155px;
    }
    .apm-header {
      margin-bottom: 10px;
    }
    .apm-drag-area {
      height: calc(100vh - 400px);
      padding-bottom: 30px;
      position: relative;
      .item-component {
        cursor: pointer;
        position: relative;
        padding: 8px 8px;
        margin: 4px 0;
        background: #F5F7F8;
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
          z-index: 10;
          text-align: center;
          color: #fff;
          display: none;
        }

      }
      .apm-banner {
        position: relative;
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
