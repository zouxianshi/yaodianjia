<template>
  <div class="sap-navigation-second-model">
    <el-row>
      <template v-if="sourceType === 'preview'">
        <el-col v-for="(el,$index) in item.itemList" :key="$index" :span="7" class="snsm-item">
          <m-first-item :el="el" :active="`navigation_${$index}` === active" @click.native="active && onSelect(el,$index)" />
        </el-col>
      </template>
      <template v-if="sourceType === 'set'">
        <v-draggable v-model="item.itemList" draggable=".snsm-item" v-bind="dragOptions" @end="onEnd">
          <el-col v-for="(el,$index) in item.itemList" :key="$index" :span="7" class="snsm-item">
            <m-first-item :el="el" :active="`navigation_${$index}` === active" @click.native="active && onSelect(el,$index)" />
          </el-col>
        </v-draggable>
      </template>
      <el-col v-if="active && item.itemList.length < 10" :span="7">
        <m-item-create-entry @click.native="onCreate" />
      </el-col>
    </el-row>
  </div>
</template>
<script>
import vDraggable from 'vuedraggable'
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
  .sap-navigation-second-model {
    overflow: hidden;
    .el-row {
      .el-col-7 {
        width: 20%;
      }
    }
  }
</style>
