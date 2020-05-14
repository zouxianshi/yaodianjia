<template>
  <div class="return-rule">
    <el-form
      ref="returnRuleForm"
      :model="params"
      size="mini"
      label-position="left"
      label-width="110px"
      :inline="false"
    >
      <el-form-item label="退货规则：">
        <el-radio-group
          v-model="params.returnRule"
          :disabled="disabled"
          @change="$verification()"
        >
          <el-radio :label="1">
            退货退回
            <el-tooltip class="item" effect="light" placement="top-start">
              <i class="el-icon-question" />
              <div slot="content" style="width:500px;line-height:24px">
                <p>1.默认退还场景：订单未支付时取消订单、订单超时未支付、用户收货前全部退货，默认是退还优惠券的，即使不开启退款退券功能也会退还优惠券。</p>
                <p>2.用户收货前及收货后部分退货，优惠券不退还</p>
                <p>3.用户收货后发起的全部退款，将根据您设置的退货规则判断是否退还</p>
              </div>
            </el-tooltip>
          </el-radio>
          <el-radio :label="2">退货后失效</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import _ from 'lodash'
export default {
  props: {
    discountForm: {
      type: Object,
      default() {
        return {}
      }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      params: {
        returnRule: 1
      },
      tipsContent: '1.默认退还场景：订单未支付时取消订单、订单超时未支付、用户收货前全部退货，默认是退还优惠券的，即使不开启退款退券功能也会退还优惠券。'
    }
  },
  watch: {
    discountForm(newVal) {
      this.params = _.cloneDeep(newVal)
    }
  },
  methods: {
    $verification() {
      var _self = this
      var result = new Promise(function(resolve, reject) {
        _self.$refs['returnRuleForm'].validate(valid => {
          if (valid) {
            resolve({ returnRule: _self.params.returnRule })
          } else {
            reject(valid)
          }
        })
      })
      return result
    }
  }
}
</script>
<style lang="scss">
.return-rule{
    .el-form {
        .el-radio-group {
            display: inline-block;
            line-height: inherit;
            vertical-align: text-top;
            font-size: 0;
            width: 100px;
        }
    }
}

</style>
