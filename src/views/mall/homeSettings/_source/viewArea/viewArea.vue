<template>
  <div class="view-area-model">
    <!--头部-->
    <m-header />

    <!--banner轮播图-->
    <m-banner />

    <!--公告-->
    <m-notice />

    <div class="vam-draggable">
      <v-draggable v-model="dragList" draggable=".item-component" v-bind="dragOptions" @end="onEnd" @add="onAdd">
        <div v-for="(item,$index) in dragList" :key="$index" class="item-component" @click.stop="onSettings(item)">
          <template v-if="item.code === 'no-data'">
            {{ item.code }}
          </template>
          <template v-else>
            <div class="drag-area">
              <span class="sp1">{{ item.name }}组件</span>
              <span class="sp2">请在此区域拖拽</span>
              <div class="oper">
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
          </template>
        </div>
      </v-draggable>
    </div>
  </div>
</template>
<script>
import _ from 'lodash'
import { mapState, mapMutations } from 'vuex'
import { findComponentsDownward } from '@/utils'
import vDraggable from 'vuedraggable'
import mHeader from './header'
import mBanner from './banner'
import mNotice from './notice'
import mNavigation from './navigation'
import mTitle from './title'
import mAdvertise from './advertise'
import mCommodity from './commodity'
import mDelete from './delete'

export default {
  name: 'ViewArea',
  components: { mHeader, mBanner, mNotice, vDraggable, mNavigation, mTitle, mDelete, mAdvertise, mCommodity },
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
    onSettings(item) {
      const instance = findComponentsDownward(this.$root, 'SettingsArea')[0]
      instance.setSelected(item.code)
    },
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
        &:hover {
          .drag-area {
            display: block;
          }
        }
        .drag-area {
          width: 420px;
          height: 30px;
          line-height: 28px;
          background: #409EFF;
          position: absolute;
          left: 0;
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
