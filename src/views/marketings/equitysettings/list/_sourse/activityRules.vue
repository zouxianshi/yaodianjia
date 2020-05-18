<template>
  <div class="activityRules-model">
    <el-form ref="forms" :model="forms" :rules="rules">
      <el-form-item label="兑换对象">
        积分&nbsp;
        <img src="@/assets/icon/exchange.png" alt style="width:15px;height:15px"> &nbsp;海贝&nbsp;
        <el-tooltip
          class="item"
          effect="dark"
          content="为区别线上线下积分，“海贝”为线上积分名称，不可修改"
          placement="top-start"
        >
          <i class="el-icon-warning-outline" style="color: #409eff;" />
        </el-tooltip>
      </el-form-item>
      <el-form-item label="兑换比例">
        1 ：
        <el-form-item prop="num" style="display:inline-block">
          <el-input v-model="forms.num" onkeyup="this.value=this.value.match(/^[1-9]{1}[0-9]*$/)" style="width:100px" />
        </el-form-item>
      &nbsp;
        <el-tooltip class="item" effect="dark" content="请根据实际情况设置海贝的兑换比例" placement="top-start">
          <i class="el-icon-warning-outline" style="color: #409eff;" />
        </el-tooltip>
      </el-form-item>
      <el-divider />
      <div class="preview">
        <el-form-item label="预览规则">
          1积分&nbsp;
          <img src="@/assets/icon/exchange.png" alt style="width:15px;height:15px"> &nbsp;海贝&nbsp;
        </el-form-item>
      </div>
    </el-form>
    <div style="margin:200px 0px 0px 300px">
      <el-button type="primary" size="small" @click="onSubmit">保存</el-button>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { editMerChantSet, editMerChantsearch } from '@/api/equity'
export default {
  name: 'ActivityRules',
  props: {},
  data() {
    return {
      forms: {
        num: 1
      },
      rules: {
        num: [
          { required: true, message: '请输入数量', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['merCode'])
  },
  watch: {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {
    this.getData()
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    getData() {
      const params = `mercode=${this.merCode}&sysKey=integral_exchange_proportion`
      editMerChantsearch(params).then(res => {
        if (res.data === 'null') {
          this.forms.num = 1
        } else {
          this.forms.num = res.data.sysValue
        }
      })
    },
    onSubmit() {
      const params = {
        merCode: this.merCode,
        sysKey: 'integral_exchange_proportion',
        sysName: '海币兑换',
        sysValue: this.num
      }
      this.$refs['forms'].validate((valid) => {
        if (valid) {
          editMerChantSet(params).then(res => {
            if (res.code === '10000') {
              this.$message({
                message: '保存成功',
                type: 'success'
              })
              this.$emit('submitactivit', 2)
            }
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

<style lang="scss" rel="stylesheet/scss">
.activityRules-model {
  padding: 20px;
  height: calc(100vh - 250px);
  .preview {
    color: #909399;
  }
  .preview .el-form-item__label {
    color: #909399;
  }
  .el-form-item__content{
    margin-left: 0px !important
  }
}
</style>
