<template>
  <div class="set-search-hint-model">
    <div class="snm-view">
      <m-item-card title="搜索关键字设置" @on-ass-submit="onAssSubmit">
        <el-input v-model="searchHint" placeholder="请输入搜索关键字" />
      </m-item-card>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import mItemCard from './../itemCard'
export default {
  name: 'SetSearchHint',
  data() {
    return {
      searchHint: ''
    }
  },
  props: {},
  methods: {
    ...mapMutations('renovation', ['setBasics']),
    onAssSubmit() {
      this.setBasics({
        searchHint: this.searchHint
      })
    }
  },
  watch: {},
  beforeCreate() {
  },
  created() {
    this.searchHint = _.cloneDeep(this.basics.searchHint)
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
    ...mapState('renovation', ['basics'])
  },
  components: { mItemCard }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .set-search-hint-model {

  }
</style>
