<template>
  <m-sa-layout class="sa-second-navigation">
    <div slot="exhibition">
      <m-second-item v-for="(el,i) in 10" :key="i" />
    </div>
    <div slot="item">
      <m-edit-item />
    </div>
    <el-button slot="submit" type="primary" style="width: 100%" size="mini">保存导航设置1</el-button>
  </m-sa-layout>
</template>
<script>
import mEditItem from './editItem'
import mSaLayout from '../_source/saLayout'
import mSecondItem from '../../viewArea/navigation/secondItem'
export default {
  name: 'SecondNavigation',
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
  components: { mSaLayout, mEditItem, mSecondItem }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .sa-second-navigation {
    overflow: hidden;
    .n-second-item-model {
      float: left;
    }
  }
</style>
