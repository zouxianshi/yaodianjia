<template>
  <div class="app-wrapper">
    <div class="layout-wary">
      <div class="sidebar-box" :style="{width:!isOpen ? ' 255px' : '64px'}">
        <m-sidebar v-model="isOpen" :sidebar-list="navList" :def-page="$route.path" @on-path="_onPath" />
      </div>
      <div class="app-main-box" :style="_styleToggle">
        <div class="flx" :style="_styleToggle">
          <m-header />
          <div class="breadcrumb-box">
            <breadcrumb />
          </div>
          <tags-view />
        </div>
        <div style="padding-top: 90px;">
          <app-main />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { mapState } from 'vuex'
import ResizeMixin from './mixin/ResizeHandler'
import { mSidebar,mHeader ,MC} from '@merchant/commons'
import RightPanel from '@/components/RightPanel'
import { AppMain,  TagsView } from './components'
import Breadcrumb from '@/components/Breadcrumb'
import ps from './psHandler'
import { removeToken } from '@/utils/auth'

export default {
  name: 'merchant-commons-app',
  data(){
    return {
      navList: ps.navList(),
      defPage: '/home',
      isOpen:false
    }
  },
  components: {mSidebar,TagsView,AppMain,RightPanel,mHeader,Breadcrumb},
  mixins: [ResizeMixin],
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo,
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    },
    _styleToggle(){
      const {isOpen} = this
      return {
        width: !isOpen ? 'calc(100% - 255px)' : 'calc(100% - 64px)',
        left:!isOpen ? '255px' : '64px'
      }
    },
  },
  created () {

  },
  mounted () {

  },
  watch:{
  },
  methods: {
    $__mcPassWordOpt () {
      return {
        // Promise then
        onSuccess: res => {
          console.log(res)
        },
        // Promise catch
        onError: res => {
          console.log(res)
        }
      }
    },
    $__mcPersonalOpt () {
      return {
        // Promise then
        onSuccess: res => {
          console.log(res)
        },
        // Promise catch
        onError: res => {
          console.log(res)
        }
      }
    },
    _onPath (v) {
      this.$router.push({
        path:v.path
      })
    },
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/helpers/_mixins.scss';
@import '~@/assets/scss/helpers/_variables.scss';

.layout-wary {
  position: relative;
  .sidebar-box {
    position: fixed;
    left: 0;
    top: 0;
    width: 255px;
    height: calc(100vh);
    z-index: 2;
  }
  .app-main-box {
    position: absolute;
    left: 255px;
    top: 0;
    width: calc(100% - 255px);
    overflow-y: auto;
    height: calc(100vh);
    z-index: 1;
    &:hover::-webkit-scrollbar-thumb {
      background: #409eff;
      min-width: 200px;
    }

    &::-webkit-scrollbar {
      width: 5px;
      height: 10px;
      background: #fff;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
      border-radius: 5px;
      margin: 4px 0;
    }

    &::-webkit-scrollbar-thumb {
      background: #409eff;
      border-radius: 5px;
    }
    .breadcrumb-box {
      position: absolute;
      top: 0;
      left: 46px;
    }
    .flx {
      position: fixed;
      top: 0;
      left: 255px;
      width: calc(100% - 255px);
      z-index: 9;
      background: #fff;
    }

  }
}

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
