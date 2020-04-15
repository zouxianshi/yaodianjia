<template>
  <el-popover v-model="visible" placement="bottom-start" trigger="click" :popper-class="'nav-select-icon'">
    <div class="scrollbar select-icon-box">
      <div v-for="(el,i) in 40" :key="i" class="sim-item " :class="{active:i === 3}">
        <el-image src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" />
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
export default {
  name: 'SelectIcon',
  data() {
    return {
      visible: false
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
      width: 268px;
      height: 280px;
      margin-right: -8px;
      overflow-y: scroll;
      .sim-item {
        width: 44px;
        height: 44px;
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
        .el-image {
          display: block;
          width: 40px;
          height: 40px;
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
