<template>
  <div class="list-model">
    <el-table v-loading="loading" :data="tabelData" border style="width: 100%" height="calc(100vh - 480px)">
      <el-table-column label="微信头像" width="100" align="center">
        <template slot-scope="scope">
          <img v-if="scope.row.headUrl" class="headerImg" :src="scope.row.headUrl">
          <span v-else>未上传</span>
        </template>
      </el-table-column>
      <el-table-column prop="nickName" label="昵称" :show-overflow-tooltip="true" width="150" />
      <el-table-column prop="memberName" label="会员姓名" align="center" />
      <el-table-column label="性别" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.memberSex === 1">男</span>
          <span v-if="scope.row.memberSex === 2">女</span>
        </template>
      </el-table-column>
      <el-table-column prop="memberAge" label="年龄" align="center" />
      <el-table-column prop="memberPhone" width="150" label="手机号码" align="center" />
      <el-table-column label="会员分类" width="100" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.memberActive === 1">普通会员</span>
          <span v-if="scope.row.memberActive === 2">新增会员</span>
          <span v-if="scope.row.memberActive === 3">优质会员</span>
          <span v-if="scope.row.memberActive === 4">活跃会员</span>
          <span v-if="scope.row.memberActive === 9">沉寂会员</span>
        </template>
      </el-table-column>
      <el-table-column prop="age" label="注册来源" width="120" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.registerSource === 1">门店推荐注册</span>
          <span v-if="scope.row.registerSource === 2">员工推荐注册</span>
          <span v-if="scope.row.registerSource === 3">商户渠道注册</span>
          <span v-if="scope.row.registerSource === 4">平台渠道注册</span>
          <span v-if="scope.row.registerSource === 5">支付即会员</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="tail(scope.row.userId)">详情</el-button>
          <span>|</span>
          <el-popover placement="bottom" trigger="click">
            <div class="more-items">
              <el-button type="text" size="mini" @click="tailfDetail(scope.row.userId)">海贝明细</el-button>
            </div>
            <div class="more-items">
              <el-button type="text" size="mini" @click="editBeans(scope.row.userId)">海贝管理</el-button>
            </div>
            <div class="more-items">
              <el-button type="text" size="mini" @click="handleUnbound(scope.row.userId)">解绑</el-button>
            </div>
            <div class="more-items">
              <el-button type="text" size="mini" @click="syncMemberToErp(scope.row)">同步至ERP</el-button>
            </div>
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
import mPopBeansDetails from '../../../_source/popBeansDetails' // 海贝详情
import mPopEditBeans from './popEditBeans' // 海贝编辑
// import mPopConsultantList from './popConsultantList' // 健康顾问悬浮显示
import {
  queryOnlineIntegra,
  menberBaseInfo,
  delMerMember,
  syncMemberToErp
} from '@/api/memberService'
export default {
  name: 'List',
  components: {
    mPopBeansDetails,
    // mPopConsultantList,
    mPopEditBeans
  },
  props: {},
  data() {
    return {
      // env: process.env.VUE_APP_ENV,
      tabelDatas: [],
      loading: false,
      beanTotalNum: 0 // 海贝总数量
    }
  },
  computed: {
    tabelData() {
      return this.tabelDatas
    }
  },
  methods: {
    syncMemberToErp(data) {
      const params = {
        'memberCards': [data.memberCard],
        'userIds': [data.userId]
      }
      syncMemberToErp(params).then(res => {
        if (res.code === '10000') {
          this.$message.success(res.msg)
          this.$emit('getData')
        }
      })
    },
    handleUnbound(userId) {
      this.$confirm('确认解绑吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var paramsUnboundparams = {
          userId: userId,
          merCode: this.$store.state.user.merCode
        }
        delMerMember(paramsUnboundparams).then(res => {
          if (res.code === '10000') {
            this.$message.success(res.msg)
            this.$emit('getData')
          }
        })
      })
    },
    // 数据改变
    dataFromIndex(data) {
      this.tabelDatas = [...data]
      this.loading = false
    },
    tail(userId) {
      this.$router.push(`/member/member-center/details?userId=${userId}`)
    },
    // 查看海贝详情
    tailfDetail(userId) {
      // 先获取海贝总数（海贝详细接口没有返回）
      var params2 = {
        userId: userId,
        merCode: this.$store.state.user.merCode
      }
      menberBaseInfo(params2).then(res => {
        if (res.data && res.data.onlineIntegral) {
          this.beanTotalNum = res.data.onlineIntegral
        } else {
          this.beanTotalNum = 0
        }
        var params = {
          currentPage: 1,
          pageSize: 10,
          userId: userId
        }
        queryOnlineIntegra(params).then(res => {
          this.$refs.A.changeDia(res.data, userId, this.beanTotalNum)
        })
      })
    },
    // 编辑海贝
    editBeans(userId) {
      this.$refs.B.changeDia(userId)
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
  .el-table__body td {
    padding: 5px;
  }
  .headerImg {
    width: 60px;
    height: 60px;
  }
}
.more-items {
  text-align: center;
  &:nth-child(1) {
    border-bottom: 1px solid #eee;
  }
}
</style>
