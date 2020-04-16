<template>
  <div class="va-delete-model">
    <el-popover v-model="visible" placement="top" width="160">
      <p style="font-size: 13px;padding: 0 0 8px 0">确定删除区域吗？</p>
      <div style="text-align: right; margin: 0">
        <el-button size="mini" type="text" @click="visible = false">取消</el-button>
        <el-button type="primary" size="mini" @click="onDelete">确定</el-button>
      </div>
      <i slot="reference" class="el-icon-delete" />
    </el-popover>

  </div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  name: 'VaDelete',
  data() {
    return {
      visible: false
    }
  },
  props: {
    index: {
      type: Number,
      default: null
    }
  },
  methods: {
    ...mapMutations('mall', ['delDragData']),
    onDelete() {
      this.delDragData({
        $index: this.index
      })
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
  .va-delete-model {
    width: 40px;
    height: 30px;
    background: #FE5753;
    border-radius: 0 4px 4px 0;
    cursor: pointer;
    .el-icon-delete {
      color: #fff;
    }
  }
</style>
