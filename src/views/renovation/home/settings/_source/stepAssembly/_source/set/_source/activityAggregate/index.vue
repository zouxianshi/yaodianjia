<template>
  <m-item-card title="活动组件选择" @on-ass-submit="onAssSubmit">
    <div class="aga-model">
      <el-row :gutter="20">
        <el-col v-for="(item,$index) in agaList" :key="$index" :span="12">
          <m-aga-item :item="item" />
        </el-col>
      </el-row>
    </div>
  </m-item-card>

</template>
<script>
import mItemCard from './../itemCard'
import mAgaItem from './_source/agaItem'

const agaList = [
  {
    type: 'together',
    name: '拼团'
  },
  {
    type: 'markup',
    name: '加价购'
  },
  {
    type: 'spike',
    name: '秒杀'
  },
  {
    type: 'special',
    name: '特惠'
  },
  {
    type: 'fullReduction',
    name: '满减'
  }
]

export default {
  name: 'Aga',
  data() {
    return {
      agaList
    }
  },
  props: {},
  methods: {
    onAssSubmit() {}
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
  computed: {},
  components: { mItemCard, mAgaItem }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .aga-model {

  }
</style>
