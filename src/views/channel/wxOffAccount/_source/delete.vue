<template>
  <el-popover v-model="visible" placement="top" width="160" popper-class="plx-delete-model">
    <p class="p-text">这是一段内容这是一段内容确定删除吗？</p>
    <div style="text-align: right; margin: 0">
      <el-button size="mini" type="text" @click="visible = false">取消</el-button>
      <el-button type="primary" size="mini" @click="onDelete">确定</el-button>
    </div>
    <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini" circle />
  </el-popover>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  name: 'Delete',
  components: {},
  props: {
    level1Index: {
      type: Number,
      default: 0
    },
    level2Index: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      visible: false
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
  methods: {
    ...mapMutations('channel', ['delMenu']),
    async onDelete() {
      const { level1Index, level2Index } = this
      await this.delMenu({ level1Index, level2Index })
      this.$options.parent.setActiveReset()
      this.visible = false
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .plx-delete-model {
    .p-text {
      font-size: 12px;
      padding: 4px;
    }
  }
</style>
