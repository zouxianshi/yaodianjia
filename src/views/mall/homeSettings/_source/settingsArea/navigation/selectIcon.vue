<template>
  <el-popover v-model="visible" placement="bottom-start" trigger="click" :popper-class="'nav-select-icon'">
    <div class="scrollbar select-icon-box">
      <div v-for="(el,i) in defaultIcons" :key="i" class="sim-item" :class="{active:i === 3}">
        <div :class="'sa-default-icons-' + i" />
        <i class="el-icon-caret-top" />
      </div>
    </div>
    <div class="select-icon-ope">
      <el-button size="mini" type="text" @click="visible = false">取消</el-button>
      <el-button type="primary" size="mini" @click="visible = false">确定</el-button>
    </div>
    <el-button slot="reference" icon="el-icon-caret-bottom">选择图标</el-button>
  </el-popover>

</template>
<script>
import _ from 'lodash'
export default {
  name: 'SelectIcon',
  data() {
    return {
      visible: false,
      url: './sa_default_icons_0.png',
      defaultIcons: _.times(17, v => {
        return {
          icon: `../img/sa_default_icons_${v}.png`
        }
      })
    }
  },
  props: {},
  methods: {},
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
  beforeDestroy() {
  },
  destroyed() {
  },
  computed: {},
  components: {}
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .nav-select-icon {
    .select-icon-box {
      overflow: hidden;
      width: 310px;
      height: 304px;
      margin-right: -8px;
      overflow-y: scroll;
      .sim-item {
        width: 68px;
        height: 68px;
        border: 2px solid #fff;
        display: inline-block;
        position: relative;
        margin-right: 8px;
        margin-bottom: 8px;
        float: left;
        cursor: pointer;
        .el-icon-caret-top {
          position: absolute;
          right: -8px;
          bottom: -8px;
          -webkit-transform: rotate(45deg);
          transform: rotate(494deg);
          color: #09d26d;
          font-size: 18px;
          display: none;
        }
        &.active {
          border-color:#09d26d;
          .el-icon-caret-top {
            display: block;
          }
        }
        &:hover {
          border-color:#09d26d;
        }
      }
    }
    .select-icon-ope {
      padding-top: 10px;
      text-align: right;
    }
  }
  @for $i from 0 through 17 {
    .sa-default-icons-#{$i} {
      width: 64px;
      height: 64px;
      background: url('./../img/sa_default_icons_#{$i}.png');
    }
  }
</style>
