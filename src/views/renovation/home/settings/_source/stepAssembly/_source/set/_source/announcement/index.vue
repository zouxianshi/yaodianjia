<template>
  <div class="set-announcement-model">
    <div class="set-view-ass" style="width: 340px">
      <component :is="mod" :item="itemParams" :active="`announcement_${selectIndex}`" @on-select="onSelect" @on-create="onCreate" />
    </div>
    <div class="snm-view">
      <template v-for="(item,$index) in 5">
        <m-item-card :key="$index" title="导航1" :is-submit="$index === 4" :is-delete="true" @on-ass-submit="onAssSubmit" @on-ass-delete="onAssDelete">
          <m-Form-item />
          <div v-if="$index === 4" slot="create" style="margin-top: 16px">
            <el-button size="mini">添加公告</el-button>
          </div>
        </m-item-card>
      </template>
    </div>
  </div>
</template>
<script>
import { itemParams } from './../../../../default'
import mFirst from './../../../preview/_source/announcement/first'
import mSecond from './../../../preview/_source/announcement/second'
import mThird from './../../../preview/_source/announcement/third'
import mFour from './../../../preview/_source/announcement/four'
import mItemCard from './../itemCard'
import mFormItem from './_source/formItem'

export default {
  name: 'SetAnnouncement',
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
  .set-announcement-model {
  }
</style>
