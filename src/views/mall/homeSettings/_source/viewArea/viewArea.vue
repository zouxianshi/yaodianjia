<template>
  <div class="view-area-model">
    <!--头部-->
    <m-header />

    <!--banner轮播图-->
    <m-banner />

    <!--公告-->
    <m-notice />

    <!--拖拽操作-->
    <div class="vam-draggable">
      <v-draggable v-model="dragList" draggable=".item-component" v-bind="dragOptions" @end="onEnd" @add="onAdd">
        <div v-for="(item,$index) in dragList" :key="$index" class="item-component">
          <m-no-data v-if="item.code === 'no-data'" />
          <template v-else>
            <div class="drag-area">
              <span class="sp1">{{ item.name }}组件</span>
              <span class="sp2">请在此区域拖拽</span>
              <div class="oper">
                <m-edit v-if="item.code !== 'recommend'" :item="item" />
                <m-delete :index="$index" />
              </div>
            </div>
            <!--导航栏-->
            <m-navigation v-if="item.code === 'navigation'" :key="item.uuid" :item="{data:item.data,$index:$index,type:item.type}" />
            <!--标题-->
            <m-title v-if="item.code === 'title'" :key="item.uuid" :item="{data:item.data,$index:$index,type:item.type}" />
            <!--广告图-->
            <m-advertise v-if="item.code === 'advertise'" :key="item.uuid" :item="{data:item.data,$index:$index,type:item.type}" />
            <!--商品-->
            <m-commodity v-if="item.code === 'commodity'" :key="item.uuid" :item="{data:item.data,$index:$index,type:item.type}" />
            <!--为你推荐-->
            <m-recommend v-if="item.code === 'recommend'" :key="item.uuid" :item="{data:item.data,$index:$index,type:item.type}" />
          </template>
        </div>
      </v-draggable>
    </div>

    <!--底部导航-->
    <m-bottom-nav />
  </div>
</template>
<script>
import _ from 'lodash'
import { mapState, mapMutations } from 'vuex'
import vDraggable from 'vuedraggable'
import mHeader from './header'
import mBanner from './../_source/banner'
import mNotice from './notice'
import mNavigation from './navigation'
import mTitle from './title'
import mAdvertise from './advertise'
import mCommodity from './commodity'
import mRecommend from './recommend'
import mEdit from './_source/edit'
import mDelete from './_source/delete'
import mBottomNav from './bottomNav'
import mNoData from './noData'

export default {
  name: 'ViewArea',
  components: { mHeader, mBanner, mNotice, vDraggable, mNavigation, mTitle, mDelete, mEdit, mAdvertise, mCommodity, mRecommend, mNoData, mBottomNav },
  props: {},
  data() {
    return {
      dragList: []
    }
  },
  computed: {
    ...mapState('mall', ['dragData']),
    dragOptions() {
      return {
        sort: true,
        animation: 150,
        group: 'shared',
        disabled: false,
        preventOnFilter: true,
        ghostClass: 'ghost'
      }
    }
  },
  watch: {},
  beforeCreate() {
  },
  created() {
    this.dragList = this.dragData
  },
  beforeMount() {
  },
  mounted() {
  },
  beforeUpdate() {
  },
  updated() {
  },
  methods: {
    ...mapMutations('mall', ['setDragData']),
    /**
       * 拖拽结束
       */
    onEnd(v) {
      // this.setDragData()
    },
    /**
       * 拖入新增
       */
    onAdd() {
      this.dragList = _.reject(this.dragList, ['code', 'no-data'])
      this.setDragData(this.dragList)
    }
  },
  beforeDestroy() {
  },
  destroyed() {
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .view-area-model {
    height: 1200px;
    .flip-list-move {
      transition: transform 0.5s;
    }
    .vam-draggable {
      background: #f5f5f8;
      cursor: move;
      .item-component {
        position: relative;
        z-index: 21;
        margin-left: -2px;
        border-top: 2px solid #f5f5f8;
        border-left: 2px solid #ffffff;
        border-right: 2px solid #ffffff;
        border-bottom: 2px solid #f5f5f8;
        padding: 8px 0;
        &:hover{
          border-color: #409EFF;
          box-shadow: 0px 2px 18px 0 rgba(0,0,0,0.2);
          // border-style: dashed;
          .drag-area {
            display: block;
          }
        }
        .drag-area {
          width: 422px;
          height: 30px;
          line-height: 28px;
          background: #409EFF;
          position: absolute;
          left: -2px;
          top: -30px;
          display: none;
          text-align: center;
          border-radius:4px 0 0 0;
          .oper {
            position: absolute;
            right: -40px;
            top: 0;
          }
          .sp1,.sp2 {
            font-size: 13px;
            color: #fff;
          }
          .sp1 {
            position: absolute;
            left: 10px;
            top: 3px;
          }
        }
      }
    }
  }
</style>
