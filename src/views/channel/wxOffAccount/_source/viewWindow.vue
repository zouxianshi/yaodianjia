<template>
  <div class="view-window-model">
    <div class="vwm-title">海典智慧药房</div>
    <div class="vwm-content" />
    <div class="vwm-menu">
      <div class="vwm-keyboard">
        <img src="../img/keyboard.svg" alt="">
      </div>
      <div class="vwm-menu-box">
        <div class="level-1">
          <div class="name">会员中心</div>
          <div class="level-2" style="display: block">
            <i class="el-icon-caret-bottom" />
            <a href="#">菜单名称1</a>
            <a href="#">菜单名称1</a>
            <a href="#">菜单名称1</a>
            <a href="#">菜单名称1</a>
            <a href="#">菜单名称1</a>
          </div>
        </div>
        <div class="level-1">
          <div class="name">今日福利</div>
          <div class="level-2">
            <i class="el-icon-caret-bottom" />
            <a href="#">菜单名称1</a>
            <a href="#">菜单名称1</a>
            <a href="#">菜单名称1</a>
            <a href="#">菜单名称1</a>
            <a href="#">菜单名称1</a>
          </div>
        </div>
        <div class="level-1">
          <div class="name"><i class="el-icon-plus" /></div>
          <div class="level-2">
            <i class="el-icon-caret-bottom" />
            <a href="#">菜单名称1</a>
            <a href="#">菜单名称1</a>
            <a href="#">菜单名称1</a>
            <a href="#">菜单名称1</a>
            <a href="#">菜单名称1</a>
          </div>
        </div>
        <div class="clearfix" />
      </div>
      <div class="clearfix" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'ViewWindow',
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {},
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
  .view-window-model {
    height: 560px;
    .vwm-title {
      line-height: 46px;
      text-align: center;
      color: #333;
    }
    .vwm-content {
      height: 475px;
      background: #F5F5F5;
    }
    .vwm-menu {
      height: 44px;
      .vwm-keyboard {
        width: 50px;
        line-height: 44px;
        text-align: center;
        border-right: 1px solid #F3F3F3;
        float: left;
        img {
          width: 26px;
          height: 26px;
          display: inline-block;
          vertical-align: middle;
          margin-top: -8px;
        }
      }
      .vwm-menu-box {
        float: left;
        width: 268px;
        .level-1 {
          width: 89px;
          height: 44px;
          float: left;
          text-align: center;
          position: relative;
          cursor: pointer;
          &:hover {
            >.level-2 {
              display: block;
            }
          }
          >.level-2 {
            position: absolute;
            left: 0;
            bottom:60px;
            width: 89px;
            background: #fff;
            box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
            border-radius: 4px;
            display: none;
            .el-icon-caret-bottom {
              position: absolute;
              left: 38px;
              bottom: -10px;
              font-size: 16px;
              color: #fff;
            }
            >a {
              line-height: 28px;
              font-size: 14px;
              color: #333;
              display: block;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
          >.name {
            font-size: 14px;
            line-height: 44px;
            .el-icon-plus {
              color: #ccc;
            }
          }
          &:nth-child(2) {
            border-right: 1px solid #F3F3F3;
            border-left: 1px solid #F3F3F3;
          }
        }
      }
    }
  }
</style>
