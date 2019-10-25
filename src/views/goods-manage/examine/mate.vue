<template>
  <div class="app-container">
    <div class="mate-wrapper">
      <div class="mate-info">
        <ul class="product-box">
          <li class="product-list">
            <p class="title">当前产品</p>
            <p class="title">ERP编码：102228</p>
            <span class="line-status" />
            <div class="info">
              <p>名称：<span>庆大霉素普鲁卡因维B12胶囊</span></p>
              <p>规格：<span>0.27g*36粒</span></p>
              <p>企业：<span>海口奇力制药股份有限公司</span></p>
              <p>条码：<span>6926973113391</span></p>
              <p>批准文号：<span>国药准字H20045188</span></p>
            </div>
          </li>
          <li class="product-list">
            <p class="title">
              当前所选药店加平台库产品</p>
            <p class="title">ERP编码：102228</p>
            <span class="line-status" />
            <div class="info">
              <p>名称：<span>庆大霉素普鲁卡因维B12胶囊</span></p>
              <p>规格：<span>0.27g*36粒</span></p>
              <p>企业：<span>海口奇力制药股份有限公司</span></p>
              <p>条码：<span>6926973113391</span></p>
              <p>批准文号：<span>国药准字H20045188</span></p>
            </div>
          </li>
        </ul>
        <div class="right-operate">
          <p>
            <el-button
              type="primary"
              size="small"
              @click="goodsInfoVisible=true"
            >查看商品详情</el-button>
          </p>
          <el-button
            type="danger"
            size="small"
            @click="rejectVisible=true"
          >拒绝</el-button>
        </div>
      </div>
      <div class="search-box">
        <div class="search-form">
          <div class="search-item">
            <span class="label-name">商品名称：</span>
            <el-input
              v-model="searchForm.name"
              placeholder=""
              size="small"
            />
          </div>
          <div class="search-item">
            <span class="label-name">商品编码：</span>
            <el-input
              v-model="searchForm.code"
              placeholder=""
              size="small"
            />
          </div>
        </div>
        <div class="search-form">
          <div class="search-item">
            <span class="label-name">条形码：</span>
            <el-input
              v-model="searchForm.name"
              placeholder=""
              size="small"
            />
          </div>
          <div class="search-item">
            <span class="label-name">生产企业：</span>
            <el-input
              v-model="searchForm.code"
              placeholder=""
              size="small"
            />
          </div>
          <div class="search-item">
            <span class="label-name">批准文号：</span>
            <el-input
              v-model="searchForm.code"
              placeholder=""
              size="small"
            />
          </div>
          <div class="search-item">
            <el-button
              type="primary"
              size="small"
            >查询</el-button>
          </div>
        </div>
      </div>
      <div class="table-box">
        <p class="title">为您匹配到的药店加平台产品库中与之匹配的产品：</p>
        <el-table
          v-loading="loading"
          :data="tableData"
          stripe
          style="width: 100%"
        >
          <el-table-column
            prop="orCode"
            align="left"
            min-width="120"
            label="商名称"
            show-overflow-tooltip
          />
          <el-table-column
            prop="orName"
            align="left"
            min-width="120"
            label="规格"
          />
          <el-table-column
            align="left"
            min-width="120"
            label="生产企业"
          />
          <el-table-column
            prop="orParentName"
            align="left"
            label="条形码"
            :show-overflow-tooltip="true"
            min-width="120"
          />
          <el-table-column
            prop="headPerson"
            align="left"
            label="批准文号"
            :show-overflow-tooltip="true"
            min-width="120"
          />
          <el-table-column
            prop="address"
            label="商品编码"
            align="left"
          />
          <el-table-column
            prop="createTime"
            align="left"
            min-width="155"
            label="使用商家数"
          />
          <el-table-column
            prop="createTime"
            align="left"
            min-width="155"
            label="匹配得分"
          />
        </el-table>
        <div class="table-footer">
          <pagination
            :total="total"
            :page.sync="listQuery.page"
            :limit.sync="listQuery.limit"
            @pagination="getList"
          />
        </div>
      </div>
    </div>
    <el-dialog
      title="产品详情"
      :visible.sync="goodsInfoVisible"
      append-to-body
      :close-on-click-modal="false"
      width="800px"
    >
      <div class="modal-body">
        <div class="info-text">
          <p>商品名称：<span>12321</span></p>
        </div>
        <div class="info-image">
          <p style="margin-bottom:10px">商品图片：</p>
          <div class="main-img">
            <el-image src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpb" fit="contain" style="width: 300px; height: 300px">
              <div slot="placeholder" class="image-slot">
                加载中<span class="dot">...</span>
              </div>
            </el-image>
          </div>
          <ul class="other-image">
            <li v-for="item in 4" :key="item" class="">
              <el-image src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpb" fit="contain" style="width: 100px; height: 100px">
                <div slot="placeholder" class="image-slot">
                  加载中<span class="dot">...</span>
                </div>
              </el-image>
            </li>
          </ul>
        </div>
      </div>
      <span slot="footer" class="ext-center">
        <el-button
          type="primary"
          size="small"
        >通 过</el-button>
        <el-button
          type="danger"
          size="small"
        >拒 绝</el-button>
      </span>
    </el-dialog>
    <el-dialog title="选择拒绝原因" append-to-body close-on-click-modal :visible.sync="rejectVisible" width="30%">
      <div class="modal-body">
        <el-form :model="rejectForm" label-width="100px">
          <el-form-item label="选择原因">
            <el-select v-model="rejectForm.id" placeholder="">
              <el-option label="药店加平台已存在改商品" value="0" />
              <el-option label="商品信息不够规范合格" value="1" />
              <el-option label="其他原因" value="2" />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer">
        <el-button type="primary" size="small">确 定</el-button>
      </span>
    </el-dialog>
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
      searchForm: {
        name: ''
      },
      total: 0,
      loading: false,
      tableData: [],
      goodsInfoVisible: false,
      rejectVisible: false,
      rejectForm: {}
    }
  },
  created() {

  },
  methods: {
    getList() {

    }
  }
}
</script>
<style lang="scss" scoped>
.el-drawer__body {
  overflow-y: scroll;
  height: 100%;
}
.mate-wrapper {
  height: 101%;
  .mate-info {
    display: flex;
  }
  .product-box {
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    flex: 1;
    .product-list {
      background: #f6f7fb;
      padding: 10px;
      margin-right: 10px;
      width: 50%;
      .line-status{
        display: block;
        height: 6px;
        width: 50px;
        margin-bottom: 10px;
        border-radius: 5px;
        background: #147de8;
      }
      .title {
        margin-bottom: 10px;
      }
      .info {
        color: #333;
        font-size: 14px;
        p {
          margin-bottom: 5px;
        }
      }
    }
  }
  .right-operate {
    flex: 0 0 100px;
    padding-right: 20px;
    p {
      margin-bottom: 12px;
    }
  }
  .search-box {
    margin-top: 20px;
    background: #f6f7fb;
    padding: 20px 12px 10px 12px;
    margin-left: 10px;
    .search-form {
      margin-bottom: 10px;
    }
    .el-input {
      width: 200px;
    }
  }
  .table-box {
    padding: 10px;
    .title {
      margin-bottom: 10px;
      color: #333;
    }
  }
}
.modal-body {
  display: flex;
  .info-text {
    width: 50%;
    height: 360px;
    overflow-y: auto;
    color: #333;
    font-size: 14px;
    p {
      margin-bottom: 5px;
    }
  }
  .info-image{
    height: 360px;
    overflow-y: auto;
    .other-image{
      li{
        display: inline-block;
        margin-right: 2px;
      }
    }
  }
}
</style>
