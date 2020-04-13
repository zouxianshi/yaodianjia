<template>
  <div class="view-area-model">
    <!--头部-->
    <m-header />

    <!--banner轮播图-->
    <m-banner />

    <!--公告-->
    <m-notice />

    <div class="vam-draggable">
      <v-draggable v-model="dragComponent" draggable=".item" v-bind="dragOptions">
        <transition-group type="transition" :name="'va-list'">
          <span v-for="(el,i) in dragComponent" :key="i" class="item">
            <el-button size="small">{{ el.name }}</el-button>
          </span>
        </transition-group>
      </v-draggable>
    </div>
  </div>
</template>
<script>
import vDraggable from 'vuedraggable'
import mHeader from './header'
import mBanner from './banner'
import mNotice from './notice'

const dragComponent = [
  {
    name: '导航栏',
    code: 'navigation'
  }
]

export default {
  name: 'ViewArea',
  components: { mHeader, mBanner, mNotice, vDraggable },
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
  .view-area-model {
    height: 1200px;
    .vam-draggable {

    }
  }
</style>
