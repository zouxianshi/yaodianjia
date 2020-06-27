<template>
  <div class="set-ad-frame-model">
    <div class="set-view-ass" style="width: 340px">
      <component :is="mod" :item="itemParams" @on-select="onSelect" @on-create="onCreate" />
    </div>
    <div class="snm-view">
      <m-item-card title="广告框设置" @on-ass-submit="onAssSubmit" @on-ass-delete="onAssDelete">
        <el-divider content-position="left">标题设置</el-divider>
        <el-form label-width="90px" size="mini">
          <el-form-item label="主标题">
            <el-input v-model="name" />
          </el-form-item>
          <el-form-item label="副标题">
            <el-input v-model="name" />
          </el-form-item>
        </el-form>
        <el-divider content-position="left">商品选择</el-divider>
        <div>
          <m-form-item />
        </div>
      </m-item-card>
    </div>
  </div>
</template>
<script>
import { itemParams } from './../../../../default'
import mAdFrame from './../../../preview/_source/adFrame'
import mItemCard from './../itemCard'
import mFormItem from './../commodity/_source/formItem'

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
          return mAdFrame
      }
    }
  },
  components: { mItemCard, mFormItem }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .set-ad-frame-model {
    .set-view-ass {

    }
  }
</style>
