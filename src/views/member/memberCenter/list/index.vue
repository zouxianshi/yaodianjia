<template>
  <div class="mc-list-model">
    <div class="header-title">
      会员列表
    </div>
    <div class="body-content">
      <div v-show="conditions" class="conditions-content">
        <m-conditions ref="conditionsA" />
      </div>
      <div class="showBtn">
        <el-button type="text" size="mini" @click="toggelCoditions">
          <span v-if="conditions">收起 <i class="el-icon-arrow-up" /></span>
          <span v-else>展开 <i class="el-icon-arrow-down" /></span>
        </el-button>
      </div>
      <div class="_search">
        <el-form label-position="right" label-width="90px">
          <el-form-item label="会员搜索：">
            <el-input v-model="content" size="mini" style="width: 50%" placeholder="请输入会员姓名、手机号、卡号、身份证" />
          </el-form-item>
          <el-form-item label="">
            <el-button size="mini" @click="getData()">查询</el-button>
            <el-button size="mini">重置</el-button>
            <el-button size="mini">批量导出</el-button>
            <span class="tips">提示：批量导出功能最多一次导出5000条数据</span>
          </el-form-item>
        </el-form>
      </div>
      <m-tabel-list ref="listA" />
      <div class="pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="1000"
        />
      </div>
    </div>
  </div>
</template>
<script>
import mTabelList from './_source/list' // 列表
import mConditions from './_source/conditions' // 条件
import { queryMembers } from '@/api/memberService'
import _ from 'lodash'
export default {
  name: 'McList',
  components: {
    mTabelList, mConditions
  },
  props: {},
  data() {
    return {
      conditions: true,
      content: ''
    }
  },
  methods: {
    toggelCoditions() { // 切换选项隐藏/显示
      this.conditions = !this.conditions
    },
    // 获取列表数据
    getData() {
      var params = _.cloneDeep(this.$refs.conditionsA.conditions)
      params.content = this.content
      console.log(params)
      queryMembers(params).then(res => {
        console.log(res)
        this.$refs.listA.dataFromIndex(res.data.data)
      })
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .mc-list-model {
    background-color: #F7F7F7;height: calc(100vh - 160px);
    .header-title{
      background-color: #fff;height: 60px;line-height: 60px;padding: 0 2%;
      font-size: 18px;font-weight: bold;
    }
    .body-content{
      background-color: #fff;height: calc(100vh - 260px);overflow-y: auto;
      width: 96%; margin: 20px auto;padding: 20px;
      .showBtn{
        border-bottom: 1px solid #eee;text-align: right;
        margin: 0 auto 20px;
      }
      ._search{
        .tips{
          font-size: 14px;color:rgba(0,0,0,0.45);margin-left: 20px;vertical-align: middle;
        }
      }
      // 分页
      .pagination{
        text-align: right;padding: 10px 0;
      }
    }
  }
</style>
