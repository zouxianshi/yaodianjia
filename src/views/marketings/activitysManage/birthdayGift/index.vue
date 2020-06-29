<template>
  <div class="birthday-modal app-container">
    <div class="items-title">基本信息</div>
    <el-form label-width="100px" label-position="right">
      <el-form-item label="发送规则：">
        会员在生日当天，早晨7点收到祝福礼包
      </el-form-item>
    </el-form>
    <div class="items-title" style="margin-top: 40px">礼包内容</div>
    <el-form label-width="100px" label-position="right" :model="paramsForm">
      <el-form-item label="优惠券：">
        <el-button size="mini">选择优惠券</el-button>
      </el-form-item>
      <el-form-item label="赠送海贝：">
        <el-input-number v-model="paramsForm.HB" :min="0" :max="999999" :step="1" :controls="false" style="width: 120px" size="mini" /> 海贝
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'BirthdayGift',
  data() {
    return {
      paramsForm: {
        couponList: '',
        HB: 0
      }
    }
  }
}
</script>
<style lang="scss">
.birthday-modal {
  .items-title {
    font-size: 18px;
    font-weight: 600;padding-bottom: 20px;
    border-bottom: 1px solid #ccc;
  }
  .el-form{
    margin-top: 20px;
  }
}
</style>
