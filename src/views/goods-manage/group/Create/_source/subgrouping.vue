<template>
  <el-popover placement="right" width="320" trigger="click">
    <div class="subgrouping-model">
      <el-input v-model="value" placeholder="请输入内容" size="mini" style="width: 230px;" />
      <div v-if="level === '3'" class="photo">
        <el-image
          style="width: 48px; height: 48px"
          :preview-src-list="['https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg']"
          src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
          fit="cover"
        />
      </div>
      <div class="oper">
        <el-button type="success" icon="el-icon-check" circle size="mini" />
        <el-button type="danger" icon="el-icon-close" circle size="mini" />
      </div>
    </div>

    <el-tooltip v-if="!$slots.default" slot="reference" class="item" effect="dark" :content="type === 'edit' ? '编辑' : `新建（${level === '1' ? '一' : '二'}级）子分组` " placement="top">
      <el-button v-if="contentType === 'button'" type="primary" icon="el-icon-folder-add" :disabled="level === '3'" circle size="mini" style="margin-right: 10px" />
      <i v-if="contentType === 'text'" class="icon-edit el-icon-edit" />
    </el-tooltip>
    <el-tooltip v-if="$slots.default" slot="reference" class="item" effect="dark" content="创建分组" placement="top">
      <slot />
    </el-tooltip>
  </el-popover>
</template>
<script>
export default {
  name: 'SubgroupingVue',
  components: {},
  props: {
    type: {
      type: String,
      default: ''
    },
    contentType: {
      type: String,
      default: 'text'
    },
    level: {
      type: String,
      default: '1'
    }
  },
  data() {
    return {
      value: ''
    }
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
  beforeDestroy() {
  },
  destroyed() {
  },
  methods: {}
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .subgrouping-model {
    position: relative;
    .el-button--mini.is-circle {
      padding: 4px;
    }
    .el-button {
      margin-left: 10px;
    }
    .photo {
      padding: 3px;
      border-radius: 3px;
      margin-left: -2px;
      margin-top: 6px;
      .el-image {
        border-radius: 3px;
      }
    }
    .oper {
      position: absolute;
      right: 2px;
      top: 4px;
    }
  }
</style>
