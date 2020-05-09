<template>
  <div class="hs-el-card-model">
    <el-card class="va-first-item-box-card" shadow="hover">
      <div slot="header" class="snb-bc-header">
        <span class="snb-text">{{ title }}</span>
        <div class="snb-del">
          <el-popover v-model="visible" placement="top" width="160">
            <p style="font-size: 12px;padding-bottom: 8px;">确定删除吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="visible = false">取消</el-button>
              <el-button type="primary" size="mini" @click="onDel">确定</el-button>
            </div>
            <el-tooltip slot="reference" effect="dark" :content="delText" placement="top">
              <el-button type="danger" icon="el-icon-delete" :disabled="isDisabled" circle size="mini" />
            </el-tooltip>
          </el-popover>
          <el-tooltip effect="dark" :content="addText" placement="top">
            <el-button v-if="isAdd" type="primary" icon="el-icon-plus" circle size="mini" @click="onAdd" />
          </el-tooltip>
        </div>
      </div>
      <slot />
    </el-card>
  </div>
</template>
<script>
export default {
  name: 'HsElCard',
  data() {
    return {
      visible: false
    }
  },
  props: {
    isAdd: {
      type: Boolean,
      default: false
    },
    isDisabled: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '标题'
    },
    addText: {
      type: String,
      default: '新增'
    },
    delText: {
      type: String,
      default: '删除'
    },
    index: {
      type: Number,
      default: 0
    }
  },
  methods: {
    onAdd() {
      this.$parent.$parent.$parent._onAdd(this.index)
      this.visible = false
    },
    onDel() {
      this.$parent.$parent.$parent._onDel(this.index)
      this.visible = false
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
  beforeDestroy() {
  },
  destroyed() {
  },
  computed: {},
  components: {}
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .hs-el-card-model {
    margin-bottom: 10px;
    .snb-bc-header {
      position: relative;
      height: 14px;
      .snb-text {
        font-size: 14px;
      }
      .snb-del {
        position: absolute;
        right: 0;
        top: -3px;
        .el-button--mini.is-circle {
          padding: 3px;
        }
      }
    }
    .el-card__header {
      padding: 10px 20px;
    }
    .el-card__body {
      padding: 14px;
      .el-form-item--mini.el-form-item {
        margin-bottom: 8px;
      }
    }
  }
</style>
