<template>
  <div class="sap-navigation-first-model" :style="stylees">
    <el-row>
      <template v-for="(el,$index) in item.itemList">
        <el-col :key="$index" :span="6" class="snfm-item">
          <m-first-item :el="el" />
        </el-col>
      </template>
    </el-row>
  </div>
</template>
<script>
import { globalBinding } from './../../../../mixins'
import mFirstItem from './firstItem'
export default {
  name: 'SapNavigationFirst',
  data() {
    return {}
  },
  mixins: [globalBinding],
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
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
  computed: {
  },
  components: { mFirstItem }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .sap-navigation-first-model {
    overflow: hidden;
  }
</style>
