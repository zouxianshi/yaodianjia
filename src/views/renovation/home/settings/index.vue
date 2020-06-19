<template>
  <div class="home-settings-model">
    <div class="hsm-step">
      <m-step />
    </div>
    <div class="hsm-main">
      <component :is="mod" />
    </div>
    <div class="hsm-operation">
      <m-operation />
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import mStep from './_source/step'
import mStepBasics from './_source/stepBasics/stepBasics'
import mStepAssembly from './_source/stepAssembly/stepAssembly'
import mStepState from './_source/stepState/stepState'
import mOperation from './_source/operation/operation'

export default {
  name: 'HomeSettingsIndex',
  data() {
    return {
    }
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
    ...mapState('renovation', ['stepVal']),
    mod() { // eslint-disable-line
      switch (this.stepVal) {
        case 1:
          return mStepBasics
        case 2:
          return mStepAssembly
        case 3:
          return mStepState
      }
    }
  },
  components: { mStep, mOperation }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .home-settings-model {
    background: #fff;
    border-radius: 4px;
    height: calc(100vh - 200px);
    position: relative;
    .hsm-operation {
      position: absolute;
      bottom: -20px;
      left: -20px;
      width:calc(100% + 40px);
      padding: 12px;
      text-align: center;
      background: #fff;
      box-shadow:0px -2px 4px 0px rgba(0,0,0,0.1);
    }
  }
</style>
