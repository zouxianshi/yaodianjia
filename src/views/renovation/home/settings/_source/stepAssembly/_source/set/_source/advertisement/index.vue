<template>
  <div class="set-advertisement-model">
    <div class="set-view-ass" style="width: 340px">
      <component :is="mod" :item="itemParams" :active="`advertisement_${selectIndex}`" @on-select="onSelect" @on-create="onCreate" />
    </div>
    <div class="snm-view">
      <!--多条循环-->
      <template v-if="itemParams.subType === 'five'">
        <template v-for="(eel,$index) in itemParams.itemList">
          <m-item-card :key="$index" title="导航1" :is-submit="$index === 4" :is-delete="true" @on-ass-submit="onAssSubmit" @on-ass-delete="onAssDelete">
            <m-form-item ref="formItem" :el="eel" @on-el-update="onElUpdate" />
          </m-item-card>
        </template>
      </template>

      <!--单条切换-->
      <template v-else>
        <m-item-card title="广告图" @on-ass-submit="onAssSubmit" @on-ass-delete="onAssDelete">
          <m-form-item v-if="isItem" ref="formItem" :el="el" @on-el-update="onElUpdate" />
        </m-item-card>
      </template>
    </div>
  </div>
</template>
<script>
import { itemParams, saveDragItem } from './../../../../default'
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
      itemParams: {},
      el: {},
      isItem: true
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
      return new Promise((resolve, reject) => {
        this.isItem = false
        this.selectIndex = i
        this.el = this.itemParams.itemList[this.selectIndex]
        setTimeout(() => {
          this.isItem = true
          resolve()
        })
      })
    },
    onCreate() {
      this.itemParams.itemList.push(_.cloneDeep(itemParams))
      this.onSelect({ el: {}, i: _.size(this.itemParams.itemList) - 1 })
    },
    onAssSubmit() {
      let index = null
      _.forEach(this.itemParams.itemList, (v, i) => {
        if (_.isEmpty(v.img) || _.isEmpty(v.url)) {
          index = i
          return false
        }
      })

      if (index !== null) {
        this.onSelect({ el: {}, i: index }).then(() => {
          this.$refs.formItem.$verification()
        })
      } else {
        // todo 提交
        saveDragItem(this.$root, this.itemParams)
      }
    },
    onAssDelete() {
      this.itemParams.itemList = _.filter(this.itemParams.itemList, (v, i) => i !== this.selectIndex)
      this.onSelect({ el: {}, i: _.size(this.itemParams.itemList) - 1 })
    },
    onElUpdate(item) {
      this.$set(this.itemParams.itemList, this.selectIndex, item)
    }
  },
  watch: {},
  beforeCreate() {
  },
  created() {
    this.itemParams = _.cloneDeep(this.item)
    if (this.itemParams.subType !== 'five') {
      this.el = this.itemParams.itemList[this.selectIndex]
    }
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
