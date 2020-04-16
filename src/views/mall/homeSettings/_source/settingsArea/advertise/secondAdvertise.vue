<template>
  <div class="sa-second-advertise">
    <el-card class="box-card" shadow="always">
      <div class="ssa-exhibition">
        <m-second-advertise source="sa" />
      </div>
    </el-card>
    <div class="ssa-list-box">
      <m-edit-item />
    </div>
    <div class="ssa-submit">
      <el-button type="primary" style="width: 100%" size="mini">保存广告设置2</el-button>
    </div>
  </div>
</template>
<script>

import mEditItem from './editItem'
import mSecondAdvertise from '../../viewArea/advertise/secondAdvertise'
export default {
  name: 'SaSecondAdvertise',
  data() {
    return {}
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
  computed: {},
  components: { mEditItem, mSecondAdvertise }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .sa-second-advertise {
    .ssa-exhibition {
      width: 420px;
      margin: 0 auto;
    }
    .ssa-list-box {
      margin-top: 10px;
    }
  }
</style>
