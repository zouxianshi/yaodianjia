<template>
  <div class="operation-assembly-model">
    <el-button type="primary" size="small" @click="onSave">保存</el-button>
    <el-button type="primary" plain size="small" @click="onPreviousStep">上一步</el-button>
    <el-button type="primary" plain size="small">预览</el-button>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import { verifRequired } from './utils'
import { findComponentsDownward } from '@/utils'

export default {
  name: 'Assembly',
  data() {
    return {}
  },
  props: {},
  methods: {
    ...mapMutations('renovation', ['setStepVal']),
    ...mapActions('renovation', ['saveHomeSetting']),
    onSave() {
      const dragList = _.map(this.dragList, v => { return { ...v, error: verifRequired[v.type](v.itemList) } })

      if (_.some(dragList, { error: true })) {
        const instance = findComponentsDownward(this.$root, 'SaPreview')[0]
        instance.$setVifDragData(dragList)
      }

      // this.saveHomeSetting()
    },
    onPreviousStep() {
      this.setStepVal(1)
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
  computed: {
    ...mapState('renovation', ['staticDragData', 'dragList'])
  },
  components: {}
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .assembly-model {

  }
</style>
