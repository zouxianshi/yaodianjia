<template>
  <div class="sap-navigation-second-model">
    <el-row>
      <template v-for="(el,$index) in item.itemList">
        <el-col :key="$index" :span="7" class="snsm-item">
          <m-first-item :el="el" :active="`navigation_${$index}` === active" @click.native="active && onSelect(el,$index)" />
        </el-col>
      </template>
      <el-col v-if="active && item.itemList.length < 10" :span="7">
        <m-item-create-entry @click.native="onCreate" />
      </el-col>
    </el-row>
  </div>
</template>
<script>
import mFirstItem from './firstItem'
import mItemCreateEntry from './itemCreateEntry'
export default {
  name: 'SapNavigationSecond',
  data() {
    return {}
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    active: {
      type: String,
      default: ''
    }
  },
  methods: {
    onSelect(el, i) {
      this.$emit('on-select', { el, i })
    },
    onCreate() {
      this.$emit('on-create')
    }
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
  computed: {
  },
  components: { mFirstItem, mItemCreateEntry }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .sap-navigation-second-model {
    overflow: hidden;
    .el-row {
      .el-col-7 {
        width: 20%;
      }
    }
  }
</style>
