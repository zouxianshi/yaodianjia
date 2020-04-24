<template>
  <m-sa-layout>
    <div slot="exhibition">
      <m-va-banner width="400px" source="sa" :item-list="searchParams.itemList" />
    </div>
    <div slot="item">
      <m-edit-item v-for="(el,i) in searchParams.itemList" :ref="`editItem_${i}`" :key="i" :sub-type="searchParams.subType" :item="el" :index="i" :is-add="isAdd(i)" :is-disabled="isDisabled(i)" @on-item="_onItem" />
    </div>
    <el-button slot="submit" type="primary" style="width: 100%" size="mini" :loading="loading" @click="onSubmit">保存广告设置</el-button>
  </m-sa-layout>
</template>
<script>
import _ from 'lodash'
import mVaBanner from '../../_source/banner'
import mEditItem from './editItem'
import mSaLayout from '../_source/saLayout'
import { itemParams } from '../../_source/default'

export default {
  name: 'SaFirstAdvertise',
  data() {
    return {
      searchParams: {
        dimensionId: '',
        id: '',
        itemList: [],
        subType: 'first',
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
          setTimeout(() => {
            this.loading = false
          }, 800)
        })
      }
    },
    isAdd(i) {
      return (this.searchParams.itemList.length - 1) === i && i < 4
    },
    isDisabled() {
      return !(this.searchParams.itemList.length > 1)
    },
    _onAdd() {
      this.searchParams.itemList.push(itemParams)
    },
    _onDel(ii) {
      this.searchParams.itemList = _.filter(this.searchParams.itemList, (v, i) => i !== ii)
    },
    _onItem(item, i) {
      this.$set(this.searchParams.itemList, i, item)
    }
  },
  watch: {},
  beforeCreate() {
  },
  created() {
    this.searchParams = _.cloneDeep(this.item)
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
  components: { mVaBanner, mEditItem, mSaLayout }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .sa-first-advertise {

  }
</style>
