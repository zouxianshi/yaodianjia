<template>
  <div class="step-assembly-model">
    <div class="sam-components">
      <m-sa-title text-name="组件库" text-desc="拖拽组件至预览页" />
      <m-components />
    </div>
    <div class="sam-preview">
      <m-sa-title text-name="预览页" text-desc="点击组件可设置组件" />
      <m-preview />
    </div>
    <div class="sam-set">
      <m-sa-title text-name="设置组件" text-desc="点击组件样式可设置组件" />
      <m-set />
    </div>
  </div>
</template>
<script>
import mSet from './_source/set/set'
import mSaTitle from './_source/saTitle'
import mPreview from './_source/preview/preview'
import mComponents from './_source/components/components'
export default {
  name: 'StepAssembly',
  data() {
    return {}
  },
  props: {},
  methods: {},
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
  components: { mComponents, mPreview, mSet, mSaTitle }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .step-assembly-model {
    overflow: hidden;
    padding: 20px 20px 0px 20px;
    .sam-components,.sam-preview,.sam-set {
      float: left;
    }
    .sam-components {
      width: 246px;
    }
    .sam-preview {
      width: 360px;
      margin: 0 30px;
    }
    .sam-set {
      width: calc(100% - 666px);
    }
  }
</style>
