<template>
  <div class="set-coupon-model">
    <div class="set-view-ass" style="width: 340px">
      <component :is="mod" :item="itemParams" />
    </div>
    <div class="snm-view">
      <m-item-card title="优惠券" desc="单个组件最多选10张" @on-ass-submit="onAssSubmit">
        <div class="snm-btn-goods">
          <el-button size="mini" @click="dialogVisible = true">选择优惠劵</el-button>
          <span class="sa-mandatory-asterisk">*</span>
          <span class="snm-text-1">已选：{{ itemParams.itemList.length }}</span>
        </div>
        <template v-for="(el,i) in itemParams.itemList">
          <m-form-item :key="i" :ref="`coupon_${i}`" :el="el" :is-delete="isDelete" @on-el-update="onElUpdate($event,i)" @on-coupon-delete="onCouponDelete(i)" />
        </template>

      </m-item-card>
    </div>
    <el-dialog title="选择优惠券" append-to-body	:visible.sync="dialogVisible" width="800">
      <m-select-coupon v-if="dialogVisible" ref="selectCoupon" :item="itemParams" @on-select-coupon="onSelectCoupon" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onCouponSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { itemParams, saveDragItem } from './../../../../default'
import mFirst from './../../../preview/_source/coupon/first'
import mSecond from './../../../preview/_source/coupon/second'
import mThird from './../../../preview/_source/coupon/third'
import mItemCard from './../itemCard'
import mFormItem from './_source/formItem'
import mSelectCoupon from './_source/selectCoupon'

export default {
  name: 'SetCoupon',
  data() {
    return {
      itemParams: {},
      dialogVisible: false
    }
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    onSelectCoupon() {

    },
    onElUpdate(el, i) {
      this.$set(this.itemParams.itemList, i, el)
    },
    onCouponDelete(index) {
      this.itemParams.itemList = _.filter(this.itemParams.itemList, (v, i) => i !== index)
    },
    onAssSubmit() {
      const { itemList } = this.itemParams
      let flag = true

      console.log(itemList)

      _.map(itemList, (v, i) => {
        const refs = this.$refs[`coupon_${i}`][0].$verification()
        if (!refs) {
          flag = false
        }
      })

      if (flag) {
        // todo 提交
        saveDragItem(this.$root, this.itemParams)
      }
    },
    onCouponSubmit() {
      const selectCoupon = this.$refs.selectCoupon.$verification()
      if (typeof selectCoupon === 'object') {
        this.itemParams.itemList = []
        _.map(selectCoupon, (v, i) => {
          const { cname, denomination, ctype, value, effectTime, timeRule, sceneRule, productRule, shopRule } = v

          this.itemParams.itemList.push({
            ..._.cloneDeep(itemParams),
            itemId: `${v.id}`, cname, denomination, ctype, value, effectTime, timeRule, sceneRule, productRule, shopRule
          })
        })

        this.dialogVisible = false
      }
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
    isDelete() {
      const { subType, itemList } = this.itemParams
      if (subType === 'first') {
        return _.size(itemList) > 1 && _.size(itemList) < 10
      }
      if (subType === 'second') {
        return _.size(itemList) > 2 && _.size(itemList) < 10
      }
      if (subType === 'third') {
        return _.size(itemList) > 3 && _.size(itemList) < 10
      }
    },
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
  components: { mItemCard, mFormItem, mSelectCoupon }
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
