<template>
  <el-popover v-model="visible" placement="top" width="160">
    <p style="margin-bottom: 10px">确定删除吗？</p>
    <div style="text-align: right; margin: 0">
      <el-button size="mini" type="text" @click="visible = false">取消</el-button>
      <el-button type="primary" size="mini" @click="onDel">确定</el-button>
    </div>
    <el-button slot="reference" type="primary" size="mini" style="margin: 0 0px 0 10px">删除</el-button>
  </el-popover>
</template>
<script>
import { delMallHome } from '@/api/mallService'
export default {
  name: 'Delete',
  data() {
    return {
      visible: false
    }
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    onDel() {
      delMallHome(this.item.id).then(() => {
        this.$message.success('删除成功！')
        this.visible = false
        this.$emit('on-update')
      }).catch(() => {
        this.visible = false
      })
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
  .delete-model {

  }
</style>
