<template>
  <div class="second-recommend-model">
    <m-four-commodity :item="searchParams" />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { getRecommendedFormat } from './../_source/utils'
import mFourCommodity from '../commodity/fourCommodity'
export default {
  name: 'VaSecondRecommend',
  data() {
    return {
      searchParams: {
        dimensionId: '',
        id: '',
        itemList: [],
        subType: 'second',
        title: '',
        type: 'recommend'
      }
    }
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
  },
  watch: {},
  beforeCreate() {
  },
  created() {
    this.searchParams = _.cloneDeep(this.item)
    getRecommendedFormat(this).then(itemList => {
      this.searchParams.itemList = itemList
      this.$emit('on-update', this.searchParams)
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
    ...mapState('mall', ['centerStoreId', 'centerStoreName'])
  },
  components: { mFourCommodity }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .second-recommend-model {

  }
</style>
