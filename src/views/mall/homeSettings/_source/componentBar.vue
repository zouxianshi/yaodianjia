<template>
  <div class="component-bar-model">
    <div class="cbm-title">
      <b>组件选择</b>
    </div>
    <div class="cbm-operation">
      <el-button size="mini">预览</el-button>
      <el-button type="primary" size="mini">保存</el-button>
    </div>
    <div class="cbm-nav-box">
      <el-tabs v-model="activeName" type="card" size="small">
        <el-tab-pane v-for="(item,$index) in dragComponent" :key="$index" :name="item.name" :label="item.name">
          <div class="cbm-draggable">
            <v-draggable v-model="item.component" draggable=".item" v-bind="dragOptions">
              <span v-for="(el,i) in item.component" :key="i" class="item">
                <el-button size="small">{{ el.name }}</el-button>
              </span>
            </v-draggable>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import { uuid } from '@/utils'
import vDraggable from 'vuedraggable'
import navigation from './viewArea/navigation/default'

const dragComponent = [
  {
    name: '导航栏',
    component: [
      {
        uuid: `${uuid('navigation-')}${uuid()}${uuid()}${uuid()}`,
        code: 'navigation',
        type: 'first',
        name: '一排四个',
        data: navigation.first
      },
      {
        uuid: `${uuid('navigation-')}${uuid()}${uuid()}${uuid()}`,
        code: 'navigation',
        type: 'second',
        name: '一排五个',
        data: navigation.second
      }
    ]
  },
  {
    name: '商品',
    component: [
      {
        uuid: `${uuid('commodity-')}${uuid()}${uuid()}${uuid()}`,
        code: 'commodity',
        type: 'first',
        name: '2个一排'
      },
      {
        uuid: `${uuid('commodity-')}${uuid()}${uuid()}${uuid()}`,
        code: 'commodity',
        type: 'second',
        name: '3个一排'
      },
      {
        uuid: `${uuid('commodity-')}${uuid()}${uuid()}${uuid()}`,
        code: 'commodity',
        type: 'third',
        name: '多个滚动一排'
      },
      {
        uuid: `${uuid('commodity-')}${uuid()}${uuid()}${uuid()}`,
        code: 'commodity',
        type: 'four',
        name: '单个一排'
      }
    ]
  },
  {
    name: '标题',
    component: [
      {
        uuid: `${uuid('title-')}${uuid()}${uuid()}${uuid()}`,
        code: 'title',
        type: 'first',
        name: '单个标题'
      }
    ]
  },
  {
    name: '广告图',
    component: [
      {
        uuid: `${uuid('advertise-')}${uuid()}${uuid()}${uuid()}`,
        code: 'advertise',
        type: 'first',
        name: '轮播图'
      },
      {
        uuid: `${uuid('advertise-')}${uuid()}${uuid()}${uuid()}`,
        code: 'advertise',
        type: 'second',
        name: '左一右二图'
      },
      {
        uuid: `${uuid('advertise-')}${uuid()}${uuid()}${uuid()}`,
        code: 'advertise',
        type: 'third',
        name: '三个一排'
      },
      {
        uuid: `${uuid('advertise-')}${uuid()}${uuid()}${uuid()}`,
        code: 'advertise',
        type: 'four',
        name: '四个两排'
      },
      {
        uuid: `${uuid('advertise-')}${uuid()}${uuid()}${uuid()}`,
        code: 'advertise',
        type: 'five',
        name: '不限高广告图'
      }
    ]
  },
  {
    name: '为你推荐',
    component: [
      {
        uuid: `${uuid('recommend-')}${uuid()}${uuid()}${uuid()}`,
        code: 'recommend',
        type: 'first',
        name: '两个一排'
      },
      {
        uuid: `${uuid('recommend-')}${uuid()}${uuid()}${uuid()}`,
        code: 'recommend',
        type: 'second',
        name: '单个一排'
      }
    ]
  }
]

export default {
  name: 'ComponentBar',
  components: { vDraggable },
  props: {},
  data() {
    return {
      dragComponent,
      activeName: '导航栏'
    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 150,
        disabled: false,
        ghostClass: 'ghost',
        group: {
          put: false,
          name: 'shared',
          pull: 'clone'
        }
      }
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
  methods: {},
  beforeDestroy() {
  },
  destroyed() {
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .component-bar-model {
    height: 116px;
    position: relative;
    .cbm-operation {
      position: absolute;
      right: 20px;
      top: 12px;
      z-index: 1;
    }
    .cbm-nav-box {
      .el-tabs__nav-scroll {
        padding: 14px 0 0 110px;
        .el-tabs__item {
          height: 36px;
          line-height: 36px;
        }
      }
    }
    .cbm-title {
      position: absolute;
      left: 27px;
      top: 21px;
      b {
        font-size: 14px;
      }
    }
    .cbm-draggable {
      padding-left: 110px;
      .item {
        margin-right: 10px;
      }
    }
  }
</style>
