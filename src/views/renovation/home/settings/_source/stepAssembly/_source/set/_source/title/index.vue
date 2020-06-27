<template>
  <div class="set-title-model">
    <div class="set-view-ass" style="width: 340px">
      <component :is="mod" :item="itemParams" @on-select="onSelect" @on-create="onCreate" />
    </div>
    <div class="snm-view">
      <m-item-card title="商品选择" @on-ass-submit="onAssSubmit" @on-ass-delete="onAssDelete">
        <el-form label-width="80px" size="mini">
          <el-form-item label="标题名称">
            <el-input v-model="name" />
          </el-form-item>
        </el-form>
      </m-item-card>
    </div>
  </div>
</template>
<script>
import { itemParams } from './../../../../default'
import mFirst from './../../../preview/_source/title/first'
import mSecond from './../../../preview/_source/title/second'
import mThird from './../../../preview/_source/title/third'
import mFour from './../../../preview/_source/title/four'
import mFive from './../../../preview/_source/title/five'
import mSix from './../../../preview/_source/title/six'
import mSeven from './../../../preview/_source/title/seven'
import mItemCard from './../itemCard'

export default {
  name: 'SetTitle',
  data() {
    return {
      selectIndex: 0,
      itemParams: {},
      name: ''
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
        case 'five':
          return mFive
        case 'six':
          return mSix
        case 'seven':
          return mSeven
      }
    }
  },
  components: { mItemCard }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .set-title-model {
    .set-view-ass {
      .tim-title-bg {
        width: 352px;
        height: 36px;
        line-height: 33px;
        overflow: hidden;
        .tim-text {
          display: block;
          text-align: center;
          font-size: 14px;
        }
      }
    }
  }
</style>
