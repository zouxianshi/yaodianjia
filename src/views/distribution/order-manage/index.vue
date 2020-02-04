<template>
  <div class="container">
    <div class="header-panel">
      <div class="box">
        <div class="item" :class="'active'" @click="setDialogContent('')">
          全部
        </div>
        <div class="item">待到货</div>
        <div class="item">待核销</div>
        <div class="item">已完成</div>
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
      <el-input
        v-model="input2"
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        class="search"
      />
    </div>
    <div class="table-panel">
      <table-card />
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
        <el-table-column
          property="name"
          label="商品名称/编号"
          width="200"
        />
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
        <el-button>取消</el-button>
        <el-button type="primary">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import tableCard from './table-card/index.vue'
export default {
  components: { tableCard },
  data() {
    return {
      dialogVisible: false,
      dialogTitle: '',
      dialogContent: []
    }
  },
  methods: {
    setDialogContent(type) {
      this.dialogVisible = true
      if (type === 'writeoff') {
        this.dialogTitle = '确认核销'
      } else {
        this.dialogTitle = '确认到货 (签收后预约单进入核销状态，请提醒用户上门)'
      }
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
      .item {
        padding: 12px;
        font-size: 14px;
        background: #fff;
        color: #4a4a4a;
        cursor: pointer;
        display: inline-block;

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
  #content-panel {
    display: flex;
    flex-direction: row;
    align-items: center;
    .default {
      color: #000000;
      font-size: 14px;
    }
    .txt {
      color: #000000;
      font-size: 14px;
      margin-left: 20px;
    }
  }
}
</style>
