<template>
  <span>
    <el-popover v-model="visible" placement="top" width="160">
      <p>确定删除吗 ？</p>
      <div style="text-align: right; margin: 0">
        <el-button size="mini" type="text" @click="visible=false">取消</el-button>
        <el-button type="primary" size="mini" @click="handleDel">确定</el-button>
      </div>
      <el-tooltip slot="reference" class="item" effect="dark" content="删除" placement="top">
        <el-button type="danger" icon="el-icon-delete" circle size="mini" />
      </el-tooltip>
    </el-popover>
  </span>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Operation',
  components: {},
  props: {
    groupId: {
      type: String,
      default: ''
    },
    level: { // 级别
      type: String,
      default: '1'
    },
    oneIndex: { // 下标
      type: Number,
      default: 0
    },
    twoIndex: { // 下标
      type: Number,
      default: 0
    },
    threeIndex: { // 下标
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      visible: false
    }
  },
  computed: {
    ...mapGetters(['groupList', 'merCode'])
  },
  watch: {},
  created() {
  },
  methods: {
    handleDel() {
      this.$store.dispatch('group/removeGroup', this.groupId).then(res => {
        const update = JSON.parse(JSON.stringify(this.groupList))
        if (this.level === '1') {
          update.splice(this.oneIndex, 1)
        } else if (this.level === '2') {
          update[this.oneIndex].children.splice(this.twoIndex, 1)
        } else {
          update[this.oneIndex].children[this.twoIndex].children.splice(this.threeIndex, 1)
        }
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.$store.dispatch('group/updateGroup', update)
      })
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
