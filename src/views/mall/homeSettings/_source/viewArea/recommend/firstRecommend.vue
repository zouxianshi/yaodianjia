<template>
  <div v-loading="loading" class="first-recommend-model">
    <m-first-commodity :item="searchParams" />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { getRecommendedFormat } from './../_source/utils'
import mFirstCommodity from '../commodity/firstCommodity.vue'
export default {
  name: 'VaFirstRecommend',
  data() {
    return {
      loading: false,
      searchParams: {
        dimensionId: '',
        id: '',
        itemList: [],
        subType: 'first',
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
  watch: {

  },
  beforeCreate() {
  },
  created() {
    this.loading = true
    this.searchParams = _.cloneDeep(this.item)
    getRecommendedFormat(this).then(itemList => {
      this.searchParams.itemList = itemList
      this.$emit('on-update', this.searchParams)
      this.loading = false
    }).catch(() => {
      this.loading = true
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
  components: { mFirstCommodity }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .first-recommend-model {
    min-height: 112px;
  }
</style>
