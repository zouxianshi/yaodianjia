<template>
  <m-sa-layout>
    <m-third-advertise slot="exhibition" source="sa" />
    <div slot="item">
      <m-edit-item />
    </div>
    <el-button slot="submit" type="primary" style="width: 100%" size="mini">保存广告设置2</el-button>
  </m-sa-layout>
</template>
<script>
import mEditItem from './editItem'
import mSaLayout from '../_source/saLayout'
import mThirdAdvertise from '../../viewArea/advertise/thirdAdvertise'
export default {
  name: 'SaThirdAdvertise',
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
  components: { mThirdAdvertise, mEditItem, mSaLayout }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .sa-third-advertise {
  }
</style>
