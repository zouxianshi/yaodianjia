<template>
  <div class="sa-title-model">
    <el-tabs :value="assemblyName" type="card">
      <el-tab-pane :label="assemblyName" :name="assemblyName">
        <m-title :item="item" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import mTitle from './title'
export default {
  name: 'SaTitle',
  data() {
    return {
      assemblyName: '标题设置'
    }
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },

  created() {
    this.assemblyName = this.item.code === 'mall-title' ? '微商城名称设置' : '标题设置'
  },
  components: { mTitle }
}
</script>
