<template>
  <el-popover v-model="visible" placement="bottom-start" trigger="click" :popper-class="'nav-select-icon'">
    <div class="scrollbar select-icon-box">
      <div v-for="(el,i) in defaultIcons" :key="i" class="sim-item" :class="{active:el.icon === activeIcon}" @click="onSelect(el.icon)">
        <m-icons :icon-clx="el.icon" :size="64" />
        <i class="el-icon-caret-top" />
      </div>
    </div>
    <div class="select-icon-ope">
      <el-button size="mini" type="text" @click="visible = false">取消</el-button>
      <el-button type="primary" size="mini" @click="onSubmit">确定</el-button>
    </div>
    <el-button slot="reference" icon="el-icon-caret-bottom">选择图标</el-button>
  </el-popover>
</template>
<script>
import _ from 'lodash'
import mIcons from './../../_source/icons'
export default {
  name: 'SelectIcon',
  data() {
    return {
      visible: false,
      activeIcon: '',
      defaultIcons: _.times(12, v => {
        return {
          icon: `sa_default_icons_${v}`
        }
      })
    }
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    async onSubmit() {
      await this.$emit('on-upload', { img: this.activeIcon })
      this.visible = false
    },
    onSelect(icon) {
      this.activeIcon = icon
    }
  },
  watch: {
    'item.img': {
      deep: true,
      immediate: true,
      handler(v) {
        this.activeIcon = v
      }
    }
  },
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
  components: { mIcons }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .nav-select-icon {
    .select-icon-box {
      overflow: hidden;
      width: 310px;
      height: 232px;
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
</style>
