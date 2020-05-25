<template>
  <div class="app-container">
    <div class="data-center-wrapper">
      <div class="live-total">
        <el-card class="box-card list-total">
          <div class="box-list">
            <p class="nums">10</p>
            <p>总直播场数</p>
          </div>
          <div class="box-list">
            <p class="nums">10</p>
            <p>总直播时长</p>
          </div>
          <div class="box-list">
            <p class="nums">10</p>
            <p>累计观看人数</p>
          </div>
        </el-card>
        <el-card class="box-card">
          <div class="box-list">
            <p class="nums">10<span>&nbsp;笔</span></p>
            <p>总直播场数</p>
          </div>
          <div class="box-list">
            <p class="nums">10<span>&nbsp;%</span></p>
            <p>总直播时长</p>
          </div>
          <div class="box-list">
            <p class="nums">10<span>&nbsp;￥</span></p>
            <p>累计观看人数</p>
          </div>
        </el-card>
      </div>
      <section class="table-box webkit-scroll">
        <el-table :data="tableData" style="width: 100%" height="calc(100% - 180px)">
          <el-table-column label="序号" width="60" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.sortNumber || '' }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="startTime" label="主播主题" min-width="180" align="center" />
          <el-table-column prop="img" label="时长" min-width="100" align="center" />
          <el-table-column prop="endTime" label="观看人数" min-width="180" align="center" />
          <el-table-column prop="endTime" label="成交订单" min-width="180" align="center" />
          <el-table-column prop="url" label="成交金额" min-width="240" />
          <el-table-column label="数量" min-width="80" align="center" />
          <el-table-column prop="remark" label="直播视频" min-width="120" align="center" />
          <el-table-column label="操作" fixed="right" align="center" min-width="240">
            <template slot-scope="scope">
              <el-button size="mini" type="text" @click="handleEdit(scope.row)">开播</el-button>
              <el-button
                type="text"
                size="mini"
              >查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </section>
      <section class="c-footer">
        <pagination
          :total="total"
          :page.sync="listQuery.currentPage"
          :limit.sync="listQuery.pageSize"
          @pagination="getList"
        />
      </section>
    </div>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import mixins from '@/utils/mixin'
export default {
  components: { Pagination },
  mixins: [mixins],
  data() {
    return {
      tableData: [],
      listQuery: {
        keyword: ''
      }
    }
  },
  methods: {
    getList() {

    }
  }
}
</script>
<style lang="scss">
 .flex-between {
    display: flex;
    justify-content: space-between;
  }
 .live-total .el-card__body {
    @extend .flex-between;
  }
</style>
<style lang="scss" scoped>
.data-center-wrapper {
  .flex-between {
    display: flex;
    justify-content: space-between;
  }
  .live-total {
    //   padding:0 30px;
    @extend .flex-between;
    .nums{
        margin-bottom: 10px;
    }
    .box-list{
        margin: 0 20px;
        text-align: center;
        p{
            &:first-child{
                font-size: 20px;
                font-weight: 600;
                span{
                    font-size: 12px;
                }
            }
            &:last-child{
               color: #bebfc1;
               font-size: 14px;
            }
        }
    }
  }
}
</style>
