<template>
  <m-sa-layout>
    <m-four-advertise slot="exhibition" source="sa" />
    <div slot="item">
      <m-edit-item />
    </div>
    <el-button slot="submit" type="primary" style="width: 100%" size="mini">保存广告设置4</el-button>
  </m-sa-layout>
</template>
<script>
import mEditItem from './editItem'
import mSaLayout from '../_source/saLayout'
import mFourAdvertise from '../../viewArea/advertise/fourAdvertise'
export default {
  name: 'SaFourAdvertise',
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
  components: { mEditItem, mFourAdvertise, mSaLayout }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .sa-four-advertise {
  }
</style>
