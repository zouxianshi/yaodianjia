<template>
  <div class="step-assembly-model">
    <div class="sam-components">
      <m-sa-title text-name="组件库" text-desc="拖拽组件至预览页" />
      <div class="sam-ass">
        <m-components />
      </div>
    </div>
    <div class="sam-content">
      <div class="sam-preview">
        <m-sa-title text-name="预览页" text-desc="点击组件可设置组件" />
        <m-preview />
      </div>
      <div class="sam-set">
        <m-sa-title text-name="设置组件" text-desc="点击组件样式可设置组件" />
        <m-set />
      </div>
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
  computed: {
  },
  components: { mComponents, mPreview, mSet, mSaTitle }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .step-assembly-model {
    overflow: hidden;
    padding: 20px 20px 0px 20px;
    .sam-components {
      width: 246px;
      position: absolute;
      left: 20px;
      top: 20px;
    }
    .sam-content {
      width: calc(100% - 304px);
      position: absolute;
      left: 288px;
      top: 20px;
      .sam-preview {
        width: 360px;
      }
    }
    .sam-set {
      width: calc(100% - 386px);
      position: absolute;
      left: 382px;
      top: 0;
      .sam-preview {
        width: 360px;
      }
    }
    .sa-assembly-error {
      font-size: 12px;
      color: #ff0000;
      text-align: left;
    }
  }
</style>
