<template>
  <div class="second-navigation-model">
    <v-draggable v-model="dragList" draggable=".snm-item" v-bind="dragOptions" @end="onEnd">
      <div v-for="(el,i) in dragList" :key="i" class="snm-item">
        <m-second-item :item="el" />
      </div>
    </v-draggable>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
import vDraggable from 'vuedraggable'
import mSecondItem from './secondItem'
export default {
  name: 'VaSecondNavigation',
  data() {
    return {
      dragList: []
    }
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    ...mapMutations('mall', ['setItemDragData']),
    onEnd() {
      const { item: { $index }, dragList } = this
      this.setItemDragData({
        $index,
        itemList: dragList
      })
    }
  },
  watch: {},
  beforeCreate() {
  },
  created() {
    this.dragList = this.item.itemList
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
        sort: true,
        animation: 150,
        disabled: false,
        group: {
          put: false,
          name: 'group-second',
          pull: 'clone'
        }
      }
    }
  },
  components: { mSecondItem, vDraggable }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .second-navigation-model {
    overflow: hidden;
    .snm-item {
      float: left;
      cursor: move;
      margin: 0 14px;
      &:nth-child(1),&:nth-child(6) {
        padding-left: 3px;
      }
    }
  }
</style>
