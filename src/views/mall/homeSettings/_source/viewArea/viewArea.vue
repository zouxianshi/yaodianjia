<template>
  <div class="view-area-model">
    <!--头部-->
    <m-header />

    <!--banner轮播图-->
    <m-banner />

    <!--公告-->
    <m-notice />

    <m-navigation type="first" />

    <div class="vam-draggable">
      <v-draggable v-model="dragComponent" draggable=".item" v-bind="dragOptions">
        <span v-for="(el,i) in dragComponent" :key="i" class="item">
          <el-button size="small">{{ el.name }}</el-button>
        </span>
      </v-draggable>
    </div>
  </div>
</template>
<script>
import { uuid } from '@/utils'
import vDraggable from 'vuedraggable'
import mHeader from './header'
import mBanner from './banner'
import mNotice from './notice'
import mNavigation from './navigation'

const dragComponent = [
  {
    name: '导航栏',
    code: 'navigation'
  }
]

export default {
  name: 'ViewArea',
  components: { mHeader, mBanner, mNotice, vDraggable, mNavigation },
  props: {},
  data() {
    return {
      dragComponent
    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 150,
        group: 'shared',
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
  methods: {
    cpdKey() {
      return `${uuid('va-')}${uuid()}`
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

    }
  }
</style>
