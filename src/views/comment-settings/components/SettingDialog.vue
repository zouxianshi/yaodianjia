<template>
  <el-dialog title="评论设置" :visible.sync="visible" append-to-body @closed="$emit('closed')">
    <el-form ref="formData" :rules="rules" :model="formData" label-width="200px">
      <el-form-item label="每人最多可对同一商品发表" prop="countLimit">
        <el-input
          v-model.number="formData.countLimit"
          type="number"
          size="small"
          maxlength="3"
          placeholder="请输入"
          style="width: 80px"
          max="999"
          min="0"
        />
        <span>条评论</span>
      </el-form-item>
      <!-- <el-form-item label="是否支持评论上传图片" prop="imtStatus">
        <el-radio v-model="formData.imtStatus" label="1">是</el-radio>
        <el-radio v-model="formData.imtStatus" label="0">否</el-radio>
      </el-form-item> -->
    </el-form>
    <div class="bottom-bar">
      <el-button @click="$emit('closed')">取消</el-button>
      <el-button type="primary" :loading="isSubmitLoading" @click="onSubmit">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// 设置弹框
import mixins from '@/utils/mixin'
import { mapGetters } from 'vuex'
import { postCommentSetting } from '@/api/commentService'

export default {
  name: 'SettingDialog',
  components: {},
  mixins: [mixins],
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    commodityId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      formData: {
        imtStatus: '1'
      },
      rules: {
        countLimit: [
          { required: true, message: '不能为空', trigger: 'blur' }
          // {
          //   validator(rule, value, callback) {
          //     return value >= 0 && value <= 999
          //   },
          //   message: '只能输入0到999',
          //   trigger: 'blur'
          // }
        ]
      },
      isSubmitLoading: false
    }
  },
  computed: {
    ...mapGetters(['merCode', 'token'])
  },
  methods: {
    onSubmit() {
      const { formData, merCode } = this
      this.$refs['formData'].validate(async valid => {
        if (valid) {
          this.isSubmitLoading = true
          await postCommentSetting({
            ...formData,
            merCode
          })
          this.isSubmitLoading = false
          this.$message.success('修改成功！')
        } else {
          console.log('error submit!!')
          this.isSubmitLoading = false
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
.custom-tree-node {
  display: -webkit-box;
  display: flex;
  display: -ms-flexbox;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
  width: 100%;
  &.active {
    color: #2d8cf0;
  }
  i {
    display: inline-block;
    margin-left: 10px;
  }
  .ellipsis {
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-right: 9px;
  }
}
</style>
<style lang="scss" scoped>
.bottom-bar {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
