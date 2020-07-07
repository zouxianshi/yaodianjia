<template>
  <el-dialog
    :visible.sync="isShow"
    width="700px"
    :close-on-click-modal="false"
    append-to-body
    :show-close="false"
    custom-class="custom-dialog-class"
    destroy-on-close
  >
    <div slot="title" class="custom-title">
      <span>活动商品设置</span>
    </div>
    <div class="dialog-body">
      <section class="goods-basib-info">
        <div class="image">
          <el-image :src="showImg(info.picUrl)" style="width:100px">
            <div slot="placeholder" class="image-slot">
              加载中
              <span class="dot">...</span>
            </div>
          </el-image>
        </div>
        <div class="txt-info">
          <p>商品名称：{{ info.name }}</p>
          <p>商品编码：{{ info.erpCode }}</p>
          <p>
            参考价：
            <span class="zd-price" v-text="'￥'+info.mprice" />
          </p>
        </div>
      </section>
      <div class="form">
        <el-form
          ref="formdData"
          :model="settingForm"
          size="small"
          :rules="rules"
          label-width="100px"
          :disabled="disabled"
        >
          <el-form-item label="成团人数" prop="activityNumber">
            <div class="custom-input">
              <el-input-number
                v-model.number="settingForm.activityNumber"
                controls-position="right"
                style="width:120px"
                :min="2"
                :max="200"
                class="custom-inner-input"
                placeholder
                @input.native="handleInput($event,'activityNumber')"
              />
              <!-- <div class="operate">
                <span class="el-icon-arrow-up" @click="handleAddNum(1,'activityNumber')" />
                <span class="el-icon-arrow-down" @click="handleAddNum(2,'activityNumber')" />
              </div> -->
            </div>
          </el-form-item>
          <el-form-item label="是否限购">
            <el-radio-group v-model="settingForm.isXg" @change="handleXgChange">
              <el-radio :label="0">否</el-radio>
              <el-radio :label="1">是</el-radio>
            </el-radio-group>
            <section v-if="settingForm.isXg===1" style="margin-top:20px">
              <el-form-item label="每人限开/参团" label-width="110px">
                <div class="custom-input">
                  <el-input-number
                    v-model="settingForm.addLimitTimes"
                    controls-position="right"
                    style="width:120px"
                    class="custom-inner-input"
                    placeholder
                    :min="1"
                    :max="9999999"
                    @input.native="handleInput($event,'addLimitTimes')"
                  />
                  <!-- <div class="operate">
                    <span class="el-icon-arrow-up" @click="handleAddNum(1,'addLimitTimes')" />
                    <span class="el-icon-arrow-down" @click="handleAddNum(2,'addLimitTimes')" />
                  </div> -->
                  &nbsp;次
                </div>
              </el-form-item>
              <el-form-item label="单次限购" label-width="110px">
                <div class="custom-input">
                  <el-input-number
                    v-model="settingForm.limitCount"
                    controls-position="right"
                    style="width:120px"
                    class="custom-inner-input"
                    :min="1"
                    :max="9999999"
                    placeholder
                    @input.native="handleInput($event,'limitCount')"
                  />
                  <!-- <div class="operate">
                    <span class="el-icon-arrow-up" @click="handleAddNum(1,'limitCount')" />
                    <span class="el-icon-arrow-down" @click="handleAddNum(2,'limitCount')" />
                  </div> -->
                  &nbsp;份
                </div>
              </el-form-item>
            </section>
          </el-form-item>
          <el-form-item label="是否包邮">
            <el-radio-group v-model="settingForm.isFreeshipping">
              <el-radio :label="0">否</el-radio>
              <el-radio :label="1">是</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="拼团库存" prop="productActivityCount">
            <div class="custom-input">
              <el-input-number
                v-model.number="settingForm.productActivityCount"
                style="width:120px"
                class="custom-inner-input"
                controls-position="right"
                :min="2"
                :max="9999999"
                placeholder
                @input.native="handleInput($event,'productActivityCount')"
              />
              <!-- <div class="operate">
                <span class="el-icon-arrow-up" @click="handleAddNum(1,'productActivityCount')" />
                <span class="el-icon-arrow-down" @click="handleAddNum(2,'productActivityCount')" />
              </div> -->
              <span>&nbsp;&nbsp;拼团活动库存至少要满足一个团的库存需求</span>
            </div>
          </el-form-item>
          <el-form-item label="拼团价格" prop="activityPrice">
            <el-input-number v-model="settingForm.activityPrice" :step="0.01" :min="0" controls-position="right" placeholder="0.00" style="width:120px" />
            <span>&nbsp;&nbsp;拼团价格需低于当前价格</span>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="isShow=false">取 消</el-button>
      <el-button type="primary" :disabled="disabled" size="small" @click="handleSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { checkNumberdouble } from '@/utils/validate'
