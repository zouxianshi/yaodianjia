<template>
  <div class="limit-buy">
    <el-dialog
      title="设置限购"
      :visible.sync="isShow"
      append-to-body
      :close-on-press-escape="false"
      :show-close="false"
      width="700px"
      :close-on-click-modal="false"
    >
      <div class="modal-body">
        <el-form :model="modalForm">
          <el-form-item label="">
            <el-radio-group v-model="modalForm.limitType" @change="handleLimitChange">
              <el-radio :label="0" style="display:block line-height: 28px">不限购</el-radio>
              <el-radio :label="1" style="margin-top:10px;display:block">
                <span style="color:#333">每笔订单限购&nbsp;
                  <template v-if="modalForm.limitType===1">
                    <el-input v-model="modalForm.limitNum" maxlength="8" :disabled="modalForm.limitType===2||modalForm.limitType===0" size="mini" style="width:100px" />&nbsp;件<span style="color:#999" />
                  </template>
                  <template v-else>
                    <el-input :disabled="modalForm.limitType===2||modalForm.limitType===0" maxlength="8" size="mini" style="width:100px" />&nbsp;<span style="color:#999" />
                  </template>
                </span>
              </el-radio>
              <el-radio :label="2" style="margin-top:10px">
                <span style="color:#333">按周期每&nbsp;
                  <el-select v-model="modalForm.type" :disabled="modalForm.limitType===1||modalForm.limitType===0" size="mini" style="width:80px" placeholder="选择类型">
                    <el-option :value="2" label="天" />
                    <el-option :value="3" label="周" />
                    <el-option :value="4" label="月" />
                  </el-select>
                  &nbsp;限购&nbsp;
                  <template v-if="modalForm.limitType===2">
                    <el-input v-model="modalForm.limit" maxlength="8" :disabled="modalForm.limitType===1||modalForm.limitType===0" size="mini" style="width:100px" @input.native="handleInputNum" />&nbsp;件
                  </template>
                  <template v-else>
                    <el-input maxlength="8" :disabled="modalForm.limitType===1||modalForm.limitType===0" size="mini" style="width:100px" />&nbsp;件
                  </template>
                </span>
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer">
        <el-button type="" size="small" @click="handleColse">取消</el-button>
        <el-button type="primary" size="small" @click="handleSubmit">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { setLimitBuyNum } from '@/api/depot'
import { mapGetters } from 'vuex'
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    specData: {
      type: Array,
      default: () => {
        return []
      }
    },
    commodityIds: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      modalForm: {
        limitType: 0,
        type: 2,
        limit: '',
        limitNum: ''
      }
    }
  },
  computed: {
    ...mapGetters(['merCode'])
  },
  watch: {
    isShow() {
      this.modalForm.type = 2
      this.modalForm.limitType = 0
      this.modalForm.limitNum = ''
      this.modalForm.limit = ''
    }
  },
  methods: {
    handleColse() {
      this.$emit('close')
    },
    handleLimitChange(row) {
      if (row === 1 || row === 2) {
        this.modalForm.limitNum = ''
      }
    },
    handleInputNum(val) {

    },
    handleSubmit() {
      const data = {
        limitNum: 0,
        merCode: this.merCode,
        specIds: this.specData,
        commIds: this.commodityIds,
        limitType: this.modalForm.limitType,
        type: this.modalForm.type
      }
      if (this.modalForm.limitType === 0) {
        data.limitNum = 0
      } else {
        data.limitNum = this.modalForm.limitType === 2 ? this.modalForm.limit : this.modalForm.limitNum
      }
      if (this.modalForm.limitType === 1 || this.modalForm.limitType === 2) {
        if (isNaN(data.limitNum)) {
          this.$message({
            message: '请输入数字',
            type: 'error'
          })
          return
        }
        if (data.limitNum > 0 && data.limitNum % 1 !== 0) {
          this.$message({
            message: '请输入大于0的整数',
            type: 'error'
          })
          return
        } else {
          if (data.limitNum <= 0) {
            this.$message({
              message: '请输入大于0的整数',
              type: 'error'
            })
            return
          }
        }
      }
      setLimitBuyNum(data).then(res => {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        this.$emit('complete')
        this.handleColse()
      })
    }
  }
}
</script>
