<template>
  <m-sa-layout>
    <div slot="exhibition">
      <m-four-advertise :item="searchParams" source="sa" />
    </div>
    <div slot="item">
      <m-edit-item v-for="(el,i) in searchParams.itemList" :ref="`editItem_${i}`" :key="i" :type="searchParams.type" :item="el" :index="i" @on-item="_onItem" />
    </div>
    <el-button slot="submit" type="primary" style="width: 100%" size="mini" :loading="loading" @click="onSubmit">保存广告设置</el-button>
  </m-sa-layout>
</template>
<script>
import mEditItem from './editItem'
import mSaLayout from '../_source/saLayout'
import mFourAdvertise from '../../viewArea/advertise/fourAdvertise'
export default {
  name: 'SaFourAdvertise',
  data() {
    return {
      searchParams: {
        dimensionId: '',
        id: '',
        itemList: '',
        subType: 'four',
        title: '',
        type: 'advertise'
      },
      loading: false
    }
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    onSubmit() {
      const { itemList } = this.searchParams
      const list = []
      _.map(itemList, (v, i) => {
        const refs = this.$refs[`editItem_${i}`][0].$verification()
        if (typeof refs === 'object') {
          list.push(refs)
        }
      })
      if (itemList.length === list.length) {
        this.searchParams.itemList = list
        this.loading = true
        this.$emit('on-update', _.cloneDeep(this.searchParams), () => {
          this.loading = false
        })
      }
    },
    _onItem(item, i) {
      this.$set(this.searchParams.itemList, i, item)
    }
  },
  watch: {},
  beforeCreate() {
  },
  created() {
    this.searchParams.itemList = _.cloneDeep(this.item.itemList)
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
  components: { mEditItem, mFourAdvertise, mSaLayout }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .sa-four-advertise {
  }
</style>
