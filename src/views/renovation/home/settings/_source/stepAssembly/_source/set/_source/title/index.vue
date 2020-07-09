<template>
  <div class="set-title-model">
    <div class="set-view-ass" style="width: 340px">
      <component :is="mod" :item="itemParams" />
    </div>
    <div class="snm-view">
      <m-item-card title="商品选择" @on-ass-submit="onAssSubmit">
        <el-form label-width="90px" size="mini">
          <el-form-item label="标题名称" :rules="[{ required: true}]">
            <el-input v-model="el.name" maxlength="6" />
            <div v-if="error.isName" class="sa-assembly-error">{{ error.isName }}</div>
          </el-form-item>
        </el-form>
      </m-item-card>
    </div>
  </div>
</template>
<script>
import { saveDragItem } from './../../../../default'
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
      itemParams: {},
      el: {},
      error: {
        isName: false
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
    $verification() {
      const { name } = this.el
      let flag = true

      this.reset()

      if (!name) {
        this.error.isName = '请输入标题名称'
        flag = false
      }
      return flag
    },
    reset() {
      this.error = _.assign(this.error, {
        isName: false
      })
    },
    onAssSubmit() {
      if (this.$verification()) {
        // todo 提交
        saveDragItem(this.$root, this.itemParams)
      }
    }
  },
  watch: {},
  beforeCreate() {
  },
  created() {
    this.itemParams = _.cloneDeep(this.item)
    this.el = this.itemParams.itemList[0]
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
