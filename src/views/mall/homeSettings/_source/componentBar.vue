<template>
  <div class="component-bar-model">
    <div class="cbm-title">
      <span>组件选择</span>
    </div>
    <div class="cbm-draggable">
      <v-draggable v-model="dragComponent" draggable=".item" v-bind="dragOptions">
        <transition-group type="transition" :name="'flip-list'">
          <span v-for="(el,i) in dragComponent" :key="i" class="item">
            <el-button size="small">{{ el.name }}</el-button>
          </span>
        </transition-group>
      </v-draggable>
    </div>
    <div class="clearfix" />
  </div>
</template>
<script>
import vDraggable from 'vuedraggable'
const dragComponent = [
  {
    name: '导航栏',
    code: 'navigation'
  },
  {
    name: '商品',
    code: 'commodity'
  },
  {
    name: '标题',
    code: 'title'
  },
  {
    name: '广告图',
    code: 'advertise'
  },
  {
    name: '为你推荐',
    code: '为你推荐'
  }
]

export default {
  name: 'ComponentBar',
  components: { vDraggable },
  props: {},
  data() {
    return {
      dragComponent
    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 0,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost'
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
    height: 50px;
    .cbm-title,.cbm-draggable {
      float: left;
    }
    .cbm-title {
      line-height: 50px;
      width: 80px;
      text-align: right;
      margin-right: 16px;
      span {
        font-size: 14px;
      }
    }
    .cbm-draggable {
      padding-top: 10px;
      width: calc(100% - 96px);
      .item {
        margin-right: 10px;
      }
    }
  }
</style>
