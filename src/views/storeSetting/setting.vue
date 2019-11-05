<template>
  <div class="container">
    <el-alert
      title="当前上线104家门店，还能上线6家门店"
      type="warning"
      :closable="false"
    />
    <div>
      <el-button type="primary" size="small" style="margin-top: 20px" @click="visable = true">添加上线门店</el-button>
      <el-input size="small" style="width: 200px;margin-top: 20px;margin-left: 80px;" placeholder="请输入门店名称" />
      <el-button type="primary" size="small" style="margin-left: 10px">查询</el-button>
      <el-button type="primary" size="small">导出<i class="el-icon-download el-icon--right" /></el-button>
    </div>
    <el-dialog
      append-to-body
      title="添加上线门店"
      :visible.sync="visable"
      width="800px"
      @close="dismiss"
    >
      <div>
        <span>选择门店：</span>
        <el-input size="small" placeholder="门店编码/名称" style="width: 180px" />
        <el-button size="small" type="primary" style="margin-left: 5px">查询</el-button>
      </div>
      <el-table
        :data="list"
        height="250"
        border
        style="margin-top: 10px"
      >
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column label="门店编码" property="name" />
        <el-table-column label="门店名称" property="name" />
        <el-table-column label="门店地址" property="name" />
        <el-table-column label="门店电话" property="name" />
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button size="small">取 消</el-button>
        <el-button type="primary" size="small">确定</el-button>
      </div>
    </el-dialog>
    <section class="table-box">
      <el-table
        :data="list"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <div slot="empty">
          当前无上线门店，上线商城需添加<el-button type="text">上线门店</el-button>吧
        </div>
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column label="门店图片">
          <template>
            <el-image
              style="width: 70px; height: 70px"
              :src="url"
              :fit="fit"
            />
          </template>
        </el-table-column>
        <el-table-column label="门店名称" property="name" />
        <el-table-column label="门店编码" property="name" />
        <el-table-column label="门店地址" property="name" />
        <el-table-column label="电话" property="name" />
        <el-table-column label="配送支持" property="name" />
        <el-table-column label="操作" width="100px">
          <template>
            <el-button size="small" type="text">编辑</el-button>
            <el-button size="small" type="text">下线</el-button>
          </template>
        </el-table-column>
      </el-table>
    </section>
    <div style="margin-top: 10px">
      <span style="font-size: 14px">已选{{ multipleSelection.length }}家门店</span>
      <el-button type="primary" size="mini">下线</el-button>
    </div>
    <div style="margin-top: 10px;font-size: 14px;font-weight: 400;color:#99a9bf;line-height: 20px">
      添加上线门店时，如在购买范围内的上线门店数量，提示：操作成功；如超出门店购买范围<br>
      提示:您上线的门店已超出上限，如需上线更多门店，请进行购买
    </div>
  </div>
</template>

<script>
export default {
  name: 'Setting',
  data() {
    return {
      visable: false,
      multipleSelection: [],
      list: [
        { code: '12', name: 'aaa' },
        { code: '12', name: 'aaa' },
        { code: '12', name: 'aaa' },
        { code: '12', name: 'aaa' },
        { code: '12', name: 'aaa' },
        { code: '12', name: 'aaa' },
        { code: '12', name: 'aaa' },
        { code: '12', name: 'aaa' },
        { code: '12', name: 'aaa' },
        { code: '12', name: 'aaa' },
        { code: '12', name: 'aaa' },
        { code: '12', name: 'aaa' },
        { code: '12', name: 'aaa' },
        { code: '12', name: 'aaa' },
        { code: '12', name: 'aaa' },
        { code: '12', name: 'aaa' },
        { code: '12', name: 'aaa' },
        { code: '12', name: 'aaa' },
        { code: '12', name: 'aaa' },
        { code: '12', name: 'aaa' },
        { code: '12', name: 'aaa' },
        { code: '12', name: 'aaa' },
        { code: '12', name: 'aaa' },
        { code: '12', name: 'aaa' },
        { code: '12', name: 'aaa' },
        { code: '12', name: 'aaa' },
        { code: '12', name: 'aaa' },
        { code: '12', name: 'aaa' },
        { code: '12', name: 'aaa' },
        { code: '12', name: 'aaa' },
        { code: '12', name: 'aaa' }
      ]
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>

<style scoped>
  .container{
    margin-left: 27px;
    margin-right: 27px;
    margin-top: 10px;
  }
  .container h3 {
    font-size: 22px;
    font-weight: 400;
    margin: 0 0 10px;
    color: #1f2d3d;
  }
  .container h6 {
    font-size: 14px;
    font-weight: 400;
    color: #99a9bf;
  }
  .label-name {
    display: inline-block;
    margin-right: 10px;
    text-align: right;
    color: #999999;
    font-size: 14px;
  }
</style>
