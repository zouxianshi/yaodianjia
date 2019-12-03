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
            <el-radio-group v-model="modalForm.type">
              <el-radio :label="0">不限购</el-radio>
              <el-radio :label="1"><span style="color:#333">单个用户限购数量为&nbsp;<el-input v-model="modalForm.limit" maxlength="8" size="small" style="width:100px" />&nbsp;<span style="color:#999">用户限制的最大购买数量，可防止某些商品被恶意下单占用库存</span></span></el-radio>
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
    }
  },
  data() {
    return {
      modalForm: {
        type: 0,
        limit: ''
      }
    }
  },
  computed: {
    ...mapGetters(['merCode'])
  },
  watch: {
    isShow() {
      this.modalForm.type = 0
      this.modalForm.limit = ''
    }
  },
  methods: {
    handleColse() {
      this.$emit('close')
    },
    handleSubmit() {
      const data = {
        limitNum: 0,
        merCode: this.merCode,
        specIds: this.specData
      }
      if (this.modalForm.type === 0) {
        data.limitNum = 0
      } else {
        data.limitNum = this.modalForm.limit
      }
      if (this.modalForm.type === 1) {
        if (this.modalForm.limit > 0 && this.modalForm.limit % 1 !== 0) {
          this.$message({
            message: '请输入大于0的整数',
            type: 'error'
          })
          return
        } else {
          if (this.modalForm.limit <= 0) {
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
