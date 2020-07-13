<template>
  <m-item-card title="活动组件选择" @on-ass-submit="onAssSubmit">
    <div class="aga-model">
      <el-row :gutter="20">
        <el-col v-for="(item,$index) in itemList" :key="$index" :span="12">
          <m-aga-item :item="item" />
        </el-col>
      </el-row>
    </div>
  </m-item-card>

</template>
<script>
import { mapState, mapMutations } from 'vuex'
import { saveDragItem } from './../../../../default'
import mItemCard from './../itemCard'
import mAgaItem from './_source/agaItem'

export default {
  name: 'Aga',
  data() {
    return {
      itemList: [],
      itemParams: {}
    }
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    ...mapMutations('renovation', ['setAgaSelectList']),
    onAssSubmit() {
      if (!_.some(this.itemList, { 'selected': true })) {
        this.$message.error('最少选择一个活动组件')
        return
      }
      this.setAgaSelectList(_.cloneDeep(this.itemList))
      this.itemParams.value = _.join(_.map(_.reject(this.itemList, ['selected', false]), v => v.id), ',')
      this.itemParams.error = false
      saveDragItem(this.$root, this.itemParams)
      this.$message.success('设置成功')
    }
  },
  watch: {},
  beforeCreate() {
  },
  created() {
    this.itemParams = _.cloneDeep(this.item)
    this.itemList = this.itemParams.selectList
    console.log(this.itemList)
    console.log('------athis.itemList')
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
    ...mapState('renovation', ['agaSelectList'])
  },
  components: { mItemCard, mAgaItem }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .aga-model {

  }
</style>
