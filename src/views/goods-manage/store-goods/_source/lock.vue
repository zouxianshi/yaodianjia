<template>
  <div>
    <el-dialog
      :title="`勾选后，${lockType===0?'锁定库存或价格':'对库存或价格解除锁定'}`"
      :visible.sync="visable"
      append-to-body
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      @close="handleClose"
    >
      <el-form ref="lockForm" :model="formData" :rules="rules" size="small">
        <el-form-item :label="`${lockType===0?'锁定':'解锁'}商品属性：`" prop="lockFlag">
          <el-checkbox-group v-model="formData.lockFlag">
            <el-checkbox :label="1">价格</el-checkbox>
            <el-checkbox :label="2">库存</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item v-if="lockType===0&&formData.lockFlag.length>0" label="定时解锁设置：">
          <el-checkbox
            v-model="formData.unlockType"
            :true-label="1"
            :false-label="0"
            @change="unlockTypeChange"
          >定时解锁</el-checkbox>
        </el-form-item>
        <el-form-item v-if="formData.unlockType===1" label="解锁时间" prop="unlockTime">
          <el-date-picker
            v-model="formData.unlockTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            class="custom-class"
            placeholder="选择日期时间"
          />
        </el-form-item>
      </el-form>
      <!-- <p class="lock-tip">
        <span>说明：</span>锁定之后将不再接受ERP库存或价格的更新，除非解锁。
      </p>-->
      <el-tag v-if="lockType===0" type="warning">说明：锁定之后将不再接受ERP库存或价格的更新，除非解锁。</el-tag>
      <el-tag v-else type="warning">说明：解锁后将正常接受ERP库存或价格的更新。</el-tag>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="handleClose">取 消</el-button>
        <el-button
          v-if="lockType===0"
          type="primary"
          size="small"
          :loading="subLoading"
          @click="handleSubmitLock"
        >锁 定</el-button>
        <el-button
          v-else
          type="primary"
          size="small"
          :loading="subLoading"
          @click="handleSubmitLock"
        >解 锁</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { setLockPrice } from '@/api/store-goods'
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    lockType: {
      type: Number,
      default: 0
    },
    goodsList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    const _checkTime = (rule, value, callback) => {
      if (value) {
        const chooseTime = Date.parse(new Date(value))
        const nowTime = Date.parse(new Date())
        if (chooseTime < nowTime) {
          callback(new Error('选择时间必须大于当前时间'))
        } else {
          callback()
        }
      } else {
        if (this.formData.unlockType === 1) {
          callback(new Error('请选择解锁时间'))
        } else {
          callback()
        }
      }
    }
    return {
      visable: false,
      rules: {
        unlockTime: [{ required: true, validator: _checkTime, trigger: 'change' }],
        lockFlag: [
          {
            required: true,
            message: '请输入所要操作的商品属性',
            trigger: 'change'
          }
        ]
      },
      subLoading: false,
      formData: {
        lockFlag: [],
        lockList: [],
        unlockTime: '',
        unlockType: 0
      }
    }
  },
  computed: {
    ...mapGetters(['merCode', 'name'])
  },
  watch: {
    isShow() {
      this.visable = this.isShow
      this.formData.lockFlag = []
      this.formData.unlockType = 0
      this.formData.unlockTime = ''
      this.$nextTick(() => {
        this.$refs.lockForm.clearValidate()
      })
    }
  },
  methods: {
    handleClose() {
      this.visable = false
      this.$nextTick(() => {
        this.$refs.lockForm.resetFields()
        this.$refs.lockForm.clearValidate()
      })
      this.$emit('close')
    },
    unlockTypeChange() {
      // 定时解锁 chang
      this.formData.unlockTime = ''
    },
    handleSubmitLock() {
      this.$refs['lockForm'].validate(valid => {
        if (valid) {
          if (
            this.formData.unlockType === 1 &&
            this.formData.unlockTime !== '' &&
            this.formData.lockFlag.length === 0
          ) {
            this.$message({
              message: '请选择锁定属性',
              type: 'error'
            })
            return
          }
          let checkStatus = 0
          if (this.formData.lockFlag.length === 1) {
            checkStatus = this.formData.lockFlag[0]
          }
          // 选定价格和库存
          if (this.formData.lockFlag.length === 2) {
            checkStatus = 3
          }
          this.formData.lockList = []
          // 获取规格id
          this.goodsList.map(item => {
            let lockStatus = 0
            // int 锁定同步标志，0-全不锁定，1-锁定价格，2-锁定库存，3-锁定价格和库存
            // 锁定
            if (this.lockType === 0) {
              // lockStatus = checkStatus === item.lockFlag ? checkStatus : 3
              if (checkStatus === 3) {
                lockStatus = 3
              } else if (checkStatus === 2) {
                lockStatus = item.lockFlag === 3 || item.lockFlag === 1 ? 3 : 2
              } else if (checkStatus === 1) {
                lockStatus = item.lockFlag === 3 || item.lockFlag === 2 ? 3 : 1
              }
            } else {
              // 解锁
              if (checkStatus === 3) {
                lockStatus = 0
              } else if (checkStatus === 2) {
                lockStatus = item.lockFlag === 3 || item.lockFlag === 1 ? 1 : 0
              } else if (checkStatus === 1) {
                lockStatus = item.lockFlag === 3 || item.lockFlag === 2 ? 2 : 0
              }
            }
            this.formData.lockList.push({
              lockFlag: lockStatus,
              specId: item.id,
              storeId: item.storeId
            })
          })
          // delete this.formData.lockFlag
          console.log('---formData---', this.formData)
          this.subLoading = true
          setLockPrice(this.formData)
            .then(res => {
              this.$message({
                message: '操作成功',
                type: 'success'
              })
              this.subLoading = false
              this.$emit('complete')
              // this._loadList()
            })
            .catch(() => {
              this.subLoading = false
              this.dialogVisible = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss">
.el-dialog {
  width: 35%;
}
</style>
