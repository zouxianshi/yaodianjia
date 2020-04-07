<template>
  <div class="menu-settings-model">
    <div class="msm-list">
      <m-level1-menu v-for="(item,$index) in menuData" :key="$index" :level1-index="$index" :item="item" />
    </div>
    <div class="msm-box">
      <el-button type="primary" style="width: 100%;" size="mini"> + 新增一级菜单</el-button>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import mLevel1Menu from './level1Menu'
export default {
  name: 'MenuSettings',
  components: { mLevel1Menu },
  props: {},
  data() {
    return {}
  },
  computed: {
    ...mapState('channel', ['menuData'])
  },
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
  methods: {}
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .menu-settings-model {
    .msm-box {
      padding-top: 20px;
    }
  }
</style>
