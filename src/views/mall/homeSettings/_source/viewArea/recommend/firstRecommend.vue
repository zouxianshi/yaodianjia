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
    $_onUpdate(item) {
      this.searchParams = _.cloneDeep(item)
      this.getData().then(() => {
        this.$emit('on-update', this.searchParams)
      })
    },
    getData() {
      return new Promise((resolve, reject) => {
        this.loading = true
        getRecommendedFormat(this).then(itemList => {
          this.searchParams.itemList = itemList
          resolve()
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      })
    }
  },
  watch: {

  },
  beforeCreate() {
  },
  created() {
    this.searchParams = _.cloneDeep(this.item)
    this.getData()
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
