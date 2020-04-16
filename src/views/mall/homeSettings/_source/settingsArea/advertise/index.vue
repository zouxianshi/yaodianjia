<template>
  <div class="sa-advertise-model">
    <el-tabs :value="assemblyName" type="card">
      <el-tab-pane :label="assemblyName" :name="assemblyName">
        <m-advertise :item="{...item,type:'second'}" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import mAdvertise from './advertise'
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
  components: { mAdvertise }
}
</script>
