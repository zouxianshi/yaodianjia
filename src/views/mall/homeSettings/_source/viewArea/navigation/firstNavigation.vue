<template>
  <div class="first-navigation-model">

    <v-draggable v-model="firstItems" draggable=".fnm-item" v-bind="dragOptions" @onEnd="onEnd">
      <div v-for="(el,i) in firstItems" :key="i" class="fnm-item">
        <m-first-item :i="i" />
      </div>
    </v-draggable>
  </div>
</template>
<script>
import vDraggable from 'vuedraggable'
import mFirstItem from './firstItem'

const firstItems = [
  {
    a: 1
  },
  {
    a: 2
  },
  {
    a: 3
  },
  {
    a: 4
  },
  {
    a: 5
  },
  {
    a: 6
  },
  {
    a: 7
  },
  {
    a: 8
  }
]
export default {
  name: 'FirstNavigation',
  data() {
    return {
      firstItems
    }
  },
  props: {},
  methods: {
    onEnd(v) {
      console.log(v)
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
        sort: true,
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
  components: { mFirstItem, vDraggable }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .first-navigation-model {
    overflow: hidden;
    .fnm-item {
      float: left;
      &:nth-child(n+5){
        .first-item-model {
          margin-bottom: 0;
        }
      }
      &:nth-child(1),&:nth-child(5) {
        padding-left: 5px;
      }
    }
  }
</style>
