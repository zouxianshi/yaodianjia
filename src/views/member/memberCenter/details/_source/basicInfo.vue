<template>
  <div class="basic-info-model">
    <div class="content-items">
      <div class="content-header">
        <mItemTitle title="基础信息" />
      </div>
      <div class="content-body">
        <div class="content-body-items">
          <el-form label-position="right" label-width="100px" :model="basicInfo">
            <el-form-item label="微信头像：">
              <img :src="basicInfo.imgUrl">
            </el-form-item>
            <el-form-item label="会员名称：">
              <span>{{ basicInfo.name }}</span>
            </el-form-item>
            <el-form-item label="昵称：">
              <span>{{ basicInfo.nickname }}</span>
            </el-form-item>
            <el-form-item label="性别：">
              <span>{{ basicInfo.sex }}</span>
            </el-form-item>
            <el-form-item label="生日：">
              <span>{{ basicInfo.birth }}</span>
            </el-form-item>
            <el-form-item label="身份证号：">
              <span>{{ basicInfo.crad }}</span>
            </el-form-item>
            <el-form-item label="手机号：">
              <span>{{ basicInfo.phone }}</span>
            </el-form-item>
            <el-form-item label="收货地址：">
              <span>{{ basicInfo.address }}</span>
            </el-form-item>
          </el-form>
        </div>
        <div class="content-body-items">
          <el-form label-position="right" label-width="120px" :model="basicInfo">
            <el-form-item label="">
              <div style="height:60px" />
            </el-form-item>
            <el-form-item label="会员卡号：">
              <span>{{ basicInfo.numberId }}</span>
            </el-form-item>
            <el-form-item label="健康豆：">
              <span>{{ basicInfo.healthNum }}</span><span class="more-info" @click="tailsBeans">查看明细</span>
            </el-form-item>
            <el-form-item label="会员等级：">
              <span>{{ basicInfo.leavel }}</span>
            </el-form-item>
            <el-form-item label="所属门店：">
              <span>{{ basicInfo.shop }}</span>
            </el-form-item>
            <el-form-item label="注册来源：">
              <span>{{ basicInfo.registFrom }}</span>
            </el-form-item>
            <el-form-item label="注册时间：">
              <span>{{ basicInfo.registTime }}</span>
            </el-form-item>
            <el-form-item label="默认发卡机构：">
              <span>{{ basicInfo.cardIssuer }}</span>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <div class="content-items">
      <div class="content-header">
        <mItemTitle title="健康顾问" />
      </div>
      <div class="content-body">
        <el-table
          :data="tableData"
          border
          style="width: 100%"
        >
          <el-table-column
            prop="name"
            label="姓名"
            width="180"
          />
          <el-table-column
            prop="shop"
            label="所属门店"
          />
          <el-table-column
            prop="data"
            label="添加时间"
          />
        </el-table>
      </div>
      <div class="pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="1000"
        />
      </div>
    </div>
    <m-popBeans-details ref="A" />
  </div>
</template>
<script>
import mItemTitle from './itemTitle.vue'
import mPopBeansDetails from '../../../_source/popBeansDetails'
import { queryOnlineIntegra } from '@/api/memberService'
export default {
  name: 'BasicInfo',
  components: { mItemTitle, mPopBeansDetails },
  props: {},
  data() {
    return {
      basicInfo: {
        imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1585564613111&di=10d06d27ad82314c1ed74a6c2270cc25&imgtype=0&src=http%3A%2F%2Fpic3.16pic.com%2F00%2F01%2F11%2F16pic_111395_b.jpg',
        name: '张三',
        nickname: '三三三',
        sex: '女',
        birth: '1990-01-01',
        crad: '433130199501250411',
        phone: '17827603484',
        address: '-',
        numberId: '1234567',
        healthNum: '0',
        leavel: '普通会员',
        shop: 'xxxx',
        registFrom: '员工推荐',
        registTime: '2020-02-28',
        cardIssuer: ''
      },
      tableData: [{
        name: '王小虎',
        shop: 'NO.1234 益丰大药房5店',
        data: '2019.12.31'
      }, {
        name: '王小虎',
        shop: 'NO.1234 益丰大药房5店',
        data: '2019.12.31'
      }, {
        name: '王小虎',
        shop: 'NO.1234 益丰大药房5店',
        data: '2019.12.31'
      }, {
        name: '王小虎',
        shop: 'NO.1234 益丰大药房5店',
        data: '2019.12.31'
      }]
    }
  },
  methods: {
    tailsBeans() {
      var params = {
        'currentPage': 1,
        'pageSize': 10,
        'userId': 1
      }
      queryOnlineIntegra(params).then(res => {
        this.$refs.A.changeDia(res.data)
      })
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
.basic-info-model{
  .content-items{
    border: 1px solid #eee;border-radius: 2px;background-color: #fff;
    width: 96%;margin: 20px auto 0;
    img{
      width: 60px;height: 60px;margin: 0;vertical-align: middle;
    }
    .content-body{
      display: flex;padding: 20px 8% 10px;justify-content: space-between;min-height: 200px;
      .content-body-items{
        flex: 0 0 45%;
        .more-info{
          color: #1890FF;margin-left: 30px;cursor: pointer;font-size: 12px;
        }
      }
    }
    .pagination{
      text-align: right;padding: 10px 7%;
    }
  }
  .el-form-item{
    margin-bottom: 5px;
  }
  .el-table__header tr,
  .el-table__header th {
    padding: 0;
    height: 40px;
  }
}
</style>
