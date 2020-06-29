<template>
  <div class="announcement-index-model">
    <component :is="mod" :item="item" />
  </div>
</template>
<script>
import mFirst from './first'
import mSecond from './second'
import mThird from './third'
import mFour from './four'
export default {
  name: 'AnnouncementIndex',
  data() {
    return {}
  },
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
    mod() {
      switch (this.item.subType) {
        case 'first':
          return mFirst
        case 'second':
          return mSecond
        case 'third':
          return mThird
        case 'four':
          return mFour
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .announcement-index-model {
  }
</style>
