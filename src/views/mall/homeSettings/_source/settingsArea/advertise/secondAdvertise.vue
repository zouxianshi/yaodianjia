<template>
  <m-sa-layout>
    <m-second-advertise slot="exhibition" source="sa" />
    <div slot="item">
      <m-edit-item />
    </div>
    <el-button slot="submit" type="primary" style="width: 100%" size="mini">保存广告设置2</el-button>
  </m-sa-layout>
</template>
<script>

import mEditItem from './editItem'
import mSaLayout from '../_source/saLayout'
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
  components: { mEditItem, mSecondAdvertise, mSaLayout }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .sa-second-advertise {

  }
</style>
