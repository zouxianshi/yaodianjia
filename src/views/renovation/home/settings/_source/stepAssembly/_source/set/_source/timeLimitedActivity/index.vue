<template>
  <div class="set-tla-model">
    <div class="set-view-ass" style="width: 340px">
      <component :is="mod" :item="itemParams" @on-select="onSelect" @on-create="onCreate" />
    </div>
    <div class="snm-view">
      <m-item-card title="限时活动设置" @on-ass-submit="onAssSubmit" @on-ass-delete="onAssDelete">
        <el-divider content-position="left">活动选择</el-divider>
        <el-button size="mini" style="margin-bottom: 20px;">选择活动</el-button>
        <el-form label-width="80px" size="mini">
          <el-form-item label="活动名称">
            双11秒杀活动
          </el-form-item>
          <el-form-item label="活动类型">
            限时秒杀
          </el-form-item>
          <el-form-item label="活动状态">
            未开始
          </el-form-item>
          <el-form-item label="活动时间">
            2020.05.12 00:00:00 - 2020.06.12 00:00:00
          </el-form-item>
        </el-form>
        <el-divider content-position="left">商品选择</el-divider>
        <el-radio-group v-model="radio">
          <el-radio :label="1">自动展示</el-radio>
          <el-radio :label="2">手动选择</el-radio>
        </el-radio-group>
        <div style="margin-top: 20px;">
          <m-form-item />
        </div>
      </m-item-card>
    </div>
  </div>
</template>
<script>
import { itemParams } from './../../../../default'
import mFirst from './../../../preview/_source/timeLimitedActivity/first'
import mSecond from './../../../preview/_source/timeLimitedActivity/second'
import mThird from './../../../preview/_source/timeLimitedActivity/third'
import mItemCard from './../itemCard'
import mFormItem from './../commodity/_source/formItem'

export default {
  name: 'SetTla',
  data() {
    return {
      selectIndex: 0,
      itemParams: {},
      name: '',
      radio: 1
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
  .set-tla-model {
    .set-view-ass {
      .commodity-second-item-model,.sap-tla-first-model {
        border: 1px solid #F0F0F0;
        box-sizing: border-box
      }
    }
  }
</style>
