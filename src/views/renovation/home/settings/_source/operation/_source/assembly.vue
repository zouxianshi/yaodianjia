<template>
  <div class="operation-assembly-model">
    <el-button type="primary" size="small" @click="onSave">保存</el-button>
    <el-button type="primary" plain size="small" @click="onPreviousStep">上一步</el-button>
    <el-button type="primary" plain size="small">预览</el-button>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'Assembly',
  data() {
    return {}
  },
  props: {},
  methods: {
    ...mapActions('renovation', ['saveHomeSetting']),
    onSave() {
      this.saveHomeSetting()
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
  computed: {},
  components: {}
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .assembly-model {

  }
</style>
