<template>
  <m-sa-layout class="sa-second-navigation">
    <div slot="exhibition">
      <m-second-item v-for="(el,i) in searchParams.itemList" :key="i" source="sa" :item="el" :index="i" />
    </div>
    <div slot="item">
      <m-edit-item v-for="(el,i) in searchParams.itemList" :ref="`editItem_${i}`" :key="i" :item="el" :sub-type="searchParams.subType" :index="i" :is-add="isAdd(i)" :is-disabled="isDisabled(i)" @on-item="_onItem" />
    </div>
    <el-button slot="submit" type="primary" size="mini" :loading="loading" @click="onSubmit">保存导航设置</el-button>
  </m-sa-layout>
</template>
<script>
import mEditItem from './editItem'
import mSaLayout from '../_source/saLayout'
import mSecondItem from '../../viewArea/navigation/secondItem'
import { itemParams } from '../../_source/default'
export default {
  name: 'SecondNavigation',
  data() {
    return {
      searchParams: {
        dimensionId: '',
        id: '',
        itemList: '',
        subType: 'second',
        title: '',
        type: 'navigation'
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
        this.loading = true
        this.searchParams.itemList = list
        this.$emit('on-update', _.cloneDeep(this.searchParams), () => {
          this.loading = false
        })
      }
    },
    isAdd(i) {
      return (this.searchParams.itemList.length - 1) === i && i < 9
    },
    isDisabled() {
      return !(this.searchParams.itemList.length > 5)
    },
    _onAdd() {
      this.searchParams.itemList.push(itemParams)
    },
    _onDel(index) {
      this.searchParams.itemList = _.filter(this.searchParams.itemList, (v, i) => i !== index)
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
  components: { mSaLayout, mEditItem, mSecondItem }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .sa-second-navigation {
    overflow: hidden;
    .n-second-item-model {
      margin: 0 14px;
      padding-bottom: 20px;
      float: left;
    }
  }
</style>
