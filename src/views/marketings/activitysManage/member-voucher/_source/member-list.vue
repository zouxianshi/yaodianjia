<template>
  <div class="member-list-modal app-container">
    <el-form label-width="130" label-position="right" size="mini" :inline="true">
      <el-form-item label="发放对象：">商户会员</el-form-item><div />
      <el-form-item label="匹配条件：">
        <el-select v-model="infoForm.allMember" placeholder="请选择">
          <el-option :value="1" label="全部会员" />
          <el-option :value="2" label="部分会员" />
        </el-select>
      </el-form-item>
      <el-form-item label="出生月份：" label-width="100">
        <el-select v-model="infoForm.month" placeholder="请选择">
          <el-option :value="null" label="不限" />
          <el-option v-for="item in 12" :key="item" :label="item + '月'" :value="item" />
        </el-select>
      </el-form-item>
      <el-form-item label="性别：" label-width="100">
        <el-select v-model="infoForm.sex" placeholder="请选择">
          <el-option
            v-for="(item, index) in sex"
            :key="index"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="领卡时间：" label-width="100">
        <el-select v-model="infoForm.lkTime" placeholder="请选择">
          <el-option
            v-for="(item, index) in lkOptions"
            :key="index"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-date-picker
          v-if="infoForm.lkTime === 3"
          v-model="infoForm.lkTimeQj"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-form-item>
      <el-form-item label="年龄区间：">
        <el-select v-model="infoForm.ageInterval" placeholder="请选择">
          <el-option
            v-for="(item, index) in ageInterval"
            :key="index"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-date-picker
          v-if="infoForm.ageInterval === 6"
          v-model="infoForm.agePicker"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-form-item>
      <el-form-item label="会员积分：">
        <el-select v-model="infoForm.pointsType" placeholder="请选择">
          <el-option
            v-for="(item, index) in pointsType"
            :key="index"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <div v-if="infoForm.pointsType === 3" style="display: inline-block">
          <el-input-number v-model="infoForm.pointsMin" :min="0" :max="999999" :precision="0" :controls="false" />
          -
          <el-input-number v-model="infoForm.pointsMax" :min="0" :max="999999" :precision="0" :controls="false" />
        </div>
      </el-form-item>
      <el-form-item label="模糊查询：">
        <el-input v-model="infoForm.keyCode" style="width: 195x" placeholder="会员名/会员卡号/手机号" />
      </el-form-item>
      <el-form-item label="批量搜索：">
        <el-input v-model="infoForm.cardArr" style="width: 195px" placeholder="多个会员卡号请用、隔开" />
      </el-form-item>
      <div />
      <el-form-item label="所属门店：">
        <el-select v-model="infoForm.shopRule" @change="infoForm.shopArr = 0">
          <el-option :value="1" label="全部门店" />
          <el-option :value="2" label="部分门店" />
        </el-select>
        <el-button v-if="infoForm.shopRule === 2" size="mini" @click="$refs.storeComponent.open()">选择门店</el-button>
      </el-form-item>
      <div>
        <!-- 门店列表 -->
        <el-form-item v-show="infoForm.shopArr.length > 0 && infoForm.shopRule === 2">
          <select-store ref="selectStoreComponent" @del-item="delSelectStore" />
        </el-form-item>
      </div>
      <el-form-item label="相关会员：">{{ totalCount }}人</el-form-item>
    </el-form>
    <storeDialog />
    <el-table :data="tabelData" height="calc(100vh - 500px)">
      <el-table-column prop="img" label="头像" />
      <el-table-column prop="name" label="会员姓名" />
      <el-table-column prop="kahao" label="会员卡号" />
      <el-table-column prop="jifen" label="积分" />
      <el-table-column prop="lkTime" label="领卡时间" />
    </el-table>
    <div class="pages">
      <el-pagination
        :current-page="pageInfo.currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <store-dialog ref="storeComponent" :list="infoForm.shopArr" @complete="handleSelectStore" />
  </div>
</template>
<script>
import storeDialog from '../../../../marketing/components/store' // 已选择门店
import selectStore from '../../../../marketing/components/select-store' // 已选择门店列表
export default {
  components: {
    storeDialog, selectStore
  },
  data() {
    return {
      tabelData: [
        {
          name: '张三',
          kahao: '123456',
          jifen: '400',
          lkTime: '2010-09-09'
        }
      ],
      infoForm: {
        allMember: 1,
        month: null, // 生日月份
        lkTime: null, // 领卡时间是哪一种
        lkTimeQj: [], // 选择领卡时间区间
        sex: null,
        ageInterval: null,
        agePicker: [],
        pointsType: null,
        pointsMin: 0,
        pointsMax: 999999,
        keyCode: '',
        cardArr: '',
        shopRule: 1,
        shopArr: []
      },
      pageInfo: {
        currentPage: 1,
        pageSize: 10
      },
      totalCount: 400,
      lkOptions: [
        { label: '不限', value: null },
        { label: '一周内', value: 1 },
        { label: '一月内', value: 2 },
        { label: '选择时间段', value: 3 }
      ],
      sex: [
        { label: '不限', value: null },
        { label: '男', value: 1 },
        { label: '女', value: 2 }
      ],
      ageInterval: [
        { label: '不限', value: null },
        { label: '小于20岁', value: 1 },
        { label: '20-25岁', value: 2 },
        { label: '26-35岁', value: 3 },
        { label: '36-45岁', value: 4 },
        { label: '45岁以上', value: 5 },
        { label: '选择出生年月', value: 6 }
      ],
      pointsType: [
        { label: '不限', value: null },
        { label: '1-100', value: 1 },
        { label: '101-200', value: 2 },
        { label: '选择积分区间', value: 3 }
      ]
    }
  },
  methods: {
    handleSizeChange(e) {},
    handleCurrentChange(e) {},
    // 选择门店
    handleSelectStore(val) {
      this.infoForm.shopArr = val
      this.$refs.selectStoreComponent.dataFrom(val)
    },
    // 删除已选择门店
    delSelectStore(item, index) {
      this.infoForm.shopArr.splice(index, 1)
      this.$refs.selectStoreComponent.dataFrom(this.infoForm.shopArr)
    }
  }
}
</script>
<style lang="scss">
.member-list-modal {
  .pages {
    text-align: right;
    margin-top: 20px;
  }
}
.el-form-item {
  margin-bottom: 0;
}
</style>
