<template>
  <div class="conditions-model">
    <el-form ref="form" :model="conditions" label-width="80px">
      <el-form-item label="选择门店">
        <el-radio-group v-model="conditions.organizations">
          <el-radio :label="null">不限</el-radio>
          <el-radio label="1">
            <span @click="chooseCon('A')">选择门店<i class="el-icon-arrow-down" /></span>
          </el-radio>
          <span v-for="(items, index) in empCodesArr" :key="index">
            <el-tag v-if="items.selectFlag" type="info" class="tags" closable size="small" @close="items.selectFlag=false">
              {{ items.storeName }}
            </el-tag>
          </span>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="健康顾问">
        <el-radio-group v-model="conditions.empCodes">
          <el-radio :label="null">不限</el-radio>
          <el-radio label="1">
            <span @click="chooseCon('B')">选择顾问<i class="el-icon-arrow-down" /></span>
          </el-radio>
          <span v-for="(items, index) in organizationsArr" :key="index">
            <span v-for="(items2, index2) in items.employees" :key="index2">
              <el-tag v-if="items2.selectFlag" type="info" class="tags" closable size="small" @close="items2.selectFlag=false">
                {{ items2.empName }}
              </el-tag>
            </span>
          </span>
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
    <m-select-store ref="A" :store-data="organizationsArr" />
    <m-select-consultant ref="B" :con-data="empCodesArr" />
  </div>
</template>
<script>
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
      // 提交门店和顾问参数
      empCodesArr: [],
      organizationsArr: [],
      conditions: {
        regChannel: '', // 注册来源
        empCodes: null, // 健康顾问
        memberActive: '', // 会员分类
        gender: '', // 性别
        organizations: null // 门店
      }
    }
  },
  computed: {
    // 已选择的门店和顾问
    choosedEmpCodesArr() {
      var arr = []
      this.organizationsArr.map(items => {
        items.employees.map(items2 => {
          if (items2.selectFlag) {
            arr.push(items2)
          }
        })
      })
      return arr
    },
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
    this.getEmployeeData()
  },
  methods: {
    getData(data) {
      return this.conditions
    },
    chooseCon(type) { // 选择门店或顾问
      this.$refs[type].showDialogVisible()
    },
    // 获取门店和顾问数据
    getEmployeeData() {
      var params = {
        'pageFlag': false
      }
      queryEmployee(params).then(res => {
        var data = res.data
        data.map(items => {
          items.foldFlag = true
          items.selectFlag = false
          items.employees.map(items2 => {
            items2.selectFlag = false
          })
        })
        this.empCodesArr = res.data
        this.organizationsArr = res.data
      })
    },
    resetParams() {
      this.conditions = {
        regChannel: '', // 注册来源
        empCodes: null, // 健康顾问
        memberActive: '', // 会员分类
        gender: '', // 性别
        organizations: null // 门店
      }
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
