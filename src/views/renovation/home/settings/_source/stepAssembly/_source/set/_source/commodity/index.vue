<template>
  <div class="set-commodity-model">
    <div class="set-view-ass" style="width: 340px">
      <component :is="mod" :item="itemParams" />
    </div>
    <div class="snm-view">
      <m-item-card title="商品选择" @on-ass-submit="onAssSubmit">
        <m-form-item :item="itemParams" @on-el-delete="onElDelete" @on-update="onUpdate" />
        <div v-if="error.isGoods" class="sa-assembly-error">
          {{ error.isGoods }}
        </div>
      </m-item-card>
    </div>
  </div>
</template>
<script>
import { saveDragItem } from './../../../../default'
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
      itemParams: {},
      error: {
        isGoods: false
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
    onAssSubmit() {
      const { itemList } = this.itemParams
      let flag = true
      if (!itemList.length) {
        this.error.isGoods = '请选择商品'
        flag = false
      }

      if (flag) {
        saveDragItem(this.$root, this.itemParams)
      }
    },
    onUpdate(itemList) {
      this.itemParams.itemList = itemList
      this.error.isGoods = false
    },
    onElDelete(index) {
      this.itemParams.itemList = _.filter(this.itemParams.itemList, (v, i) => i !== index)
    }
  },
  watch: {},
  beforeCreate() {
  },
  created() {
    this.itemParams = _.cloneDeep(this.item)
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
      .commodity-second-item-model,
      .commodity-third-item-model,
      .commodity-four-item-model {
        border: 1px solid #F0F0F0;
        box-sizing: border-box;
      }
      .commodity-first-item-model {
        border: 1px solid #F0F0F0;
        box-sizing: content-box;
      }
    }
  }
</style>
