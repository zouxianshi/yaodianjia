<template>
  <div class="conditions-model">
    <el-form ref="form" :model="conditions" label-width="80px">
      <el-form-item label="选择门店">
        <el-radio-group v-model="conditions.storeId">
          <el-radio label="">不限</el-radio>
          <el-radio label="1">选择门店<i class="el-icon-arrow-down" @click="chooseCon('A')" /></el-radio>
          <el-tag v-for="(items, index) in storeIdArr" :key="index" type="info" class="tags" closable size="small" @close="handleClose(index)">{{ items }}</el-tag>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="健康顾问">
        <el-radio-group v-model="conditions.empCodes">
          <el-radio label="">不限</el-radio>
          <el-radio label="1">选择顾问<i class="el-icon-arrow-down" @click="chooseCon('B')" /></el-radio>
          <el-tag v-for="(items, index) in storeIdArr" :key="index" type="info" class="tags" closable size="small" @close="handleClose(index)">{{ items }}</el-tag>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="会员分类">
        <el-radio-group v-model="conditions.memberActive">
          <el-radio label="">不限</el-radio>
          <el-radio label="1">普通会员</el-radio>
          <el-radio label="2">新增会员</el-radio>
          <el-radio label="3">优质会员</el-radio>
          <el-radio label="4">活跃会员</el-radio>
          <el-radio label="5">沉寂会员</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="注册来源">
        <el-radio-group v-model="conditions.regChannel">
          <el-radio label="">不限</el-radio>
          <el-radio label="1">门店推荐</el-radio>
          <el-radio label="2">员工推荐</el-radio>
          <el-radio label="3">商户渠道</el-radio>
          <el-radio label="4">平台渠道</el-radio>
          <el-radio label="5">支付既会员</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="会员性别">
        <el-radio-group v-model="conditions.gender">
          <el-radio label="">不限</el-radio>
          <el-radio label="1">男</el-radio>
          <el-radio label="2">女</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <m-select-store ref="A" />
    <m-select-consultant ref="B" />
  </div>
</template>
<script>
import mSelectStore from './selectStore' // 选择门店
import mSelectConsultant from './selectConsultant' // 选择顾问
export default {
  name: 'Conditions',
  components: {
    mSelectStore, mSelectConsultant
  },
  data() {
    return {
      storeIdArr: ['门店1', '门店2', '门店3', '门店4'],
      conditions: {
        storeId: '',
        empCodes: '', // 健康顾问
        memberActive: '', // 会员分类
        gender: '', // 性别
        regChannel: '' // 注册来源
      }
    }
  },
  methods: {
    getData(data) {
      return this.conditions
    },
    handleClose(tag) {
      this.storeIdArr.splice(tag, 1)
    },
    chooseCon(type) {
      this.$refs[type].showDialogVisible()
      console.log(this.$refs[type])
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.el-form-item{
  margin-bottom: 0;
  .tags{
    margin-right: 10px;
  }
}
</style>
