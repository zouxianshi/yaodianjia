<template>
  <div class="sa-advertise-model ">
    <el-tabs :value="assemblyName" type="card">
      <el-tab-pane :label="assemblyName" :name="assemblyName">
        <component :is="mod" :item="item" class="sam-width" @on-update="_onUpdate" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>

import { mapState, mapActions } from 'vuex'
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
  methods: {
    ...mapActions('mall', ['saveAssembly']),
    _onUpdate(searchParams, fn) {
      const { item: { uuid }, dragGlobal: { id }} = this
      this.saveAssembly({ searchParams: { ...searchParams, dimensionId: id }, uuid }).then(() => {
        this.$message.success('组件保存成功')
        fn()
      }).catch(() => {
        fn()
      })
    }
  },
  computed: {
    ...mapState('mall', ['dragGlobal']),
    mod() {
      switch (this.item.subType) {
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
