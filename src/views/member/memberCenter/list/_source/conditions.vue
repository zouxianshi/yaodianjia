<template>
  <div class="conditions-model">
    <el-form ref="form" :model="conditions" label-width="80px">
      <el-form-item label="选择门店">
        <el-radio-group v-model="conditions.organizations" @change="storeTypeChange">
          <el-radio :label="null">不限</el-radio>
          <el-radio label="1">
            <span @click="chooseCon('A')">选择门店<i class="el-icon-arrow-down" /></span>
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="">
        <span v-for="(items, index) in organizationsArr" :key="index">
          <el-tag v-if="items.selectFlag" type="info" class="tags" closable size="small" @close="items.selectFlag=false">
            {{ items.stName }}
          </el-tag>
        </span>
      </el-form-item>
      <el-form-item label="会员分类">
        <el-radio-group v-model="conditions.memberActive">
          <el-radio label="">不限</el-radio>
          <el-radio label="1">普通会员</el-radio>
          <el-radio label="2">新增会员</el-radio>
          <el-radio label="3">优质会员</el-radio>
          <el-radio label="4">活跃会员</el-radio>
          <el-radio label="9">沉寂会员</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="注册来源">
        <el-radio-group v-model="conditions.registerSource">
          <el-radio :label="null">不限</el-radio>
          <el-radio :label="1">门店推荐</el-radio>
          <el-radio :label="2">员工推荐</el-radio>
          <el-radio :label="3">商户渠道</el-radio>
          <el-radio :label="4">平台渠道</el-radio>
          <el-radio :label="5">支付即会员</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="会员性别">
        <el-radio-group v-model="conditions.gender">
          <el-radio label="">不限</el-radio>
          <el-radio label="1">男</el-radio>
          <el-radio label="2">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="注册来源">
        <el-radio-group v-model="conditions.regLy">
          <el-radio :label=null>不限</el-radio>
          <el-radio label="1">选择门店</el-radio>
          <el-radio label="2">选择员工</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="" v-if="conditions.regLy === '1'">
        <div>选择推荐人</div>
      </el-form-item>
    </el-form>
    <m-select-store ref="A" :store-data="organizationsArr" />
    <!-- <m-select-consultant ref="B" :con-data="empCodesArr" /> -->
  </div>
</template>
<script>
import { queryStoreByOrgId } from '@/api/coupon'
import mSelectStore from './selectStore' // 选择门店
import mSelectConsultant from './selectConsultant' // 选择顾问
import { queryEmployee } from '@/api/memberService' // 选择门店和顾问接口
export default {
  name: 'Conditions',
  components: {
    mSelectStore, mSelectConsultant
  },
  data() {
    return {
      // 提交门店参数
      organizationsArr: [],
      conditions: {
        registerSource: null, // 注册来源
        empCodes: null, // 健康顾问
        memberActive: '', // 会员分类
        gender: '', // 性别
        organizations: null, // 门店
        regLy: null
      }
    }
  },
  computed: {
    // 已选择的门店
    choosedOrganizationsArr() {
      var arr = []
      this.organizationsArr.map(items => {
        if (items.selectFlag) {
          arr.push(items)
        }
      })
      return arr
    }
  },
  created() {
    this.getStoreData()
  },
  methods: {
    // 门店类型切换（不限 \ 选择门店）
    storeTypeChange(e) {
      if (!e) {
        this.organizationsArr.map(items => {
          items.selectFlag = false
        })
      }
    },
    getData(data) {
      return this.conditions
    },
    chooseCon(type) { // 选择门店
      this.$refs[type].showDialogVisible()
    },
    // 获取门店数据
    getStoreData() {
      queryStoreByOrgId(
        { currentPage: 1, pageSize: 999 }
      ).then(res => {
        var data = res.data.data
        data.map(items => {
          items.selectFlag = false // 门店是否选中
          items.show = true // 门店是否显示
        })
        this.organizationsArr = res.data.data
      })
    },
    resetParams() {
      this.conditions = {
        registerSource: null, // 注册来源
        empCodes: null, // 健康顾问
        memberActive: '', // 会员分类
        gender: '', // 性别
        organizations: null // 门店
      }
      this.organizationsArr.forEach(item => {
        item.selectFlag = false
      })
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.el-form-item{
  margin-bottom: 0;
  .tags{
    margin-right: 5px;
  }
}
</style>
