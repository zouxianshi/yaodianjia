<template>
  <div class="view-area-model">
    <!--头部-->
    <m-header />

    <!--banner轮播图-->
    <m-banner :item-list="bannerItemList" style="margin-left: -0.5px" />

    <!--公告-->
    <m-notice />

    <!--拖拽操作-->
    <div class="vam-draggable">
      <v-draggable v-model="dragList" draggable=".item-component" v-bind="dragOptions" @end="onEnd" @add="onAdd">
        <div v-for="(item,$index) in dragList" :id="item.uuid" :key="item.uuid" class="item-component">
          <m-va-error-drag v-if="item.type !== 'no-data' && item.error" :type="item.type" />
          <m-no-data v-if="item.type === 'no-data'" />
          <template v-else>
            <div class="drag-area">
              <span class="sp1">{{ item.name }}组件</span>
              <span class="sp2">请在此区域拖拽</span>
              <div class="oper">
                <m-edit v-if="item.type !== 'recommend'" :item="item" />
                <m-delete :index="$index" />
              </div>
            </div>
            <!--导航栏-->
            <m-navigation v-if="item.type === 'navigation'" :key="item.uuid" :item="{...item,$index:$index}" />
            <!--标题-->
            <m-title v-if="item.type === 'title'" :key="item.uuid" :item="{...item,$index:$index}" />
            <!--广告图-->
            <m-advertise v-if="item.type === 'advertise'" :key="item.uuid" :item="{...item,$index:$index}" />
            <!--商品-->
            <m-commodity v-if="item.type === 'commodity'" :key="item.uuid" :item="{...item,$index:$index}" />
            <!--为你推荐-->
            <m-recommend v-if="item.type === 'recommend'" :key="item.uuid" :item="{...item,$index:$index}" />
          </template>
        </div>
      </v-draggable>
    </div>

    <!--底部导航-->
    <m-bottom-nav />
    <el-dialog title="模板名称设置" append-to-body :visible.sync="isSaveVisible" width="500">
      <m-save-dialog v-if="isSaveVisible" @on-close="() => isSaveVisible = false" />
    </el-dialog>
  </div>
</template>
<script>
import _ from 'lodash'
import { mapState, mapMutations, mapActions } from 'vuex'
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
import mSaveDialog from './_source/saveDialog'
import mDelete from './_source/delete'
import mBottomNav from './bottomNav'
import mNoData from './noData'
import mVaErrorDrag from './_source/vaErrorDrag'
import { jumpCurrentSet, verifRequired, toPosition, getBannerList } from './_source/utils'

export default {
  name: 'ViewArea',
  components: { mHeader, mBanner, mSaveDialog, mVaErrorDrag, mNotice, vDraggable, mNavigation, mTitle, mDelete, mEdit, mAdvertise, mCommodity, mRecommend, mNoData, mBottomNav },
  props: {},
  data() {
    return {
      dragList: [],
      isSaveVisible: false,
      bannerItemList: []
    }
  },
  computed: {
    ...mapState('mall', ['dragData', 'dragGlobal']),
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
  watch: {},
  beforeCreate() {
  },
  created() {
    this.dragList = _.cloneDeep(this.dragData)
    getBannerList().then(itemList => {
      this.bannerItemList = itemList
    })
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
    ...mapActions('mall', ['saveStructure']),
    ...mapMutations('mall', ['setDragData']),
    /**
     * drag end
     */
    onEnd(v) {
      // this.setDragData()
    },
    /**
     * drag add
     */
    onAdd() {
      this.dragList = _.reject(this.dragList, ['type', 'no-data'])
      this.setDragData(this.dragList)
    },
    /**
     * Process saved data and do error verification
     */
    handlerVerifDragData(fn) {
      const { dragList, dragGlobal } = this
      const { subType } = _.head(dragList)

      if (!dragGlobal.title) {
        this.$message.error('请输入微商城名称！')
        jumpCurrentSet(this.$root, { type: 'mall-title' })
        return fn()
      }

      if (dragList.length === 1 && subType === 'no-data') {
        this.$message.error('请拖拽部署商城首页！')
        return fn()
      }
      this.dragList = _.map(dragList, v => { return { ...v, error: verifRequired[v.type](v.itemList) } })

      this.setDragData(this.dragList)

      const headItem = _.head(_.reject(this.dragList, ['error', false]))

      if (!_.some(this.dragList, { error: true })) {
        // todo 弹层保存
        this.isSaveVisible = true
        fn()
      } else {
        toPosition(headItem.uuid)
        jumpCurrentSet(this.$root, headItem)
        fn()
      }
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
