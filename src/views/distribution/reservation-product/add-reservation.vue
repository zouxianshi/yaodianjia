<template>
  <div class="content_pick">
    <div class="nav-btn">
      <el-button type="primary" size="mini">添加预约商品</el-button>
      <el-button type="primary" size="mini">批量下架</el-button>
    </div>
    <div class="tabel-content">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column
          type="selection"
          width="45"
          align="center"
        />
        <el-table-column
          label="商品图片"
          align="center"
        >
          <template>
            <img class="goods-logo" src="http://dl.ppt123.net/pptbj/51/20181115/mzj0ghw2xo2.jpg" alt="">
          </template>
        </el-table-column>
        <el-table-column prop="date" label="日期" />
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="address" label="地址" />
        <el-table-column
          label="操作"
          align="center"
        >
          <template>
            <el-button type="primary" size="small">编辑</el-button>
            <el-button type="primary" size="small">下架</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page-box">
      <el-pagination
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.content_pick{
  padding: 10px 21px;overflow: auto;
  .nav-btn{
    text-align: right;height: 50px;line-height: 50px
  }
  .goods-logo{
    width: 81px;height: 81px;
  }
  .page-box{
    height: 40px;line-height: 40px;margin-top: 21px;text-align: right
  }
}
</style>