export default {
  name: 'EditGoodsModals',
  props: {
    info: {
      type: Object,
      default: () => {
        return {}
      }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    var checkPrice = (rule, value, callback) => {
      if (!value && value !== 0) {
        return callback(new Error('拼团价格不能为空'))
      }
      if (value === 0) {
        return callback(new Error(`拼团价格不能为0`))
      }
      if (value >= this.info.mprice) {
        return callback(new Error(`拼团价格需小于商品参考价`))
      }
      if (value && !checkNumberdouble(value)) {
        return callback(new Error('只能设置最多两位小数的正数'))
      }
      callback()
    }
    var checkNum = (rule, value, callback) => {
      // productActivityCount 拼团库存
      // activityNumber 拼团人数
      // 1.拼团库存不小于当前设置的成团人数
      // 1.所有拼团商品成团人数最低限定为2，最高200
      if (!value * 1) {
        return callback(new Error(`成团人数不能为空`))
      }
      if (value * 1 < 2) {
        return callback(new Error(`成团人数不能小于2`))
      }
      if (value * 1 > 200) {
        return callback(new Error('拼团商品成团人数最高200人'))
      }
      if (value * 1 > this.settingForm.productActivityCount * 1) {
        return callback(new Error('成团人数不大于当前设置的拼团库存'))
      }
      if (value * 1 <= 200 && value * 1 < this.settingForm.productActivityCount * 1) {
        this.$refs['formdData'].clearValidate(['productActivityCount'])
      }
      callback()
    }
    var produccheckNum = (rule, value, callback) => {
      if (!value * 1) {
        return callback(new Error('拼团库存不能为空'))
      }
      if (value * 1 < 2) {
        return callback(new Error('拼团库存不能小于2'))
      }
      if (value * 1 < this.settingForm.activityNumber * 1) {
        return callback(new Error('拼团库存不小于当前设置的成团人数'))
      }
      if (this.settingForm.activityNumber * 1 <= 200 && value * 1 > this.settingForm.activityNumber * 1) {
        this.$refs['formdData'].clearValidate(['activityNumber'])
      }
      callback()
    }
    return {
      isShow: false,
      settingForm: {
        activityNumber: 2,
        isXg: 0,
        addLimitTimes: 0,
        limitCount: 0,
        isFreeshipping: false,
        productActivityCount: 2,
        activityPrice: 0
      },
      rules: {
        activityPrice: [
          { required: true, validator: checkPrice, trigger: 'blur' }
        ],
        activityNumber: [
          { required: true, validator: checkNum, trigger: 'blur' }
        ], // 成团人数
        isXg: [{ required: true, message: '', trigger: 'change' }],
        productActivityCount: [
          { required: true, validator: produccheckNum, trigger: 'blur' }
        ]
      }
    }
  },
  created() {},
  methods: {
    open() {
      this.isShow = true
      this.settingForm = {
        activityNumber: this.info.activityNumber || 2,
        isXg: this.info.isXg || 0,
        addLimitTimes: this.info.addLimitTimes || 0,
        limitCount: this.info.limitCount || 0,
        isFreeshipping: this.info.isFreeshipping || 0,
        productActivityCount: this.info.productActivityCount || 2,
        activityPrice: this.info.activityPrice || 0
      }
      if (
        this.settingForm.addLimitTimes > 0 ||
        this.settingForm.limitCount > 0
      ) {
        this.settingForm.isXg = 1
      } else {
        this.settingForm.isXg = 0
      }
    },
    close() {
      this.isShow = false
    },
    handleSubmit() {
      // 提交完善数据
      this.$refs['formdData'].validate(valid => {
        if (valid) {
          const limitCount = Number(this.settingForm.limitCount)
          const addLimitTimes = Number(this.settingForm.addLimitTimes)
          if (
            this.settingForm.isXg === 1 &&
            (limitCount === 0 || !addLimitTimes)
          ) {
            this.$message({
              message: '单次限购不能为空且必须大于0',
              type: 'error'
            })
            return
          }
          if (
            this.settingForm.isXg === 1 &&
            (addLimitTimes === 0 || !addLimitTimes)
          ) {
            this.$message({
              message: '每人限开/参团',
              type: 'error'
            })
            return
          }
          const data = JSON.parse(JSON.stringify(this.settingForm))
          data.openLimitTimes = data.addLimitTimes
          if (data.isXg === 0) {
            data.addLimitTimes = 0
            data.limitCount = 0
          }
          delete data.isXg
          const newData = Object.assign(this.info, data)
          this.$emit('complete', newData)
        } else {
          console.log('error submit!!')
          // return false
        }
      })
    },
    handleInput(e, key) {
      const value = e.target.value
      e.target.value = value.replace(/[^\d]/g, '')
      // this.settingForm[key] = value
    },
    // handleAddNum(type, key) {
    //   // 输入框上下加减处理
    //   if (!this.settingForm[key]) {
    //     return
    //   }
    //   if (key === 'productActivityCount' || key === 'activityNumber') {
    //     if (type === 1) {
    //       this.settingForm[key]++
    //     } else {
    //       if (this.settingForm[key] !== 2) {
    //         this.settingForm[key]--
    //       }
    //     }
    //   } else {
    //     if (type === 1) {
    //       this.settingForm[key]++
    //     } else {
    //       if (this.settingForm[key] !== 1) {
    //         this.settingForm[key]--
    //       }
    //     }
    //   }
    // },
    handleXgChange(row) {
      if (row === 1) {
        this.settingForm.limitCount = 1
        this.settingForm.addLimitTimes = 1
      }
    }
  }
}
</script>
<style lang="scss">
.custom-dialog-class {
  .el-dialog__header {
    padding: 0;
    background: #e5e5e5;
    line-height: 45px;
    padding-left: 20px;
  }
  .el-dialog__body {
    padding: 10px 10px;
  }
  .goods-basib-info {
    display: flex;
    padding: 10px 0;
    border-bottom: 1px solid #e5e5e5;
    .txt-info {
      margin-left: 10px;
      p {
        line-height: 35px;
      }
      .zd-price {
        font-size: 20px;
        color: red;
      }
      .zdjg {
        font-size: 12px;
        color: #c9c9c9;
        span {
          color: red;
        }
      }
    }
  }
  .form {
    margin-top: 20px;
  }
  .custom-input {
    display: flex;
    .custom-input-box {
      border-top-right-radius: 0 !important;
      border-bottom-right-radius: 0 !important;
      border-right: none !important;
      &:focus {
        outline: none;
        border-color: #147de8;
      }
    }
    .operate {
      display: flex;
      flex-direction: column;
      margin-left: -12px;
      z-index: 3;
      width: 30px;
      align-items: center;
      background: #f5f7fa;
      border: 1px solid #dcdfe6;
      height: 32px;
      border-radius: 4px;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      color: #909399;
      span {
        width: 100%;
        text-align: center;
        &:last-child {
          border-top: 1px solid #dcdfe6;
        }
      }
    }
  }
}
</style>
