<template>
  <div class="sa-navigation-model">
    <el-tabs :value="assemblyName" type="card">
      <el-tab-pane :label="assemblyName" :name="assemblyName">
        <m-navigation :item="item" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import mNavigation from './navigation'
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
  components: { mNavigation }
}
</script>
