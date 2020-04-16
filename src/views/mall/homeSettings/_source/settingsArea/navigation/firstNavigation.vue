<template>
  <m-sa-layout class="sa-first-navigation">
    <div slot="exhibition">
      <m-first-item v-for="(el,i) in 8" :key="i" />
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
import mFirstItem from '../../viewArea/navigation/firstItem'
export default {
  name: 'SaFirstNavigation',
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
  components: { mSaLayout, mEditItem, mFirstItem }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .sa-first-navigation {
    overflow: hidden;
    .n-first-item-model {
      float: left;
    }
  }
</style>
