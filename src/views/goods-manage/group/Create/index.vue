<template>
  <div class="app-container">
    <div class="ac-box">
      <p style="font-size:13px"> 当前分组标题：{{ $route.query.name }}</p>
      <div class="gt-create-model">
        <div class="content">
          <div class="conditions">
            <m-conditions />
          </div>
          <div class="list">
            <m-drag-tree :list="groupList" />
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
import mDragTree from './_source/dragTree'
import mConditions from './_source/conditions'
import { mapGetters } from 'vuex'
export default {
  name: 'Index',
  components: { mConditions, mDragTree },
  props: {},
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters(['groupList', 'merCode'])
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.$store.dispatch('group/getGroupList', { merCode: this.merCode, id: this.$route.params.id })
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .gt-create-model {
    .content {
      margin-top: 20px;
      // border: 1px solid #e8eaec;
      border-radius: 3px;
      margin-bottom: 90px;
      .list {
        min-height: calc(100vh - 248px);
      }
    }
  }
</style>
