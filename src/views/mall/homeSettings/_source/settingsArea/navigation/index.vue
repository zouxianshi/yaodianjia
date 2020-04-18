<template>
  <div class="sa-navigation-model">
    <el-tabs :value="assemblyName" type="card">
      <el-tab-pane :label="assemblyName" :name="assemblyName">
        <component :is="mod" :item="item" @on-update="_onUpdate" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import mFirstNavigation from './firstNavigation'
import mSecondNavigation from './secondNavigation'
import { saveAssembly } from '@/api/mallService'
export default {
  name: 'SaNavigation',
  data() {
    return {
      assemblyName: '导航栏设置'
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
      }).catch((e) => {
        fn()
      })
    }
  },
  computed: {
    ...mapState('mall', ['dragData']),
    mod() {
      switch (this.item.type) {
        case 'second':
          return mSecondNavigation
        default:
          return mFirstNavigation
      }
    }
  },
  components: { }
}
</script>
