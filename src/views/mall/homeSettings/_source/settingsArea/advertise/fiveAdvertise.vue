<template>
  <m-sa-layout>
    <m-five-advertise slot="exhibition" source="sa" />
    <div slot="item">
      <m-edit-item />
    </div>
    <el-button slot="submit" type="primary" style="width: 100%" size="mini">保存广告设置5</el-button>
  </m-sa-layout>
</template>
<script>
import mEditItem from './editItem'
import mSaLayout from '../_source/saLayout'
import mFiveAdvertise from '../../viewArea/advertise/fiveAdvertise'
export default {
  name: 'SaFiveAdvertise',
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
  components: { mEditItem, mFiveAdvertise, mSaLayout }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .sa-five-advertise {

  }
</style>
