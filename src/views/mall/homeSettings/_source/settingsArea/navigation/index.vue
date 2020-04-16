<template>
  <div class="sa-navigation-model">
    <el-tabs :value="assemblyName" type="card">
      <el-tab-pane :label="assemblyName" :name="assemblyName">
        <component :is="mod" :item="item" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
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
  computed: {
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
