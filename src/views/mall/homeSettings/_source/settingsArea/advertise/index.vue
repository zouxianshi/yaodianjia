<template>
  <div class="sa-advertise-model">
    <el-tabs :value="assemblyName" type="card">
      <el-tab-pane :label="assemblyName" :name="assemblyName">
        <component :is="mod" :item="item" @on-update="_onUpdate" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>

import { mapState, mapMutations } from 'vuex'
import mFirstAdvertise from './firstAdvertise'
import mSecondAdvertise from './secondAdvertise'
import mThirdAdvertise from './thirdAdvertise'
import mFourAdvertise from './fourAdvertise'
import mFiveAdvertise from './fiveAdvertise'
import { saveAssembly } from '@/api/mallService'

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
    ...mapMutations('mall', ['setUUidDragData']),
    _onUpdate(searchParams, fn) {
      saveAssembly(searchParams).then(res => {
        const { uuid } = this.item
        this.setUUidDragData({ uuid, ...searchParams, ...res.data })
        setTimeout(() => {
          this.$message.success('保存成功')
          fn()
        }, 1200)
      }).catch(() => {
        fn()
      })
    }
  },
  computed: {
    ...mapState('mall', ['dragData']),
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
