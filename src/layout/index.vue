<template>
  <div class="app-wrapper">
    <div class="layout-wary">
      <div class="sidebar-box" :style="{width:!isOpen ? ' 255px' : '64px'}">
        <m-sidebar v-model="isOpen" :res-list="resList" :def-page="$route.path" />
      </div>
      <div class="app-main-box" :style="_styleToggle">
        <div class="flx" :style="_styleToggle">
          <m-header>
            <tags-view slot="tags" />
            <breadcrumb slot="breadcrumb" />
            <div slot="consultation">
              <r-y v-auth:staff.online-ask />
            </div>
          </m-header>
        </div>
        <div class="app-main-model">
          <app-main />
          <mc-copyright />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
  import { mapState } from "vuex";
  import ResizeMixin from "./mixin/ResizeHandler";
  import { mSidebar, mHeader, MC,mCommon } from "@merchant/commons";
  import RightPanel from "@/components/RightPanel";
  import { AppMain, TagsView } from "./components";
  // 融云消息按钮 sdk初始化
  import RY from '@/components/RY'
  import Breadcrumb from "@/components/Breadcrumb";
  import ps from "./psHandler";
  import { removeToken } from "@/utils/auth";

const {McCopyright} = mCommon

  export default {
    name: "merchant-commons-app",
    data() {
      return {
        navList: ps.navList(),
        showMsgBtn: ps.showMsgBtn(),
        defPage: "/home",
        isOpen: false
      };
    },
    components: { mSidebar, TagsView, AppMain, RightPanel, mHeader, Breadcrumb, RY ,McCopyright},
    mixins: [ResizeMixin],
    computed: {
      ...mapState({
        resList: state => state.user.resList,
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
          mobile: this.device === "mobile"
        };
      },
      _styleToggle() {
        const { isOpen } = this;
        return {
          width: !isOpen ? "calc(100% - 255px)" : "calc(100% - 64px)",
          left: !isOpen ? "255px" : "64px"
        };
      }
    },
    created() {},
    mounted() {},
    watch: {},
    methods: {
      $__mcPassWordOpt() {
        return {
          // Promise then
          onSuccess: res => {
            console.log(res);
          },
          // Promise catch
          onError: res => {
            console.log(res);
          }
        };
      },
      $__mcPersonalOpt() {
        return {
          // Promise then
          onSuccess: res => {
            console.log(res);
          },
          // Promise catch
          onError: res => {
            console.log(res);
          }
        };
      },
      _onPath(v) {
        this.$router.push({
          path: v.path
        });
      },
    }
  };
</script>

<style lang="scss" scoped>
  @import "~@/assets/scss/helpers/_mixins.scss";
  @import "~@/assets/scss/helpers/_variables.scss";
  .layout-wary {
    position: relative;
    .sidebar-box {
      position: fixed;
      left: 0;
      top: 0;
      width: 255px;
      height: calc(100vh);
      // z-index: 2;
    }
    .app-main-box {
      position: absolute;
      left: 255px;
      top: 0;
      width: calc(100% - 255px);
      z-index: 1;
      .app-main-model {
        margin-top: 152px;
        background: #F5F7FA;
        padding-top: 20px;
        .copyright {
          height: 20px;
          line-height: 20px;
          font-size: 12px;
          text-align: center;
          color: #888;
        }
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
