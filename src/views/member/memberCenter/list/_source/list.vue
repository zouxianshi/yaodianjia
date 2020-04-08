<template>
  <div class="list-model">
    <el-table v-loading="loading" :data="tabelData" border style="width: 100%">
      <el-table-column prop="headUrl" label="微信头像" width="80" />
      <el-table-column prop="nickName" label="昵称" />
      <el-table-column prop="memberName" label="会员姓名" />
      <el-table-column prop="memberSex" label="性别" />
      <el-table-column prop="memberAge" label="年龄" />
      <el-table-column prop="memberPhone" label="手机号码" />
      <el-table-column label="健康顾问">
        <template slot-scope="scope">
          {{ scope.row.healthConsultants.length?scope.row.healthConsultants[0].name: '' }}
          <el-popover v-if="scope.row.healthConsultants.length" placement="bottom" title="最近添加" width="250" trigger="click">
            <mPopConsultantList />
            <el-button slot="reference" size="mini" type="text">
              <i class="el-icon-arrow-down" />
            </el-button>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="memberActive" label="会员分类" />
      <el-table-column prop="age" label="注册来源" />
      <el-table-column label="操作" width="120" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="tail(scope.row)">详情</el-button>
          <span>|</span>
          <el-popover placement="bottom" trigger="click">
            <div class="more-items"><el-button type="text" size="mini" @click="tailfDetail()">健康豆明细</el-button></div>
            <div class="more-items"><el-button type="text" size="mini" @click="editBeans()">健康豆管理</el-button></div>
            <el-button slot="reference" size="mini" type="text">更多</el-button>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <m-pop-beans-details ref="A" />
    <m-pop-edit-beans ref="B" />
  </div>
</template>
<script>
import mPopBeansDetails from '../../../_source/popBeansDetails' // 健康豆详情
import mPopEditBeans from './popEditBeans' // 健康豆编辑
import mPopConsultantList from './popConsultantList' // 健康顾问悬浮显示
import { queryOnlineIntegra } from '@/api/memberService'
export default {
  name: 'List',
  components: {
    mPopBeansDetails, mPopConsultantList, mPopEditBeans
  },
  props: {},
  data() {
    return {
      tabelDatas: [],
      loading: false
    }
  },
  computed: {
    tabelData() {
      return this.tabelDatas
    }
  },
  methods: {
    // 数据改变
    dataFromIndex(data) {
      this.tabelDatas = [...data]
      this.loading = false
    },
    tail() {
      this.$router.push('/member/member-center/details')
    },
    // 查看健康豆详情
    tailfDetail() {
      var params = {
        'currentPage': 1,
        'merCode': '666666',
        'pageSize': 10,
        'userId': 1
      }
      queryOnlineIntegra(params).then(res => {
        this.$refs.A.changeDia(res.data)
      })
    },
    // 编辑健康豆
    editBeans() {
      this.$refs.B.changeDia()
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .list-model {
    .el-table__header tr,
    .el-table__header th {
      padding: 0;
      height: 40px;
      font-weight: bold;
    }
    .el-table__body td{
      padding: 5px;
    }

  }
  .more-items{
    text-align: center;
    &:nth-child(1){
      border-bottom: 1px solid #eee;
    }
  }
</style>
