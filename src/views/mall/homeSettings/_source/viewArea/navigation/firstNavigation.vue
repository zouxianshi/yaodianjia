<template>
  <div class="first-navigation-model">
    <v-draggable v-if="dragList.length" v-model="dragList" draggable=".fnm-item" v-bind="dragOptions" @end="onEnd">
      <div v-for="(el,i) in dragList" :key="i" class="fnm-item" @click="onEvent">
        <m-first-item :item="el" />
      </div>
    </v-draggable>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import vDraggable from 'vuedraggable'
import mFirstItem from './firstItem'

export default {
  name: 'VaFirstNavigation',
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
    ...mapActions('mall', ['saveAssembly']),
    ...mapMutations('mall', ['setItemDragData']),
    onEnd() {
      const { item: { $index, uuid }, item, dragList, dragGlobal: { id }} = this
      this.setItemDragData({ $index, itemList: dragList })
      this.saveAssembly({ searchParams: { ...item, itemList: dragList, dimensionId: id || '' }, uuid }).then(() => {
        this.$message.success('导航排序成功！')
      })
    },
    onEvent() {
    }
  },
  watch: {

  },
  beforeCreate() {
  },
  created() {
    this.dragList = _.cloneDeep(this.item.itemList)
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
    ...mapState('mall', ['dragGlobal']),
    dragOptions() {
      return {
        sort: true,
        animation: 150,
        disabled: false,
        group: {
          put: false,
          name: 'group-first',
          pull: 'clone'
        }
      }
    }
  },
  components: { mFirstItem, vDraggable }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .first-navigation-model {
    overflow: hidden;
    .fnm-item {
      margin: 0 15px;
      float: left;
      cursor: move;
      &:nth-child(1),&:nth-child(5) {
        padding-left: 5px;
      }
    }
  }
</style>
