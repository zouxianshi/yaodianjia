<template>
  <div>
    <el-dialog
      :title="`${status===0?'下架':'上架'}商品(已选${chooseNum}个商品)`"
      :visible.sync="isShow"
      append-to-body
      width="700px"
      :show-close="false"
      :close-on-click-modal="false"
    >
      <div class="modal-body">
        <div class="search-box">
          <div class="search-item">
            <span>门店选择：</span>
            <el-checkbox label="1">全部门店</el-checkbox>
          </div>
          <div class="search-query">
            <el-input v-model="storeCode" placeholder="门店编码/门店名称" style="width:200px" size="mini" />
            <el-button type="primary" size="mini">查询</el-button>
          </div>
        </div>
        <el-table ref="multipleTable" :data="list" stripe style="width: 100%" @selection-change="handleSelectionChangeStore">
          <el-table-column
            type="selection"
            width="55"
          />
          <el-table-column label="门店编号" prop="id" />
          <el-table-column label="门店名称" prop="name" />
          <el-table-column label="门店地址" />
          <el-table-column label="门店电话" />
        </el-table>
        <div class="text-right pagination">
          <el-pagination
            small
            :current-page="currentPage"
            background
            :page-size="10"
            layout="total, prev, pager, next"
            :total="storeTotal"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
        <el-divider content-position="left">未选择门店的销售状态保持不变</el-divider>
        <ul class="choose-box">
          <template v-if="multipleSelection.length!==0">
            <li v-for="(item,index) in multipleSelection" :key="index">
              <el-tag type="info" size="small" closable @close="handleTagClose(item)">{{ item.name }}</el-tag>
            </li>
          </template>
          <template v-else>
            <p class="text-center">请选择门店</p>
          </template>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="" size="small" @click="handleCanle">取消</el-button>
        <el-button type="primary" size="small" @click="handleSubmit">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    status: {
      type: Number,
      default: 0
    },
    chooseNum: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      storeCode: '',
      storeTotal: 0, // 门店总页数
      currentPage: 1, // 门店分页
      chooseStore: [], // 选择的门店数据
      list: [
        { id: 1, name: 'a门店' },
        { id: 2, name: 'b门店' },
        { id: 3, name: 'c门店' }
      ],
      multipleSelection: []
    }
  },
  watch: {
    isShow(val) {
      if (val) {
        this._loadStoreData()
      }
    }
  },
  created() {

  },
  methods: {
    _loadStoreData() {

    },
    handleSubmit() {
      this.$message({
        message: '你未选择任何门店，请先选择门店',
        type: 'warning'
      })
      return
    },
    handleSelectionChangeStore(val) { // 门店列表选中事件
      this.multipleSelection = val
    },
    handleTagClose(row) {
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    handleCanle() {
      this.$emit('close')
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>
<style lang="scss" scoped>
.modal-body{
  .search-box{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    .search-query{
      display: flex;
      .el-input{
        margin-right: 10px;
      }
    }
  }
  .pagination{
    margin: 10px 0;
  }
  .choose-box{
      li{
          display: inline-block;
          margin-right: 10px;
      }
  }
}
</style>
