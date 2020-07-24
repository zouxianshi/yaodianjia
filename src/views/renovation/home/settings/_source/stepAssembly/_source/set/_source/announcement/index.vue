<template>
  <div class="set-announcement-model">
    <div class="set-view-ass" style="width: 340px">
      <component :is="mod" :item="itemParams" @on-create="onCreate" />
    </div>
    <div class="snm-choose">
      <el-radio-group v-model="itemParams.chooseFlag" @change="onChooseFlag">
        <el-radio :label="0" style="margin-right: 80px">横向滚动</el-radio>
        <el-radio :label="1">纵向滚动</el-radio>
      </el-radio-group>
    </div>
    <div class="snm-view">
      <template v-for="(el,i) in itemParams.itemList">
        <m-item-card :key="i" :title="`公告${i + 1}`" :is-submit="i === itemParams.itemList.length - 1" :is-delete="(itemParams.itemList.length - 1) > 0" @on-ass-submit="onAssSubmit" @on-ass-delete="onAssDelete(i)">
          <m-form-item :ref="`formItem_${i}`" :el="el" @on-el-update="onElUpdate($event,i)" />
          <div v-if="(i === itemParams.itemList.length - 1) && itemParams.itemList.length < itemParams.max" slot="create" style="margin-top: 16px">
            <el-button size="mini" @click="onAddBanner">添加公告</el-button>
          </div>
        </m-item-card>
      </template>
    </div>
  </div>
</template>
<script>
import { itemParams, saveDragItem } from './../../../../default'
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
    onChooseFlag() {
      console.log(this.itemParams)
    },
    onAddBanner() {
      this.itemParams.itemList.push(_.cloneDeep(itemParams))
    },
    onCreate() {
      this.itemParams.itemList.push(_.cloneDeep(itemParams))
    },
    onElUpdate(el, i) {
      this.$set(this.itemParams.itemList, i, el)
    },
    onAssSubmit() {
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
    onAssDelete(index) {
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
  .set-announcement-model {
    .snm-choose {
      width: 270px;
      margin: 20px auto 0 auto;
      text-align: center;
    }
  }
</style>
