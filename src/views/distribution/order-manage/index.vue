<template>
  <div class="container">
    <div class="header-panel">
      <div class="box">
        <div
          class="item frist"
          :class="navItem === 'all' && 'active'"
          @click="changeTableItem('all')"
        >
          全部
        </div>
        <div class="cutoff" />
        <div
          class="item"
          :class="navItem === 'receive' && 'active'"
          @click="changeTableItem('receive')"
        >
          待到货
        </div>
        <div class="cutoff" />
        <div
          class="item"
          :class="navItem === 'off' && 'active'"
          @click="changeTableItem('off')"
        >
          待核销
        </div>
        <div class="cutoff" />
        <div
          class="item last"
          :class="navItem === 'finish' && 'active'"
          @click="changeTableItem('finish')"
        >
          已完成
        </div>
      </div>
      <el-select
        v-model="value"
        filterable
        placeholder="选择门店"
        class="search"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <div class="search-container">
        <div class="search-item" @keyup.enter="forSearch()">
          <el-input
            v-model="orderNum"
            placeholder="请输入预约单号搜索"
            prefix-icon="el-icon-search"
            class="search"
          />
        </div>
        <div class="search-btns" style="margin-left:10px;">
          <el-button
            type="primary"
            size="small"
            @click.stop="forSearch()"
          >搜 索</el-button>
        </div>
      </div>
    </div>
    <div class="table-panel">
      <table-card @button-click="setDialogContent" />
    </div>
    <div class="pagination-panel">
      <el-pagination
        :current-page="currentPage4"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="4"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      append-to-body
    >
      <el-table :data="dialogContent">
        <el-table-column property="pic" label="商品图片" width="150">
          <div class="dialog-pic">暂无图片</div></el-table-column>
        <el-table-column property="name" label="商品名称/编号" width="200" />
        <el-table-column property="price" label="单价" />
        <el-table-column property="count" label="数量" />
      </el-table>
      <div style="display:flex;flex-direction:row;margin-top:40px;">
        <div style="color:#000;font-size:14px">预约单号：</div>
        <div style="color:#000;font-size:14px;margin-left:20px;">
          123456789012345
        </div>
      </div>
      <div style="display:flex;flex-direction:row;margin-top:40px;">
        <div style="color:#000;font-size:14px">预约单号：</div>
        <div style="color:#000;font-size:14px;margin-left:20px;">
          123456789012345
        </div>
      </div>
      <div style="display:flex;flex-direction:row;margin-top:40px;">
        <div style="color:#000;font-size:14px">预约单号：</div>
        <div style="color:#000;font-size:14px;margin-left:20px;">
          123456789012345
        </div>
      </div>
      <div
        style="display:flex;flex-direction:row;margin-top:40px;justify-content: center;"
      >
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import tableCard from './table-card/index.vue'
import DistributionService from '@/api/distributionService'
export default {
  components: { tableCard },
  data() {
    return {
      dialogVisible: false,
      dialogTitle: '',
      dialogContent: [],
      navItem: 'all',
      orderNum: ''
    }
  },
  watch: {
    orderNum(newValue) {
      this.orderNum = newValue
    }
  },
  mounted() {
    const data = DistributionService.queryOrderListByType()
    console.log('recvicesfdsfsfdsf ', data)
  },
  methods: {
    /* 搜索 */
    forSearch() {
      console.log('hey : search bar ')
    },
    /* 切换展示数据类型 */
    changeTableItem(type) {
      this.navItem = type
    },
    /* table-card 组件按钮点击 */
    setDialogContent() {
      this.dialogVisible = true
      // if (type === 'writeoff') {
      //   this.dialogTitle = '确认核销'
      // } else {
      //   this.dialogTitle = '确认到货 (签收后预约单进入核销状态，请提醒用户上门)'
      // }
    },
    closeDialog() {
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;

  .header-panel {
    padding: 10px 25px;
    display: flex;
    flex-direction: row;
    align-items: center;
    .search-container {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    .search {
      width: 284px;
      margin-left: 44px;
    }
    .box {
      border-radius: 6px;
      display: flex;
      flex-direction: row;
      border: 1px solid #d7d7d7;
      flex-shrink: 0;
      .cutoff {
        width: 1px;
        background-color: #d7d7d7;
      }
      .item {
        padding: 12px;
        font-size: 14px;
        background: #fff;
        color: #4a4a4a;
        cursor: pointer;
        display: inline-block;
        &.frist {
          border-radius: 6px 0 0 6px;
        }
        &.last {
          border-radius: 0 6px 6px 0;
        }
        &.active {
          color: #fff;
          background: #157de8;
        }
      }
    }
  }
  .table-panel {
    padding: 0 25px;
  }
  .dialog-pic {
    width: 72px;
    height: 72px;
    text-align: center;
    line-height: 72px;
    font-size: 14px;
    color: #9b9b9b;
    background-color: #ebebeb;
  }
}
</style>
