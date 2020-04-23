<template>
  <div class="sa-navigation-model">
    <el-tabs :value="assemblyName" type="card">
      <el-tab-pane :label="assemblyName" :name="assemblyName">
        <component :is="mod" :item="item" class="sam-width" @on-update="_onUpdate" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import mFirstNavigation from './firstNavigation'
import mSecondNavigation from './secondNavigation'
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
          return mSecondNavigation
        default:
          return mFirstNavigation
      }
    }
  },
  components: { }
}
</script>
