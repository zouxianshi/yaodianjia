<template>
  <div class="set-navigation-model">
    <div class="set-view-ass">
      <component :is="mod" :item="itemParams" :active="`navigation_${selectIndex}`" @on-select="onSelect" @on-create="onCreate" />
    </div>
    <div class="snm-view">
      <m-item-card title="导航1" :is-delete="itemParams.itemList.length > (itemParams.subType === 'first' ? 4 : 5)" @on-ass-submit="onAssSubmit" @on-ass-delete="onAssDelete">
        <m-form-item :item="itemParams" />
      </m-item-card>
    </div>
  </div>
</template>
<script>
import { itemParams } from './../../../../default'
import mFirst from './../../../preview/_source/navigation/first'
import mSecond from './../../../preview/_source/navigation/second'
import mItemCard from './../itemCard'
import mFormItem from './_source/formItem'

export default {
  name: 'SetNavigation',
  data() {
    return {
      selectIndex: 0,
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
    onSelect({ el, i }) {
      this.selectIndex = i
    },
    onCreate() {
      this.itemParams.itemList.push(_.cloneDeep(itemParams))
      this.selectIndex = this.itemParams.itemList.length - 1
    },
    onAssSubmit() {},
    onAssDelete() {
      this.itemParams.itemList = _.filter(this.itemParams.itemList, (v, i) => i !== this.selectIndex)
      this.selectIndex = 0
    }
  },
  watch: {},
  beforeCreate() {
  },
  created() {
    this.itemParams = _.cloneDeep(this.item)
    console.log(this.itemParams)
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
    mod() {
      switch (this.item.subType) {
        case 'first':
          return mFirst
        case 'second':
          return mSecond
      }
    }
  },
  components: { mItemCard, mFormItem }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .set-navigation-model {
  }
</style>
