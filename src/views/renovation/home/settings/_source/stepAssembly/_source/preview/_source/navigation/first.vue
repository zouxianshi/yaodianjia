<template>
  <div class="sap-navigation-first-model" :style="stylees">
    <el-row>
      <template v-for="(el,$index) in item.itemList">
        <el-col :key="$index" :span="6" class="snfm-item">
          <m-first-item :el="el" :active="`navigation_${$index}` === active" @click.native="active && onSelect(el,$index)" />
        </el-col>
      </template>
      <el-col v-if="active && item.itemList.length < 8" :span="6">
        <m-item-create-entry @click.native="onCreate" />
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { globalBinding } from './../../../../mixins'
import mFirstItem from './firstItem'
import mItemCreateEntry from './itemCreateEntry'

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
  .sap-navigation-first-model {
    overflow: hidden;
  }
</style>
