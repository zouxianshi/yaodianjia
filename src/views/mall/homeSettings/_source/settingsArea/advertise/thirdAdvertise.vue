<template>
  <div class="sa-third-advertise">
    <el-card class="box-card" shadow="always">
      <div class="sta-exhibition">
        <m-third-advertise source="sa" />
      </div>
    </el-card>
    <div class="sta-list-box">
      <m-edit-item />
    </div>
    <div class="sta-submit">
      <el-button type="primary" style="width: 100%" size="mini">保存广告设置2</el-button>
    </div>
  </div>
</template>
<script>
import mEditItem from './editItem'
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
  components: { mThirdAdvertise, mEditItem }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .sa-third-advertise {
    .sta-exhibition {
      width: 420px;
      margin: 0 auto;
    }
    .sta-list-box {
      margin-top: 10px;
    }
  }
</style>
