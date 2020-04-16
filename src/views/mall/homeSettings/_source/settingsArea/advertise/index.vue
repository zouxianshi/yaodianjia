<template>
  <div class="sa-advertise-model">
    <el-tabs :value="assemblyName" type="card">
      <el-tab-pane :label="assemblyName" :name="assemblyName">
        <component :is="mod" :item="item" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>

import mFirstAdvertise from './firstAdvertise'
import mSecondAdvertise from './secondAdvertise'
import mThirdAdvertise from './thirdAdvertise'
import mFourAdvertise from './fourAdvertise'
import mFiveAdvertise from './fiveAdvertise'
export default {
  name: 'SaAdvertise',
  data() {
    return {
      assemblyName: '广告图设置'
    }
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    mod() {
      switch (this.item.type) {
        case 'second':
          return mSecondAdvertise
        case 'third':
          return mThirdAdvertise
        case 'four':
          return mFourAdvertise
        case 'five':
          return mFiveAdvertise
        default:
          return mFirstAdvertise
      }
    }
  },
  components: { }
}
</script>
