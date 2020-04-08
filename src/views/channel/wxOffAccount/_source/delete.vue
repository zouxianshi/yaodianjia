<template>
  <el-popover v-model="visible" placement="top" width="160" popper-class="plx-delete-model">
    <p class="p-text">确定删除当前菜单吗？</p>
    <div style="text-align: right; margin: 0">
      <el-button size="mini" type="text" @click="visible = false">取消</el-button>
      <el-button type="primary" size="mini" :loading="loading" @click="onDelete">确定</el-button>
    </div>
    <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini" circle />
  </el-popover>
</template>
<script>
import { mapActions, mapMutations } from 'vuex'
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
      visible: false,
      loading: false
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
    ...mapActions('channel', ['saveCustomMenu']),
    ...mapMutations('channel', ['delMenu']),
    async onDelete() {
      const { level1Index, level2Index } = this
      this.loading = true
      await this.delMenu({ level1Index, level2Index })
      await this.saveCustomMenu().then(() => {
        this.$options.parent.setActiveReset()
        this.visible = false
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .plx-delete-model {
    .p-text {
      font-size: 12px;
      padding: 2px 0 10px 0;
    }
  }
</style>
