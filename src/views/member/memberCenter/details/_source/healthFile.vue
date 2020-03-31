<template>
  <div class="health-info-model">
    <div class="content-items">
      <div class="content-header">
        <mItemTitle title="基础档案" />
      </div>
      <div class="content-body">
        <div class="content-body-items">
          <el-form label-position="top" label-width="100px" :model="basicInfo">
            <el-form-item label="会员名称：">
              <span>{{ basicInfo.name }}</span>
            </el-form-item>
            <el-form-item label="用药禁忌：">
              <span>{{ basicInfo.contrainDications }}</span>
            </el-form-item>
            <el-form-item label="过敏史：">
              <m-border-items v-for="(items, index) in basicInfo.allergyHistory" :key="index" :value="items" />
            </el-form-item>
            <el-form-item label="易感病症：">
              <m-border-items v-for="(items, index) in basicInfo.ygbz" :key="index" :value="items" />
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <div class="content-items">
      <div class="content-header">
        <mItemTitle title="健康状态" />
      </div>
      <div class="content-body">
        <el-table
          :data="tableData"
          border
          style="width: 100%"
        >
          <el-table-column
            prop="thingName"
            label="事件名称"
          />
          <el-table-column
            prop="date"
            label="创建时间"
          />
          <el-table-column
            prop="desc"
            label="病症描述"
          />
          <el-table-column
            label="操作"
            width="100"
          >
            <template>
              <el-button type="text" size="small">查看</el-button>
            </template>
          </el-table-column>
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
  </div>
</template>
<script>
import mItemTitle from './itemTitle' // 标题
import mBorderItems from './borderItems' // tag标签
export default {
  name: 'BasicInfo',
  components: { mItemTitle, mBorderItems },
  props: {},
  data() {
    return {
      basicInfo: {
        name: '张三',
        contrainDications: '慎用阿奇霉素；禁用青霉素',
        allergyHistory: ['花生', '青霉素'],
        ygbz: ['过敏性鼻炎']
      },
      tableData: [{
        thingName: '普通流感',
        date: '2016-05-02',
        desc: '咳嗽、发烧37.5℃、乏力'
      }, {
        date: '2016-05-04',
        thingName: '高血压',
        desc: '建档血压：120/98mmHg'
      }, {
        date: '2016-05-01',
        thingName: '跌倒摔伤',
        desc: '左腿膝盖皮肤擦伤'
      }]
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.health-info-model{
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
  .el-form--label-top .el-form-item__label{
    padding: 0;
  }
  .el-table__header tr,
  .el-table__header th {
    padding: 0;
    height: 40px;
  }
}
</style>
