<template>
  <div class="index-model">
    <component :is="mod" v-if="isComponent" :item="item" />
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import mFirst from './first'

export default {
  name: 'ActivityAggregateIndex',
  data() {
    return {
      isComponent: false
    }
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    ...mapActions('renovation', ['getAgaData'])
  },
  watch: {},
  beforeCreate() {
  },
  async created() {
    this.isComponent = false
    await this.getAgaData()
    this.isComponent = true
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
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .index-model {

  }
</style>
