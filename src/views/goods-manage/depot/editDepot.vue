<template>
  <m-edit ref="mEdit" />
</template>
<script>
import mEdit from './../new-goods/edit'
export default {
  name: 'EditDepot',
  components: { mEdit },
  beforeRouteLeave(to, from, next) {
    const leaveAction = this.$refs['mEdit'].leaveAction

    if (!leaveAction) {
      const answer = window.confirm('你还有数据没有保存，是否确认退出')
      if (answer) {
        if (this.pageLoading) {
          this.pageLoading.close()
        }
        this.$store.dispatch('tagsView/delView', from)
        next()
      } else {
        next(false)
      }
    } else {
      next()
    }
  }
}
</script>
