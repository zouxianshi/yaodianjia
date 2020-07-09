<template>
  <div class="set-advertisement-model">
    <div class="set-view-ass" style="width: 340px">
      <component :is="mod" :item="itemParams" :active="`advertisement_${selectIndex}`" @on-select="onSelect" @on-create="onCreate" />
    </div>
    <div class="snm-view">
      <!--多条循环-->
      <template v-if="itemParams.subType === 'five'">
        <template v-for="(eel,i) in itemParams.itemList">
          <m-item-card :key="i" :title="eel.name ? eel.name : `轮播图${i + 1}`" :is-submit="i === itemParams.itemList.length - 1" :is-delete="(itemParams.itemList.length - 1) > 0" @on-ass-submit="onManyAssSubmit" @on-ass-delete="onManyAssDelete">
            <m-form-item :ref="`formItem_${i}`" :el="eel" :ips="{type:itemParams.type,subType:itemParams.subType,index:i}" @on-el-update="onElUpdate($event,i)" />
            <div v-if="(i === itemParams.itemList.length - 1) && itemParams.itemList.length < itemParams.max" slot="create" style="margin-top: 16px">
              <el-button size="mini" @click="onAddBanner">添加轮播图</el-button>
            </div>
          </m-item-card>
        </template>
      </template>

      <!--单条切换-->
      <template v-else>
        <m-item-card title="广告图" @on-ass-submit="onAssSubmit">
          <m-form-item v-if="isItem" ref="formItem" :el="el" :ips="{type:itemParams.type,subType:itemParams.subType,index:selectIndex}" @on-el-update="onElUpdate" />
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
    onAddBanner() {
      this.itemParams.itemList.push(_.cloneDeep(itemParams))
    },
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
    onManyAssSubmit() {
      let flag = true
      _.forEach(this.itemParams.itemList, (v, i) => {
        const formItem = this.$refs[`formItem_${i}`][0].$verification()
        if (!formItem) {
          flag = false
        }
      })
      if (flag) {
        // todo 提交
        saveDragItem(this.$root, this.itemParams)
      }
    },
    onAssSubmit() {
      let index = null
      _.forEach(this.itemParams.itemList, (v, i) => {
        if (_.isEmpty(v.img)) {
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
    onManyAssDelete() {
      this.itemParams.itemList = _.filter(this.itemParams.itemList, (v, i) => i !== this.selectIndex)
      this.onSelect({ el: {}, i: _.size(this.itemParams.itemList) - 1 })
    },
    onElUpdate(el, i = this.selectIndex) {
      this.$set(this.itemParams.itemList, i, el)
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
