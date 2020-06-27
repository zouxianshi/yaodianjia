<template>
  <div class="set-coupon-model">
    <div class="set-view-ass" style="width: 340px">
      <component :is="mod" :item="itemParams" :active="`advertisement_${selectIndex}`" @on-select="onSelect" @on-create="onCreate" />
    </div>
    <div class="snm-view">
      <m-item-card title="导航1" desc="单个组件最多选10张" @on-ass-submit="onAssSubmit" @on-ass-delete="onAssDelete">
        <div class="snm-btn-goods">
          <el-button size="mini">选择优惠劵</el-button>
          <span class="snm-text-1">已选：3</span>
        </div>
        <template v-for="(item,$index) in 4">
          <m-Form-item :key="$index" />
        </template>
      </m-item-card>
    </div>
  </div>
</template>
<script>
import { itemParams } from './../../../../default'
import mFirst from './../../../preview/_source/coupon/first'
import mSecond from './../../../preview/_source/coupon/second'
import mThird from './../../../preview/_source/coupon/third'
import mItemCard from './../itemCard'
import mFormItem from './_source/formItem'

export default {
  name: 'SetCoupon',
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
      }
    }
  },
  components: { mItemCard, mFormItem }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .set-coupon-model {
    .snm-view {
      .snm-btn-goods {
        margin-bottom: 20px;
        .snm-text-1 {
          font-size: 12px;
          color: #4A4A4A;
          margin-left: 20px;
        }
      }
    }
  }
</style>
