<template>
  <div class="sap-navigation-first-model">
    <el-row>
      <template v-if="sourceType === 'preview'">
        <template v-for="(el,$index) in item.itemList">
          <el-col :key="$index" :span="6" class="snfm-item">
            <m-first-item :el="el" :active="`navigation_${$index}` === active" :index="$index" @click.native="active && onSelect(el,$index)" />
          </el-col>
        </template>
        <el-col v-if="active && item.itemList.length < 8" :span="6">
          <m-item-create-entry @click.native="onCreate" />
        </el-col>
      </template>
      <template v-if="sourceType === 'set'">
        <v-draggable v-model="item.itemList" draggable=".snfm-item" v-bind="dragOptions" @end="onEnd">
          <el-col v-for="(el,$index) in item.itemList" :key="$index" :span="6" class="snfm-item">
            <m-first-item :el="el" :active="`navigation_${$index}` === active" :index="$index" @click.native="active && onSelect(el,$index)" />
          </el-col>
        </v-draggable>
        <el-col v-if="active && item.itemList.length < 8" :span="6">
          <m-item-create-entry @click.native="onCreate" />
        </el-col>
      </template>
    </el-row>
  </div>
</template>
<script>
import vDraggable from 'vuedraggable'
import mFirstItem from './firstItem'
import mItemCreateEntry from './itemCreateEntry'

export default {
  name: 'SapNavigationFirst',
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
    },
    sourceType: {
      type: String,
      default: 'preview'
    }
  },
  methods: {
    onEnd() {
      this.$emit('on-drag')
    },
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
    dragOptions() {
      return {
        animation: 150,
        disabled: false,
        ghostClass: 'ghost',
        group: {
          put: false,
          name: 'shared',
          pull: 'clone'
        }
      }
    }
  },
  components: { mFirstItem, mItemCreateEntry, vDraggable }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .sap-navigation-first-model {
    overflow: hidden;
  }
</style>
