<template>
  <div class="set-commodity-model">
    <div class="set-view-ass" style="width: 340px">
      <component :is="mod" :item="itemParams" @on-select="onSelect" @on-create="onCreate" />
    </div>
    <div class="snm-view">
      <m-item-card title="商品选择" @on-ass-submit="onAssSubmit" @on-ass-delete="onAssDelete">
        <m-form-item />
      </m-item-card>
    </div>
  </div>
</template>
<script>
import { itemParams } from './../../../../default'
import mFirst from './../../../preview/_source/commodity/first'
import mSecond from './../../../preview/_source/commodity/second'
import mThird from './../../../preview/_source/commodity/third'
import mFour from './../../../preview/_source/commodity/four'
import mItemCard from './../itemCard'
import mFormItem from './_source/formItem'

export default {
  name: 'SetCommodity',
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
      console.log(i)
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
        case 'third':
          return mThird
        case 'four':
          return mFour
      }
    }
  },
  components: { mItemCard, mFormItem }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .set-commodity-model {
    .set-view-ass {
      .commodity-first-item-model,
      .commodity-second-item-model,
      .commodity-third-item-model,
      .commodity-four-item-model {
        border: 1px solid #F0F0F0;
        box-sizing: border-box
      }
    }
  }
</style>
