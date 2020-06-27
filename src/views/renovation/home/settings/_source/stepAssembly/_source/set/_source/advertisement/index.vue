<template>
  <div class="set-advertisement-model">
    <div class="set-view-ass" style="width: 340px">
      <component :is="mod" :item="itemParams" :active="`advertisement_${selectIndex}`" @on-select="onSelect" @on-create="onCreate" />
    </div>
    <div class="snm-view">
      <!--多条循环-->
      <template v-if="itemParams.subType === 'five'">
        <template v-for="(item,$index) in 5">
          <m-item-card :key="$index" title="导航1" :is-submit="$index === 4" :is-delete="true" @on-ass-submit="onAssSubmit" @on-ass-delete="onAssDelete">
            <m-Form-item />
          </m-item-card>
        </template>
      </template>

      <!--单条切换-->
      <template v-else>
        <m-item-card title="导航1" @on-ass-submit="onAssSubmit" @on-ass-delete="onAssDelete">
          <m-Form-item />
        </m-item-card>
      </template>
    </div>
  </div>
</template>
<script>
import { itemParams } from './../../../../default'
import mFirst from './../../../preview/_source/advertisement/first'
import mSecond from './../../../preview/_source/advertisement/second'
import mThird from './../../../preview/_source/advertisement/third'
import mFour from './../../../preview/_source/advertisement/four'
import mFive from './../../../preview/_source/advertisement/five'
import mItemCard from './../itemCard'
import mFormItem from './_source/formItem'

export default {
  name: 'SetAdvertisement',
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
        case 'five':
          return mFive
      }
    }
  },
  components: { mItemCard, mFormItem }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .set-advertisement-model {
  }
</style>
