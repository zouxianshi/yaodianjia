<template>
  <div class="index-model">
    <component :is="mod" v-if="isComponent" :item="item" />
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
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
  created() {
    this.isComponent = false
    this.getAgaData().then(() => {
      if (_.isEmpty(this.item.value)) {
        this.$set(this.item, 'selectList', _.cloneDeep(this.agaSelectList))
        this.$set(this.item, 'value', _.join(_.map(_.reject(this.agaSelectList, ['selected', false]), v => v.id), ','))
        this.$set(this.item, 'chooseFlag', 0)
      } else {
        this.$set(this.item, 'chooseFlag', _.size(_.reject(this.item.selectList, ['selected', false])) === 5 ? 0 : 1)
      }
      this.isComponent = true
    }).catch(() => {
      this.isComponent = true
    })
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
    ...mapState('renovation', ['agaSelectList']),
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
